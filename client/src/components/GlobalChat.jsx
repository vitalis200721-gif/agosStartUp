import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore, useUIStore } from '../store';

let socket = null;

export default function GlobalChat() {
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const addToast = useUIStore(s => s.addToast);
  const setOnlineUsers = useUIStore(s => s.setOnlineUsers);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);

  // Connect to socket when user is logged in
  useEffect(() => {
    if (!token) return;

    const serverUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://agosstartup.onrender.com';

    socket = io(serverUrl, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('online_count', (count) => {
      setOnlineUsers(count);
    });

    socket.on('chat_history', (history) => {
      setMessages(history);
    });

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
      // If chat is closed and message is from someone else, increment unread
      if (msg.userId !== user?._id) {
        setUnread(prev => prev + 1);
      }
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [token]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnread(0);
    }
  }, [messages, open]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;
    socket.emit('send_message', input.trim());
    setInput('');
  };

  if (!token) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => { setOpen(!open); if (!open) setUnread(0); }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-agos-accent text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:scale-110 transition-all flex items-center justify-center text-xl"
      >
        💬
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-agos-red rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 h-[420px] bg-agos-card border border-agos-border rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.2)] flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-4 py-3 bg-agos-surface border-b border-agos-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-display font-bold">🌐 Global Chat</span>
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-agos-green animate-pulse' : 'bg-agos-red'}`} />
            </div>
            <button onClick={() => setOpen(false)} className="text-agos-muted hover:text-white transition-colors text-sm">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            {messages.length === 0 && (
              <div className="text-center text-agos-dim text-xs py-8">
                No messages yet. Say hello! 👋
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.userId === user?._id ? 'flex-row-reverse' : ''}`}>
                <div className="w-7 h-7 rounded-full bg-agos-surface border border-agos-border flex items-center justify-center text-xs shrink-0">
                  {msg.avatar || '👤'}
                </div>
                <div className={`max-w-[70%] ${msg.userId === user?._id ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className={`text-[10px] font-bold ${msg.userId === user?._id ? 'text-agos-accent-light' : 'text-agos-cyan'}`}>
                      {msg.displayName}
                    </span>
                    <span className="text-[9px] text-agos-dim">Lv.{msg.level}</span>
                  </div>
                  <div className={`px-2.5 py-1.5 rounded-xl text-xs leading-relaxed ${
                    msg.userId === user?._id
                      ? 'bg-agos-accent/20 text-agos-text border border-agos-accent/30'
                      : 'bg-agos-surface text-agos-text border border-agos-border'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="px-3 py-2 border-t border-agos-border bg-agos-surface">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                maxLength={300}
                className="flex-1 bg-agos-bg border border-agos-border rounded-lg px-3 py-1.5 text-xs text-agos-text placeholder-agos-dim outline-none focus:border-agos-accent transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3 py-1.5 bg-agos-accent text-white rounded-lg text-xs font-bold hover:bg-agos-accent-light transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
