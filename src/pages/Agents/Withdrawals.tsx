import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Commission {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
}

const Withdrawals: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestingId, setRequestingId] = useState<string | null>(null);

  const fetchCommissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/agent/commissions", {
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

  const { toast } = useToast();

  const handleRequestWithdrawal = async (id: string) => {
    // Withdrawals are intentionally out-of-scope for this project.
    // Avoid calling any withdraw endpoints that don't exist on the backend.
    toast({ title: "Withdrawals disabled", description: "Withdrawals are not enabled in this deployment.", variant: "destructive" })
    return;
  };

  return (
    <div>
      <h1>Withdrawals</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commissions
            .filter((c) => c.status !== "paid")
            .map((commission) => (
              <tr key={commission._id}>
                <td>{commission.amount}</td>
                <td>{commission.status}</td>
                <td>{new Date(commission.createdAt).toLocaleString()}</td>
                <td>
                  {commission.status !== "withdrawal_requested" ? (
                    <button
                      onClick={() => handleRequestWithdrawal(commission._id)}
                      disabled={requestingId === commission._id}
                    >
                      {requestingId === commission._id ? "Requesting..." : "Request Withdrawal"}
                    </button>
                  ) : (
                    "Requested"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Withdrawals;