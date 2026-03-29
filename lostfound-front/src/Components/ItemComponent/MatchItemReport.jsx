import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../Services/MatchItemService";
import { useNavigate } from "react-router-dom";
import '../../DisplayView.css';

const MatchItemReport = () => {
  const [matchList, setMatchList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMatches().then((response) => setMatchList(response.data));
  }, []);

  return (
    <div className="ct-table-wrapper">
      <div className="ct-table-title">✅ Matched Items Report</div>

      <div style={{ overflowX: 'auto' }}>
        {matchList.length === 0 ? (
          <div className="ct-error-msg">No matched items found yet.</div>
        ) : (
          <table className="ct-table">
            <thead>
              <tr>
                <th>Lost Item Id</th>
                <th>Found Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Found By</th>
              </tr>
            </thead>
            <tbody>
              {matchList.map((item, index) => (
                <tr key={index}>
                  <td>{item.matchItemId.lostItemId}</td>
                  <td>{item.matchItemId.foundItemId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.foundUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="ct-btn-group" style={{ marginTop: '20px' }}>
        <button className="ct-btn ct-btn-green" onClick={() => navigate('/admin-menu')}>
          Return to Admin
        </button>
      </div>
    </div>
  );
};

export default MatchItemReport;
