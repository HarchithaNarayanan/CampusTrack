import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const StudentMenu = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUser().then((res) => setUserName(res.data?.personalName || "Student"))
      .catch(() => setUserName("Student"));
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="ct-dashboard">
      {/* Navbar */}
      <nav className="ct-navbar">
        <span className="ct-navbar-brand">🎓 CampusTrack</span>
        <div className="ct-navbar-links">

          {/* Personal */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn">👤 Personal ▾</button>
            <div className="ct-dropdown">
              <a href="/profile">Personal Details</a>
            </div>
          </div>

          {/* Lost Item */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn">📦 Lost Item ▾</button>
            <div className="ct-dropdown">
              <a href="/lost-entry">Report Lost Item</a>
              <a href="/lost-list">My Lost Items</a>
            </div>
          </div>

          {/* Found Item */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn">🔍 Found Item ▾</button>
            <div className="ct-dropdown">
              <a href="/found-entry">Report Found Item</a>
              <a href="/found-list">My Found Items</a>
            </div>
          </div>

          {/* Chat */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn" onClick={() => navigate('/chat')}>💬 Chat</button>
          </div>

          {/* Logout */}
          <div className="ct-nav-item ct-nav-logout">
            <button className="ct-nav-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </nav>

      {/* Welcome Content */}
      <div className="ct-welcome">
        <div style={{
          fontSize: '4rem',
          marginBottom: '16px',
          animation: 'fadeInUp 0.6s ease'
        }}>🎒</div>
        <h2>Welcome, {userName}!</h2>
        <p>Manage your Lost &amp; Found items, view personal details, and chat with other students.</p>

        {/* Quick Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '36px',
          width: '100%',
          maxWidth: '700px'
        }}>
          {[
            { icon: '📦', label: 'Report Lost Item', path: '/lost-entry', color: '#6C3483' },
            { icon: '📋', label: 'My Lost Items', path: '/lost-list', color: '#4A235A' },
            { icon: '🔍', label: 'Report Found Item', path: '/found-entry', color: '#D4AC0D' },
            { icon: '📄', label: 'My Found Items', path: '/found-list', color: '#1E8449' },
          ].map((card) => (
            <button key={card.path}
              onClick={() => navigate(card.path)}
              style={{
                background: '#fff',
                border: `2px solid ${card.color}`,
                borderRadius: '14px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 12px rgba(74,35,90,0.1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = card.color; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#333'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{card.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{card.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMenu;
