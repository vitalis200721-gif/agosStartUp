const Friendship = require('../models/Friendship');
const Message = require('../models/Message');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

exports.getFriends = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // Find where the user is either the requester or recipient
    const friendships = await Friendship.find({
      $or: [{ requester: userId }, { recipient: userId }]
    }).populate('requester', 'displayName email avatar level isBanned')
      .populate('recipient', 'displayName email avatar level isBanned');

    const friends = [];
    const pendingRequests = [];

    friendships.forEach(f => {
      const isRequirer = f.requester._id.toString() === userId.toString();
      const otherUser = isRequirer ? f.recipient : f.requester;
      
      if (!otherUser || otherUser.isBanned) return;

      if (f.status === 'accepted') {
        friends.push({ _id: f._id, user: otherUser, status: 'accepted' });
      } else if (f.status === 'pending') {
        pendingRequests.push({ 
          _id: f._id, 
          user: otherUser, 
          type: isRequirer ? 'sent' : 'received' 
        });
      }
    });

    res.json({ friends, pendingRequests });
  } catch (err) { next(err); }
};

exports.sendRequest = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot add yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser || targetUser.isBanned) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existing = await Friendship.findOne({
      $or: [
        { requester: req.user._id, recipient: targetUserId },
        { requester: targetUserId, recipient: req.user._id }
      ]
    });

    if (existing) {
      return res.status(400).json({ error: 'Friendship or request already exists' });
    }

    const friendship = await Friendship.create({
      requester: req.user._id,
      recipient: targetUserId,
      status: 'pending'
    });

    // Notify the recipient
    createNotification(
      targetUserId,
      'friend',
      'New Friend Request',
      `${req.user.displayName} wants to be your friend!`
    ).catch(console.error);

    res.json({ success: true, friendship });
  } catch (err) { next(err); }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    const friendship = await Friendship.findOne({
      _id: req.params.id,
      recipient: req.user._id,
      status: 'pending'
    });

    if (!friendship) return res.status(404).json({ error: 'Request not found' });

    friendship.status = 'accepted';
    await friendship.save();

    // Notify the requester
    createNotification(
      friendship.requester,
      'friend',
      'Friend Request Accepted',
      `${req.user.displayName} accepted your friend request!`
    ).catch(console.error);

    res.json({ success: true, friendship });
  } catch (err) { next(err); }
};

exports.declineOrRemove = async (req, res, next) => {
  try {
    const friendship = await Friendship.findOne({
      _id: req.params.id,
      $or: [{ requester: req.user._id }, { recipient: req.user._id }]
    });

    if (!friendship) return res.status(404).json({ error: 'Friendship not found' });

    await friendship.deleteOne();
    res.json({ success: true, message: 'Friendship removed' });
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const friendId = req.params.id;
    
    // Validate friendship first
    const isFriend = await Friendship.findOne({
      status: 'accepted',
      $or: [
        { requester: req.user._id, recipient: friendId },
        { requester: friendId, recipient: req.user._id }
      ]
    });
    if (!isFriend) return res.status(403).json({ error: 'You are not friends' });

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: friendId },
        { sender: friendId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 }).lean(); // oldest first for chat UI

    // Mark unread messages as read
    await Message.updateMany(
      { sender: friendId, receiver: req.user._id, read: false },
      { read: true }
    );

    res.json({ messages });
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const friendId = req.params.id;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const isFriend = await Friendship.findOne({
      status: 'accepted',
      $or: [
        { requester: req.user._id, recipient: friendId },
        { requester: friendId, recipient: req.user._id }
      ]
    });
    if (!isFriend) return res.status(403).json({ error: 'You are not friends' });

    const message = await Message.create({
      sender: req.user._id,
      receiver: friendId,
      content: content.trim()
    });

    // Notify new unread message (only if Socket.io is not directly connected for now)
    createNotification(
      friendId,
      'friend',
      'New Message',
      `You received a new message from ${req.user.displayName}`
    ).catch(console.error);

    res.json({ success: true, message });
  } catch (err) { next(err); }
};
