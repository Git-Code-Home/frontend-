import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import adminApi from "@/lib/adminApi";

type User = { _id: string; name: string; email: string; assignedAgent?: string | any; assignedTo?: string | any };

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
  // form state
  const [agents, setAgents] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState<string | null>(null);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [applicationId, setApplicationId] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [createReceipt, setCreateReceipt] = useState<File | null>(null);

  const fetchMeta = async () => {
    setMetaError(null);
    try {
      const token = localStorage.getItem("adminToken");

      // Fetch agents using centralized adminApi
      let agentsList: User[] = []
      try {
        const agentsRes = await adminApi.get("/agents")
        // adminApi returns parsed JSON directly
        if (Array.isArray(agentsRes)) {
          agentsList = agentsRes
        } else if (agentsRes && Array.isArray(agentsRes.agents)) {
          agentsList = agentsRes.agents
        } else {
          console.warn("Unexpected agents response format:", agentsRes)
        }
      } catch (e) {
        // fallback to public agents endpoint if admin agents is not available
        try {
          const r = await api.get("/public/agents", { headers: { Authorization: `Bearer ${token}` } })
          const data = r?.data ?? r
          agentsList = Array.isArray(data) ? data : (Array.isArray(data?.agents) ? data.agents : [])
        } catch (err) {
          console.warn("Failed to fetch agents from fallback:", err)
        }
      }

      setAgents(agentsList)

      // Initially load all clients (without agent filter) so the full list is available
      // When user selects an agent, the useEffect will reload filtered clients
      try {
        const clientsRes = await adminApi.get("/clients")
        if (clientsRes && Array.isArray(clientsRes.clients)) {
          setClients(clientsRes.clients)
          setApplications(Array.isArray(clientsRes.applications) ? clientsRes.applications : [])
        } else if (Array.isArray(clientsRes)) {
          setClients(clientsRes)
          setApplications([])
        } else {
          setClients([])
          setApplications([])
        }
      } catch (e) {
        console.warn("Failed to fetch initial clients:", e)
        setClients([])
        setApplications([])
      }
    } catch (err: any) {
      console.error("fetchMeta error", err?.message || err);
      setMetaError("Failed to load agents or clients. Check network/auth.");
      setAgents([]);
      setClients([]);
      setApplications([]);
    }
  };
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
    fetchMeta();
  }, []);

  // When agent changes, load clients for that agent
  useEffect(() => {
    const loadClientsForAgent = async () => {
      setClientsError(null);
      setClientsLoading(true);
      try {
        // adminApi.get returns parsed JSON directly (not wrapped in .data)
        const res = await adminApi.get(`/clients?agentId=${agentId}`)
        // Backend returns { clients: [...], applications: [...] }
        if (!res) {
          setClients([])
        } else if (Array.isArray(res.clients)) {
          setClients(res.clients)
        } else if (Array.isArray(res)) {
          setClients(res)
        } else {
          console.warn("Unexpected clients response format:", res)
          setClients([])
        }
      } catch (err: any) {
        console.error("loadClientsForAgent error", err?.message || err);
        setClientsError("Failed to load clients for selected agent");
        setClients([]);
      }
      setClientsLoading(false);
    };

    // clear selection when agent changes
    setClientId("");
    setApplicationId("");
    setApplications([]);
    if (agentId) loadClientsForAgent();
    else setClients([]);
  }, [agentId]);

  // When client changes, load approved applications for that client
  useEffect(() => {
    const loadAppsForClient = async () => {
      setAppsError(null);
      setAppsLoading(true);
      try {
        // adminApi.get returns parsed JSON directly
        const res = await adminApi.get(`/applications?clientId=${clientId}&status=approved`)
        let appList: any[] = []
        
        // Backend may return { applications: [...] } or an array directly
        if (!res) {
          appList = []
        } else if (Array.isArray(res)) {
          appList = res
        } else if (Array.isArray(res.applications)) {
          appList = res.applications
        } else {
          console.warn("Unexpected applications response format:", res)
          appList = []
        }

        // Filter approved applications that belong to the selected client
        appList = appList.filter((a) => {
          const appClientId = a.client?._id || a.client
          const isClientMatch = String(appClientId) === String(clientId)
          const status = a.applicationStatus || a.status
          const isApproved = status === "approved"
          return isClientMatch && isApproved
        })

        setApplications(appList)
      } catch (err: any) {
        console.error("loadAppsForClient error", err?.message || err);
        setAppsError("Failed to load applications for selected client");
        setApplications([]);
      }
      setAppsLoading(false);
    };

    setApplicationId("");
    if (clientId) loadAppsForClient();
    else setApplications([]);
  }, [clientId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const fd = new FormData();
      // validate
      if (!agentId) return alert("Please select an agent");
      if (!clientId) return alert("Please select a client");
      if (!applicationId) return alert("Please select an approved application");
      if (!amount) return alert("Please enter commission amount");

      fd.append("agent_id", agentId);
      fd.append("client_id", clientId);
      fd.append("application_id", applicationId);
      fd.append("commission_amount", String(amount));
      if (createReceipt) fd.append("receipt", createReceipt);

      await api.post("/admin/commissions", fd, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      setAgentId("");
      setClientId("");
  setApplicationId("");
      setAmount("");
      setCreateReceipt(null);
      await fetchCommissions();
      alert("Commission created");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create commission");
    }
  };

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
  {metaError && <p className="text-red-600">{metaError}</p>}

      {/* Create commission form */}
      <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Agent</label>
            <select value={agentId} onChange={(e) => setAgentId(e.target.value)} className="mt-1 block w-full rounded border p-2">
              <option value="">Select agent</option>
              {Array.isArray(agents) && agents.length > 0 ? (
                agents.map((a) => (
                  <option key={a._id} value={a._id}>{a.name} ({a.email})</option>
                ))
              ) : (
                <option disabled>No agents available</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client</label>
            <select value={clientId} onChange={(e) => { setClientId(e.target.value); setApplicationId(""); }} className="mt-1 block w-full rounded border p-2">
              <option value="">Select client</option>
              {clientsLoading ? (
                <option disabled>Loading clients...</option>
              ) : clientsError ? (
                <option disabled>{clientsError}</option>
              ) : Array.isArray(clients) && clients.length > 0 ? (
                clients.map((c) => (
                  <option key={c._id} value={c._id}>{c.name} ({c.email})</option>
                ))
              ) : (
                <option disabled>No clients available</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Approved Application</label>
            <select value={applicationId} onChange={(e) => setApplicationId(e.target.value)} className="mt-1 block w-full rounded border p-2">
              <option value="">Select application</option>
              {appsLoading ? (
                <option disabled>Loading applications...</option>
              ) : appsError ? (
                <option disabled>{appsError}</option>
              ) : Array.isArray(applications) && applications.length > 0 ? (
                applications.map((a) => (
                  <option key={a._id} value={a._id}>{a._id} — {a.visaType || a.applicationType || "Application"}</option>
                ))
              ) : (
                <option disabled>No approved applications</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Commission Amount</label>
            <input type="number" value={amount as any} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Receipt (optional)</label>
            <input type="file" accept="image/*,application/pdf" onChange={(e) => setCreateReceipt(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full" />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Create Commission</button>
        </div>
      </form>

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
