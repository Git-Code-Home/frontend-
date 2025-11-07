import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import BASE_URL from "@/lib/BaseUrl";
import { useToast } from "@/hooks/use-toast";

type User = { _id: string; name: string; email: string };

type Commission = {
  _id: string;
  client: User;
  amount: number;
  status: string;
  paymentProof?: string;
  createdAt: string;
};

const AgentCommissions: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{ total: number; paid: number; pending: number } | null>(null);
  const { toast } = useToast();

  const fetchCommissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/agent/commissions", { headers: { Authorization: `Bearer ${token}` } });
      setCommissions(res.data || []);
      try {
        const s = await api.get("/agent/commissions/summary", { headers: { Authorization: `Bearer ${token}` } });
        setSummary(s.data || null);
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch commissions");
      toast({ title: "Failed to load commissions", description: err.response?.data?.message || "Could not fetch commissions", variant: "destructive" })
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const buildReceiptUrl = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Commissions</h1>

      {summary && (
        <div className="flex gap-4 mb-4">
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-lg font-bold">{summary.total}</div>
          </div>
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Received</div>
            <div className="text-lg font-bold">{summary.paid}</div>
          </div>
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-lg font-bold">{summary.pending}</div>
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Client</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Receipt</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {commissions.map((commission) => (
              <tr key={commission._id}>
                <td className="px-4 py-3 text-sm">{commission.client?.name} <div className="text-xs text-gray-400">{commission.client?.email}</div></td>
                <td className="px-4 py-3 text-sm">{commission.amount}</td>
                <td className="px-4 py-3 text-sm">
                  {commission.status === "paid" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Paid</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {commission.paymentProof ? (
                    <a
                      className="text-sky-600 underline"
                      href={buildReceiptUrl(commission.paymentProof)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-500">Pending Payment</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{new Date(commission.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {commissions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No commissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentCommissions;