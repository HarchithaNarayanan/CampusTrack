import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";
const POLL_INTERVAL = 3000; // poll every 3 seconds

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // Get logged-in user
  useEffect(() => {
    axios.get(`${BASE_URL}/user`, { withCredentials: true })
      .then(res => setCurrentUser(res.data))
      .catch(() => setCurrentUser("Guest"));
  }, []);

  // Fetch messages initially and poll
  const fetchMessages = () => {
    axios.get(`${BASE_URL}/chat`, { withCredentials: true })
      .then(res => setMessages(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    const msg = { sender: currentUser, message: newMessage.trim() };
    axios.post(`${BASE_URL}/chat`, msg, { withCredentials: true })
      .then(() => {
        setNewMessage("");
        fetchMessages();
      })
      .finally(() => setSending(false));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #1a0533 100%)",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px"
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px", color: "#fff", padding: "8px 16px", cursor: "pointer", fontSize: "0.85rem" }}
        >
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>💬 Campus Chat</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "2px 0 0", fontSize: "0.8rem" }}>
            🟢 Live · Updates every 3 seconds · Logged in as <strong style={{ color: "#D4AC0D" }}>{currentUser}</strong>
          </p>
        </div>
        <div style={{
          background: "rgba(30,132,73,0.2)", border: "1px solid rgba(30,132,73,0.4)",
          borderRadius: "20px", padding: "4px 14px", color: "#2ECC71", fontSize: "0.78rem", fontWeight: 600
        }}>
          {messages.length} messages
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxHeight: "calc(100vh - 160px)"
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginTop: "80px", fontSize: "1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>💬</div>
            No messages yet. Be the first to say something!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === currentUser;
            return (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start"
              }}>
                {/* Sender name */}
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "4px", paddingLeft: isMe ? 0 : "4px", paddingRight: isMe ? "4px" : 0 }}>
                  {isMe ? "You" : msg.sender}
                </span>
                {/* Bubble */}
                <div style={{
                  maxWidth: "65%",
                  padding: "12px 16px",
                  borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: isMe
                    ? "linear-gradient(135deg, #6C3483, #9B59B6)"
                    : "rgba(255,255,255,0.1)",
                  border: isMe ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  boxShadow: isMe ? "0 4px 15px rgba(108,52,131,0.4)" : "none"
                }}>
                  {msg.message}
                </div>
                {/* Time */}
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", marginTop: "4px" }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <div style={{
        padding: "16px 24px",
        background: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        display: "flex",
        gap: "12px",
        alignItems: "flex-end"
      }}>
        <textarea
          rows={1}
          placeholder="Type a message... (Enter to send)"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "12px 18px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: "0.95rem",
            outline: "none",
            resize: "none",
            fontFamily: "Inter, sans-serif",
            lineHeight: "1.5"
          }}
        />
        <button
          onClick={handleSend}
          disabled={sending || !newMessage.trim()}
          style={{
            padding: "12px 22px",
            borderRadius: "14px",
            border: "none",
            background: sending || !newMessage.trim()
              ? "rgba(108,52,131,0.3)"
              : "linear-gradient(135deg, #6C3483, #9B59B6)",
            color: sending || !newMessage.trim() ? "rgba(255,255,255,0.4)" : "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: sending || !newMessage.trim() ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
        >
          {sending ? "⏳" : "Send ➤"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
