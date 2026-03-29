import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const AdminMenu = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUser().then((res) => setUserName(res.data?.personalName || "Admin"))
      .catch(() => setUserName("Admin"));
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

          {/* Students */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn">👥 Students ▾</button>
            <div className="ct-dropdown">
              <a href="/student-list">Student List</a>
            </div>
          </div>

          {/* Items */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn">📦 Items ▾</button>
            <div className="ct-dropdown">
              <a href="/found-list">Found Item List</a>
              <a href="/lost-list">Lost Item List</a>
              <a href="/match-list">Matched Items</a>
            </div>
          </div>

          {/* Chat & Reports */}
          <div className="ct-nav-item">
            <button className="ct-nav-btn" onClick={() => navigate('/chat')}>💬 Chat</button>
            <button className="ct-nav-btn" onClick={() => navigate('/reporting')}>📊 Reports</button>
          </div>

          {/* Logout */}
          <div className="ct-nav-item ct-nav-logout">
            <button className="ct-nav-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </nav>

      {/* Welcome Content */}
      <div className="ct-welcome">
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛡️</div>
        <h2>Welcome, {userName}!</h2>
        <p>Manage students, monitor lost &amp; found items, and oversee all matched records.</p>

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
            { icon: '📋', label: 'Lost Items', path: '/lost-list', color: '#6C3483' },
            { icon: '🔍', label: 'Found Items', path: '/found-list', color: '#4A235A' },
            { icon: '✅', label: 'Matched Items', path: '/match-list', color: '#D4AC0D' },
            { icon: '👥', label: 'Students', path: '/student-list', color: '#1E8449' },
            { icon: '📊', label: 'Reporting', path: '/reporting', color: '#E74C3C' },
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

export default AdminMenu;
