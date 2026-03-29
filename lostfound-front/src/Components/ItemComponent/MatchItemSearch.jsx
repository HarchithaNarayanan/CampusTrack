import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import '../../DisplayView.css';

const MatchItemSearch = () => {
  const { lostItemId } = useParams();
  const navigate = useNavigate();
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    getFoundItemsByLostItem(lostItemId)
      .then((response) => setFoundItems(response.data))
      .catch(() => alert("Error loading matching items"));
  }, [lostItemId]);

  const matchItemHandler = (item) => {
    const match = {
      lostItemId: lostItemId,
      foundItemId: item.foundItemId,
      itemName: item.foundItemName,
      category: item.category,
      foundUsername: item.username,
    };
    saveMatchItem(match)
      .then(() => {
        alert("✅ Item Matched Successfully!");
        navigate("/student-menu");
      })
      .catch(() => alert("Error while matching item"));
  };

  return (
    <div className="ct-table-wrapper">
      <div className="ct-table-title">🔗 Matching Found Items</div>
      <p style={{ textAlign: 'center', color: '#7D5A8A', marginBottom: '16px', fontSize: '0.9rem' }}>
        Showing matches for Lost Item ID: <strong>{lostItemId}</strong>
      </p>

      <div style={{ overflowX: 'auto' }}>
        {foundItems.length === 0 ? (
          <div className="ct-error-msg">⚠️ No matching found items at the moment.</div>
        ) : (
          <table className="ct-table">
            <thead>
              <tr>
                <th>Found Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Reported By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foundItems.map((item) => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemId}</td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.username}</td>
                  <td>
                    <button
                      className="ct-btn ct-btn-green"
                      style={{ padding: '5px 14px', fontSize: '0.82rem' }}
                      onClick={() => matchItemHandler(item)}>
                      Match ✓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="ct-btn-group" style={{ marginTop: '20px' }}>
        <button className="ct-btn ct-btn-primary" onClick={() => navigate("/student-menu")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MatchItemSearch;
