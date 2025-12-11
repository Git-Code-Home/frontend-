import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import adminApi from "@/lib/adminApi";
import { useNavigate } from "react-router-dom";

export default function ClientApplications() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get("/clients");
      // res may be { clients, applications } or array
      let list: any[] = [];
      if (!res) list = [];
      else if (Array.isArray(res)) list = res;
      else if (Array.isArray(res.clients)) list = res.clients;
      setClients(list);
    } catch (e: any) {
      setError(e?.message || String(e));
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients() }, []);

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Client Applications</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Applications</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.totalApplications ?? c.applications?.length ?? 0}</td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1 bg-sky-600 text-white rounded" onClick={() => navigate(`/admin/clients/${c._id}/applications`)}>View Applications</button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">No clients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
