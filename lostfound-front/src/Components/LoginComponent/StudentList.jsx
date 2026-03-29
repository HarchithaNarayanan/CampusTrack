import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../DisplayView.css";

const BASE_URL = "http://localhost:9595/lostfound";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/students`, { withCredentials: true })
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = students.filter(s =>
    s.username?.toLowerCase().includes(search.toLowerCase()) ||
    s.personalName?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #1a0533 100%)", padding: "32px 24px", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px", color: "#fff", padding: "10px 18px", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px" }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "1.8rem", fontWeight: 700 }}>👥 Student List</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: "4px 0 0", fontSize: "0.9rem" }}>All registered users in the system</p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="🔍 Search by name, username, email or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: "480px", padding: "12px 18px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)",
            color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box"
          }}
        />
      </div>

      {/* Table Card */}
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", backdropFilter: "blur(10px)" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
            ⏳ Loading students...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
            😕 No students found.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(108,52,131,0.5)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["#", "Username", "Full Name", "Email", "Role"].map(h => (
                  <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "#D4AC0D", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.username}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 18px", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>{i + 1}</td>
                  <td style={{ padding: "14px 18px", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{s.username}</td>
                  <td style={{ padding: "14px 18px", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>{s.personalName || "—"}</td>
                  <td style={{ padding: "14px 18px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{s.email || "—"}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 600,
                      background: s.role === "ADMIN" ? "rgba(212,172,13,0.2)" : "rgba(30,132,73,0.2)",
                      color: s.role === "ADMIN" ? "#D4AC0D" : "#2ECC71",
                      border: `1px solid ${s.role === "ADMIN" ? "rgba(212,172,13,0.4)" : "rgba(30,132,73,0.4)"}`
                    }}>
                      {s.role || "STUDENT"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer count */}
      {!loading && (
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "16px", textAlign: "right" }}>
          Showing {filtered.length} of {students.length} students
        </p>
      )}
    </div>
  );
};

export default StudentList;
