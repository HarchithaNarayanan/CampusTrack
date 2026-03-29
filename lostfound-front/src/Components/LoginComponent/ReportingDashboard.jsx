import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../DisplayView.css';

const ReportingDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLost: 0,
    totalFound: 0,
    totalMatches: 0,
    totalStudents: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from AdminController
    axios.get('http://localhost:9595/lostfound/admin/stats', { withCredentials: true })
      .then(res => {
        setStats(res.data);
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  // Simple calculation to find the max value for dynamic bar height mapping
  const maxStat = Math.max(stats.totalLost, stats.totalFound, stats.totalMatches, 1);
  
  const getBarHeight = (val) => {
    return `${Math.max(10, (val / maxStat) * 100)}%`; 
  };

  return (
    <div className="ct-dashboard">
      <nav className="ct-navbar">
        <span className="ct-navbar-brand">🎓 CampusTrack</span>
        <div className="ct-navbar-links">
            <button className="ct-nav-btn" onClick={() => navigate('/admin-menu')}>🏠 Admin Menu</button>
        </div>
      </nav>

      <div className="ct-welcome" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>📊</div>
        <h2>Reporting Dashboard</h2>
        <p>Real-time analytics and platform engagement outcomes.</p>

        {/* Stat Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px', marginTop: '30px'
        }}>
          <div style={cardStyle('#E74C3C')}>
            <h3>Lost Items Reported</h3>
            <div style={numberStyle}>{stats.totalLost}</div>
          </div>
          <div style={cardStyle('#3498DB')}>
            <h3>Found Items Recovered</h3>
            <div style={numberStyle}>{stats.totalFound}</div>
          </div>
          <div style={cardStyle('#F1C40F')}>
            <h3>Successful Matches</h3>
            <div style={numberStyle}>{stats.totalMatches}</div>
          </div>
          <div style={cardStyle('#2ECC71')}>
            <h3>Registered Students</h3>
            <div style={numberStyle}>{stats.totalStudents}</div>
          </div>
        </div>

        {/* Visual Analytics Section */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '30px', marginTop: '40px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #eee'
        }}>
          <h3 style={{ marginBottom: '30px', color: '#333' }}>Activity Comparison</h3>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '250px', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>
            
            <div style={{...barContainer}}>
              <div style={{...barStyle('#E74C3C'), height: getBarHeight(stats.totalLost)}}>
                 <span style={barLabel}>{stats.totalLost}</span>
              </div>
              <div style={barTitle}>Lost</div>
            </div>

            <div style={{...barContainer}}>
              <div style={{...barStyle('#3498DB'), height: getBarHeight(stats.totalFound)}}>
                 <span style={barLabel}>{stats.totalFound}</span>
              </div>
              <div style={barTitle}>Found</div>
            </div>

            <div style={{...barContainer}}>
              <div style={{...barStyle('#F1C40F'), height: getBarHeight(stats.totalMatches)}}>
                 <span style={barLabel}>{stats.totalMatches}</span>
              </div>
              <div style={barTitle}>Matches</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// Inline Styles for Dashboard
const cardStyle = (color) => ({
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  borderTop: `6px solid ${color}`,
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  textAlign: 'center'
});

const numberStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginTop: '10px'
};

const barContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '60px',
  height: '100%'
};

const barStyle = (color) => ({
  width: '100%',
  background: color,
  borderRadius: '6px 6px 0 0',
  transition: 'height 1s ease-out',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '5px'
});

const barLabel = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
};

const barTitle = {
  marginTop: '15px',
  fontWeight: '600',
  color: '#7f8c8d'
};

export default ReportingDashboard;
