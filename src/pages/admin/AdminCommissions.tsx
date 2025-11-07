import React, { useEffect, useState } from "react";
import api from "@/lib/api";

type User = { _id: string; name: string; email: string };

type Commission = {
  _id: string;
  agent: User;
  client: User;
  amount: number;
  status: string;
  paymentProof?: string;
  createdAt: string;
};

export default function AdminCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [fileMap, setFileMap] = useState<Record<string, File | null>>({});

  const fetchCommissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/admin/commissions", { headers: { Authorization: `Bearer ${token}` } });
      setCommissions(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load commissions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const handleFileChange = (id: string, f: File | null) => {
    setFileMap((m) => ({ ...m, [id]: f }));
  };

  const handleUpload = async (id: string) => {
    const file = fileMap[id];
    if (!file) return alert("Select a file first");
    setUploadingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      const fd = new FormData();
      fd.append("receipt", file);
      await api.put(`/admin/commissions/${id}/receipt`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setFileMap((m) => ({ ...m, [id]: null }));
      await fetchCommissions();
      alert("Receipt uploaded and commission marked as paid.");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Upload failed");
    }
    setUploadingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Commissions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Agent</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Client</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Receipt</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {commissions.map((c) => (
              <tr key={c._id}>
                <td className="px-4 py-3 text-sm">{c.agent?.name ?? "-"} <div className="text-xs text-gray-400">{c.agent?.email}</div></td>
                <td className="px-4 py-3 text-sm">{c.client?.name ?? "-"} <div className="text-xs text-gray-400">{c.client?.email}</div></td>
                <td className="px-4 py-3 text-sm">{c.amount}</td>
                <td className="px-4 py-3 text-sm">
                  {c.status === "paid" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Paid</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {c.paymentProof ? (
                    <a className="text-sky-600 underline" href={c.paymentProof.startsWith("http") ? c.paymentProof : `/${c.paymentProof}`} target="_blank" rel="noreferrer">View</a>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(c._id, e.target.files ? e.target.files[0] : null)} />
                    <button
                      className="px-3 py-1 rounded bg-sky-600 text-white text-sm disabled:opacity-60"
                      onClick={() => handleUpload(c._id)}
                      disabled={uploadingId === c._id}
                    >
                      {uploadingId === c._id ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {commissions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No commissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
