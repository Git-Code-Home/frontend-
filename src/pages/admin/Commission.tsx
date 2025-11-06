import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Commission = () => {
  const [commissions, setCommissions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);
  const [applications, setApplications] = useState([]);

  const [agentId, setAgentId] = useState("");
  const [clientId, setClientId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [receiptFile, setReceiptFile] = useState(null);

  const [filterAgent, setFilterAgent] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchMeta = async () => {
    try {
      const [agentsRes, clientsRes] = await Promise.all([
        axios.get("/api/public/agents", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/admin/clients", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setAgents(agentsRes.data || []);
      const clientsData = clientsRes.data?.clients || [];
      const appsData = clientsRes.data?.applications || [];
      setClients(clientsData);
      setApplications(appsData.filter(a => a.applicationStatus === "approved"));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCommissions = async () => {
    try {
      const params = {};
      if (filterAgent) params.agent = filterAgent;
      if (filterClient) params.client = filterClient;
      if (filterStatus) params.status = filterStatus;
      if (search) params.search = search;

      const res = await axios.get("/api/admin/commissions", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setCommissions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeta();
    fetchCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("agent_id", agentId);
      form.append("client_id", clientId);
      form.append("application_id", applicationId);
      form.append("commission_amount", amount);
      form.append("status", status);
      if (receiptFile) form.append("receipt", receiptFile);

      await axios.post("/api/admin/commissions", form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setAgentId("");
      setClientId("");
      setApplicationId("");
      setAmount("");
      setStatus("pending");
      setReceiptFile(null);
      fetchCommissions();
      alert("Commission created");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create commission");
    }
  };

  const handleUploadReceipt = async (id, file) => {
    try {
      const form = new FormData();
      form.append("receipt", file);
      await axios.put(`/api/admin/commissions/${id}/receipt`, form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      fetchCommissions();
      alert("Receipt uploaded");
    } catch (err) {
      console.error(err);
      alert("Failed to upload receipt");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`/api/admin/commissions/${id}`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCommissions();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const clientsForAgent = clients.filter(c => String(c.assignedAgent || c.assignedTo || "") === String(agentId));
  const appsForClient = applications.filter(a => String(a.client?._id || a.client) === String(clientId));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Commission Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <form className="p-4 border rounded-lg bg-card" onSubmit={handleCreate}>
          <h3 className="font-semibold mb-3">Add Commission</h3>
          <div className="space-y-2">
            <label className="text-sm">Agent</label>
            <select className="w-full p-2 border rounded" value={agentId} onChange={e => setAgentId(e.target.value)} required>
              <option value="">Select agent</option>
              {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
            </select>

            <label className="text-sm">Client</label>
            <select className="w-full p-2 border rounded" value={clientId} onChange={e => setClientId(e.target.value)} required>
              <option value="">Select client</option>
              {clientsForAgent.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            <label className="text-sm">Application (approved)</label>
            <select className="w-full p-2 border rounded" value={applicationId} onChange={e => setApplicationId(e.target.value)} required>
              <option value="">Select application</option>
              {appsForClient.map(a => <option key={a._id} value={a._id}>{a._id} - {a.visaType}</option>)}
            </select>

            <label className="text-sm">Amount</label>
            <Input value={amount} onChange={e => setAmount(e.target.value)} type="number" required />

            <label className="text-sm">Status</label>
            <select className="w-full p-2 border rounded" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>

            <label className="text-sm">Receipt (optional)</label>
            <input type="file" accept="image/*,application/pdf" onChange={e => setReceiptFile(e.target.files ? e.target.files[0] : null)} />

            <div className="mt-3">
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>

        <div className="lg:col-span-2 p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-3 mb-4">
            <select className="p-2 border rounded" value={filterAgent} onChange={e => setFilterAgent(e.target.value)}>
              <option value="">All agents</option>
              {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
            </select>
            <select className="p-2 border rounded" value={filterClient} onChange={e => setFilterClient(e.target.value)}>
              <option value="">All clients</option>
              {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select className="p-2 border rounded" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <Input placeholder="Search by client or application" value={search} onChange={e => setSearch(e.target.value)} />
            <Button onClick={fetchCommissions}>Filter</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Agent</th>
                  <th className="p-2">Client</th>
                  <th className="p-2">Application</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Receipt</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map(c => (
                  <tr key={c._id} className="border-t">
                    <td className="p-2">{c.agent?.name}</td>
                    <td className="p-2">{c.client?.name}</td>
                    <td className="p-2">{c.application?._id || c.application}</td>
                    <td className="p-2">{c.amount}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded ${c.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {c.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2">
                      {c.paymentProof ? (
                        <a href={c.paymentProof} target="_blank" rel="noreferrer" className="text-blue-600">View</a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-2">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="p-2 flex gap-2">
                      <input type="file" onChange={e => e.target.files && handleUploadReceipt(c._id, e.target.files[0])} />
                      {c.status !== 'paid' && (
                        <Button onClick={() => handleStatusUpdate(c._id, 'paid')}>Mark Paid</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;
