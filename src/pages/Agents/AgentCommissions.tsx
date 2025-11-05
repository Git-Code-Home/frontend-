import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Commission {
  _id: string;
  client: User;
  amount: number;
  status: string;
  paymentProof?: string;
  createdAt: string;
}

const AgentCommissions: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ total: number; paid: number; pending: number } | null>(null);

  const fetchCommissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/agent/commissions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCommissions(res.data);
      // fetch summary
      try {
        const s = await axios.get("/api/agent/commissions/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSummary(s.data);
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch commissions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  return (
    <div>
      <h1>My Commissions</h1>
      {summary && (
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ padding: 12, border: "1px solid #ddd" }}>
            <div>Total</div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>{summary.total}</div>
          </div>
          <div style={{ padding: 12, border: "1px solid #ddd" }}>
            <div>Received</div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>{summary.paid}</div>
          </div>
          <div style={{ padding: 12, border: "1px solid #ddd" }}>
            <div>Pending</div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>{summary.pending}</div>
          </div>
        </div>
      )}
      <h1>My Commissions</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Proof</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr key={commission._id}>
              <td>{commission.client?.name} ({commission.client?.email})</td>
              <td>{commission.amount}</td>
              <td>{commission.status}</td>
              <td>
                {commission.paymentProof ? (
                  <a href={`/${commission.paymentProof}`} target="_blank" rel="noopener noreferrer">
                    View Proof
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td>{new Date(commission.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentCommissions;