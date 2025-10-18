import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Commission {
  _id: string;
  agent: User;
  client: User;
  amount: number;
  status: string;
  paymentProof?: string;
  createdAt: string;
}

const AdminCommissions: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const fetchCommissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/admin/commissions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCommissions(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch commissions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleUploadProof = async (commissionId: string) => {
    if (!paymentProof) return;
    const formData = new FormData();
    formData.append("paymentProof", paymentProof);

    try {
      await axios.put(`/api/admin/commissions/${commissionId}/proof`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPaymentProof(null);
      setSelectedCommission(null);
      fetchCommissions();
      alert("Payment proof uploaded and commission marked as paid.");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to upload payment proof");
    }
  };

  return (
    <div>
      <h1>Admin Commissions</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr key={commission._id}>
              <td>{commission.agent?.name} ({commission.agent?.email})</td>
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
              <td>
                {commission.status !== "paid" && (
                  <>
                    <button onClick={() => setSelectedCommission(commission)}>
                      Upload Payment Proof
                    </button>
                    {selectedCommission?._id === commission._id && (
                      <div>
                        <input type="file" accept="image/*" onChange={handleProofChange} />
                        <button onClick={() => handleUploadProof(commission._id)} disabled={!paymentProof}>
                          Submit
                        </button>
                        <button onClick={() => setSelectedCommission(null)}>Cancel</button>
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCommissions;