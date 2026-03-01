import { useState, useEffect, useRef } from 'react';
import api from '../api/client';
import { useAuthStore } from '../store';

export default function Friends() {
  const user = useAuthStore(s => s.user);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('friends'); // 'friends', 'requests', 'search'

  const messagesEndRef = useRef(null);

  const loadFriendsData = async () => {
    try {
      const { data } = await api.get('/friends');
      setFriends(data.friends);
      setPendingRequests(data.pendingRequests);
    } catch (err) {
      console.error('Failed to load friends', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFriendsData();
    // Poll for new requests/messages every 10s if active
    const interval = setInterval(loadFriendsData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadMessages = async (friendId) => {
    try {
      const { data } = await api.get(`/friends/messages/${friendId}`);
      setMessages(data.messages);
      scrollToBottom();
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  useEffect(() => {
    if (activeChat) {
      loadMessages(activeChat.user._id);
      const interval = setInterval(() => loadMessages(activeChat.user._id), 3000);
      return () => clearInterval(interval);
    }
  }, [activeChat]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      // Small ad-hoc search route for searching global users by name
      const { data } = await api.get(`/admin/users`);
      // Filter out self and exact matches
      const results = data.users.filter(u => 
        u._id !== user.id && 
        u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setTab('search');
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const sendFriendRequest = async (targetId) => {
    try {
      await api.post(`/friends/request/${targetId}`);
      alert('Friend request sent!');
      loadFriendsData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send request');
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await api.put(`/friends/accept/${requestId}`);
      loadFriendsData();
    } catch (err) {
      alert('Failed to accept request');
    }
  };

  const declineRequest = async (requestId) => {
    try {
      await api.delete(`/friends/${requestId}`);
      loadFriendsData();
    } catch (err) {
      alert('Failed to decline request');
    }
  };

  const removeFriend = async (friendshipId) => {
    if(!window.confirm('Are you sure you want to remove this friend?')) return;
    try {
      await api.delete(`/friends/${friendshipId}`);
      if (activeChat?._id === friendshipId) setActiveChat(null);
      loadFriendsData();
    } catch (err) {
      alert('Failed to remove friend');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;
    try {
      const { data } = await api.post(`/friends/messages/${activeChat.user._id}`, {
        content: messageInput
      });
      setMessages([...messages, data.message]);
      setMessageInput('');
      scrollToBottom();
    } catch (err) {
      alert('Failed to send message');
    }
  };

  if (loading) return (
    <div className="flex bg-black items-center justify-center p-12">
      <div className="w-8 h-8 border-2 border-agos-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const receivedRequests = pendingRequests.filter(r => r.type === 'received');

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex gap-4 animate-fade-in relative">
      
      {/* Left Sidebar - Friend List */}
      <div className="w-80 bg-agos-surface border border-agos-border rounded-xl flex flex-col overflow-hidden shrink-0 shadow-2xl">
        
        {/* Header & Tabs */}
        <div className="p-4 border-b border-agos-border bg-black/40">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
            <span className="text-agos-accent">👥</span> Social Hub
          </h2>
          
          <form onSubmit={handleSearch} className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search global users..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-agos-border rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-agos-accent transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-agos-dim text-sm">🔍</span>
          </form>

          <div className="flex gap-2">
            <button 
              onClick={() => setTab('friends')}
              className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors ${tab === 'friends' ? 'bg-agos-accent text-white' : 'bg-white/5 text-agos-dim hover:text-white'}`}
            >
              Friends <span className="text-[9px] bg-black/30 px-1 rounded">{friends.length}</span>
            </button>
            <button 
              onClick={() => setTab('requests')}
              className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors relative ${tab === 'requests' ? 'bg-amber-600 text-white' : 'bg-white/5 text-agos-dim hover:text-white'}`}
            >
              Requests
              {receivedRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-black"></span>
              )}
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto">
          
          {tab === 'friends' && (
            <div className="divide-y divide-white/5">
              {friends.length === 0 ? (
                <div className="p-8 text-center text-agos-dim text-sm">No friends yet. Try searching for users!</div>
              ) : friends.map(f => (
                <div 
                  key={f._id} 
                  onClick={() => setActiveChat(f)}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${activeChat?._id === f._id ? 'bg-agos-accent/20 border-l-2 border-agos-accent' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-agos-accent/20 border border-agos-accent/30 flex items-center justify-center font-bold text-agos-accent-light shrink-0">
                      {f.user.avatar ? <img src={f.user.avatar} className="w-full h-full rounded-full object-cover" /> : f.user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{f.user.displayName}</div>
                      <div className="text-[10px] text-agos-dim font-mono">Lvl {f.user.level}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'requests' && (
            <div className="p-3 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-agos-dim uppercase tracking-wider mb-2 px-1">Received ({receivedRequests.length})</h3>
                {receivedRequests.length === 0 ? (
                  <div className="text-xs text-agos-dim/50 px-1 italic">No pending requests</div>
                ) : receivedRequests.map(r => (
                  <div key={r._id} className="p-3 bg-white/5 rounded-lg border border-white/10 mb-2">
                    <div className="font-bold text-sm text-white mb-0.5">{r.user.displayName}</div>
                    <div className="text-[10px] text-agos-dim mb-3">Lvl {r.user.level}</div>
                    <div className="flex gap-2">
                      <button onClick={() => acceptRequest(r._id)} className="flex-1 bg-green-500/20 text-green-400 border border-green-500/30 py-1.5 rounded text-xs font-bold hover:bg-green-500/30 transition-colors">Accept</button>
                      <button onClick={() => declineRequest(r._id)} className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-1.5 rounded text-xs font-bold hover:bg-red-500/30 transition-colors">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-agos-dim uppercase tracking-wider mb-2 px-1">Sent ({pendingRequests.length - receivedRequests.length})</h3>
                {pendingRequests.filter(r => r.type === 'sent').map(r => (
                  <div key={r._id} className="p-2 border-b border-white/5 flex items-center justify-between">
                    <div className="text-sm text-white">{r.user.displayName}</div>
                    <button onClick={() => declineRequest(r._id)} className="text-[10px] text-red-400 hover:text-red-300">Cancel</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'search' && (
            <div className="divide-y divide-white/5">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-agos-dim text-xs">No users found.</div>
              ) : searchResults.map(u => {
                const isFriend = friends.some(f => f.user._id === u._id);
                const isPending = pendingRequests.some(r => r.user._id === u._id);
                
                return (
                  <div key={u._id} className="p-3 flex items-center justify-between hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{u.displayName.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="font-bold text-sm text-white">{u.displayName}</div>
                        <div className="text-[10px] text-agos-dim">Lvl {u.level}</div>
                      </div>
                    </div>
                    {isFriend ? (
                      <span className="text-[10px] text-agos-accent font-bold px-2 py-1 bg-agos-accent/10 rounded border border-agos-accent/20">FRIEND</span>
                    ) : isPending ? (
                      <span className="text-[10px] text-amber-500 font-bold px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20">PENDING</span>
                    ) : (u.role !== 'admin' || user.role === 'admin') && (
                      <button onClick={() => sendFriendRequest(u._id)} className="text-xs bg-agos-accent hover:bg-agos-accent-light text-white px-3 py-1.5 rounded-lg transition-colors font-bold shadow-lg shadow-agos-accent/20">
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Area - Chat Window */}
      <div className="flex-1 bg-agos-surface border border-agos-border rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-agos-border bg-black/40 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-agos-accent/20 border border-agos-accent/50 flex items-center justify-center font-bold text-lg text-agos-accent-light p-0.5 relative">
                   {activeChat.user.avatar ? <img src={activeChat.user.avatar} className="w-full h-full rounded-full object-cover" /> : activeChat.user.displayName.charAt(0).toUpperCase()}
                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{activeChat.user.displayName}</h3>
                  <p className="text-xs text-agos-dim flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Online now
                  </p>
                </div>
              </div>
              <button 
                onClick={() => removeFriend(activeChat._id)}
                className="text-xs px-3 py-1.5 border border-white/10 text-agos-dim hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 rounded transition-colors"
              >
                Remove Friend
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-agos-dim gap-2">
                  <span className="text-4xl">👋</span>
                  <p className="font-mono text-sm">Say hello to {activeChat.user.displayName}!</p>
                </div>
              ) : messages.map((m, i) => {
                const isMe = m.sender === user.id;
                return (
                  <div key={m._id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                        isMe 
                          ? 'bg-agos-accent text-white rounded-br-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                          : 'bg-white/10 text-white border border-white/10 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm break-words">{m.content}</p>
                    </div>
                    <span className="text-[9px] text-agos-dim mt-1 mx-1">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && m.read && <span className="text-blue-400 ml-1">✓✓</span>}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-agos-border bg-black/40">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder={`Message ${activeChat.user.displayName}...`}
                  className="w-full bg-black border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-agos-accent focus:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 p-2 bg-agos-accent hover:bg-agos-accent-light rounded-full text-white transition-colors"
                  disabled={!messageInput.trim()}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="w-24 h-24 bg-agos-accent/10 rounded-full flex items-center justify-center mb-6 relative z-10 border border-agos-accent/20">
              <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">💬</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 relative z-10">Secure Communications</h2>
            <p className="text-agos-dim max-w-md relative z-10">
              Select an operator from your Friends List to open an encrypted direct channel. Or search the global network to establish new connections.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
