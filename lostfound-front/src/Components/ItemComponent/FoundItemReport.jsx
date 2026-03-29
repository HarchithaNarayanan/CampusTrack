import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../Services/LoginService';
import { getAllFoundItems, getFoundItemsByUsername } from '../../Services/FoundItemService';
import '../../DisplayView.css';

const FoundItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole().then((response) => {
      setRole(response.data);
      if (response.data === 'Admin') {
        getAllFoundItems().then((res) => setItemList(res.data));
      } else if (response.data === 'Student') {
        getFoundItemsByUsername().then((res) => setItemList(res.data));
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
        {role === 'Admin' ? '🛡️ Admin — Found Item List' : '🔍 My Found Items'}
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
              <th>Found Date</th>
              <th>Department</th>
              <th>Year</th>
              <th>User Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {itemList.length === 0 ? (
              <tr><td colSpan="12" style={{ padding: '30px', color: '#888' }}>No items found.</td></tr>
            ) : (
              itemList.map((item) => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemId}</td>
                  <td>
                    {item.itemImage ? (
                      <img src={item.itemImage} alt="item" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>-</span>
                    )}
                  </td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.department || "N/A"}</td>
                  <td>{item.yearOfStudy || "Staff"}</td>
                  <td>{item.username}</td>
                  <td>
                    {item.status
                      ? <span className="ct-badge-found">Returned</span>
                      : <span className="ct-badge-notfound">Pending</span>}
                  </td>
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

export default FoundItemReport;