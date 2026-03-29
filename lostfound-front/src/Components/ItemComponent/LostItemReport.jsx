import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getRole } from '../../Services/LoginService';
import { getAllLostItems, getLostItemsByUsername } from '../../Services/LostItemService';
import '../../DisplayView.css';

const LostItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole().then((response) => {
      setRole(response.data);
      if (response.data === 'Admin') {
        getAllLostItems().then((res) => setItemList(res.data));
      } else if (response.data === 'Student') {
        getLostItemsByUsername().then((res) => setItemList(res.data));
      }
    });
  }, []);

  const returnBack = () => {
    if (role === 'Admin') navigate('/admin-menu');
    else navigate('/student-menu');
  };

  return (
    <div className="ct-table-wrapper">
      <div className="ct-table-title">
        {role === 'Admin' ? '🛡️ Admin — Lost Item List' : '📦 My Lost Items'}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="ct-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Lost Date</th>
              <th>User Id</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              {role === 'Student' && <th>Search</th>}
            </tr>
          </thead>
          <tbody>
            {itemList.length === 0 ? (
              <tr><td colSpan="13" style={{ padding: '30px', color: '#888' }}>No items found.</td></tr>
            ) : (
              itemList.map((item) => (
                <tr key={item.lostItemId}>
                  <td>{item.lostItemId}</td>
                  <td>
                    {item.itemImage ? (
                      <img src={item.itemImage} alt="item" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>-</span>
                    )}
                  </td>
                  <td>{item.lostItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.lostDate}</td>
                  <td>{item.username}</td>
                  <td>{item.department || "N/A"}</td>
                  <td>{item.yearOfStudy || "Staff"}</td>
                  <td>
                    {item.status
                      ? <span className="ct-badge-found">Found</span>
                      : <span className="ct-badge-notfound">Not Found</span>}
                  </td>
                  {role === 'Student' && (
                    <td>
                      <Link to={`/match-search/${item.lostItemId}`}>
                        <button className="ct-btn ct-btn-gold" style={{ padding: '5px 12px', fontSize: '0.8rem' }}>
                          Search Match
                        </button>
                      </Link>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="ct-btn-group" style={{ marginTop: '20px' }}>
        <button className="ct-btn ct-btn-green" onClick={returnBack}>Return</button>
      </div>
    </div>
  );
};

export default LostItemReport;