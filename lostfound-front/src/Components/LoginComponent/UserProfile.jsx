import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/LoginService";
import { getLostItemsByUsername } from "../../Services/LostItemService";
import { getFoundItemsByUsername } from "../../Services/FoundItemService";
import "../../DisplayView.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: "",
    personalName: "",
    email: "",
    role: ""
  });
  
  const [stats, setStats] = useState({
    lostCount: 0,
    foundCount: 0,
    recoveredCount: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine overall stats
    Promise.all([
      getUser(),
      getLostItemsByUsername(),
      getFoundItemsByUsername()
    ])
    .then(([userRes, lostRes, foundRes]) => {
      setProfileData(userRes.data);
      
      const lostItems = lostRes.data || [];
      const foundItems = foundRes.data || [];
      const recovered = lostItems.filter(item => item.status === true).length;

      setStats({
        lostCount: lostItems.length,
        foundCount: foundItems.length,
        recoveredCount: recovered
      });
      
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load user profile or stats", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="ct-page">
      <div className="ct-header">
        🎓 CampusTrack 
        <span>Personal Profile</span>
      </div>

      <div className="ct-card" style={{ marginTop: '30px' }}>
        <h2 className="ct-title">My Information</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={profileFieldStyle}>
              <div style={labelStyle}>User ID / Roll Number:</div>
              <div style={valueStyle}>{profileData.username}</div>
            </div>

            <div style={profileFieldStyle}>
              <div style={labelStyle}>Full Name:</div>
              <div style={valueStyle}>{profileData.personalName}</div>
            </div>

            <div style={profileFieldStyle}>
              <div style={labelStyle}>Campus Email Address:</div>
              <div style={valueStyle}>{profileData.email}</div>
            </div>

            <div style={profileFieldStyle}>
              <div style={labelStyle}>Department:</div>
              <div style={valueStyle}>{profileData.department || "N/A"}</div>
            </div>

            {profileData.role === 'Student' && (
              <div style={profileFieldStyle}>
                <div style={labelStyle}>Year of Study:</div>
                <div style={valueStyle}>{profileData.yearOfStudy || "N/A"}</div>
              </div>
            )}

            <div style={profileFieldStyle}>
              <div style={labelStyle}>Account Type:</div>
              <div style={valueStyle}>
                <span style={{
                    background: profileData.role === 'Admin' ? '#D4AC0D' : '#6C3483',
                    color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  {profileData.role}
                </span>
              </div>
            </div>

            <hr style={{ borderTop: '1px solid #eee', margin: '10px 0' }} />

            <h3 style={{ color: '#4A235A', fontSize: '1.2rem', margin: '0 0 -10px 0', textAlign: 'center' }}>My Activity</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
               <div style={{...profileFieldStyle, background: '#fef5f5', border: '1px solid #f9dcdc'}}>
                  <div style={labelStyle}>Lost Reported</div>
                  <div style={{...valueStyle, fontSize: '1.5rem', color: '#c0392b'}}>{stats.lostCount}</div>
               </div>
               <div style={{...profileFieldStyle, background: '#f4f9f4', border: '1px solid #d4efd4'}}>
                  <div style={labelStyle}>Found Reported</div>
                  <div style={{...valueStyle, fontSize: '1.5rem', color: '#1e8449'}}>{stats.foundCount}</div>
               </div>
               <div style={{...profileFieldStyle, background: '#fefbf0', border: '1px solid #faecca'}}>
                  <div style={labelStyle}>Items Recovered</div>
                  <div style={{...valueStyle, fontSize: '1.5rem', color: '#b7950b'}}>{stats.recoveredCount}</div>
               </div>
            </div>

            <div className="ct-btn-group" style={{ marginTop: '20px' }}>
              <button 
                className="ct-btn ct-btn-gold" 
                onClick={() => navigate(profileData.role === 'Admin' ? '/admin-menu' : '/student-menu')}
              >
                🏠 Return to Menu
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styling for the profile view
const profileFieldStyle = {
  background: '#fcfcfc',
  padding: '16px 20px',
  borderRadius: '12px',
  border: '1px solid #f0e8fa',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontSize: '0.82rem',
  fontWeight: '600',
  color: '#5D3A7A',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const valueStyle = {
  fontSize: '1.05rem',
  fontWeight: '500',
  color: '#2c3e50'
};

export default UserProfile;
