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
  const [agents, setAgents] = useState<User[]>([]);
  // clients returned from API include assignment fields; use a loose shape
  const [clients, setClients] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  // Form state
  const [formAgent, setFormAgent] = useState<string>("");
  const [formClient, setFormClient] = useState<string>("");
  const [formApplication, setFormApplication] = useState<string>("");
  const [formAmount, setFormAmount] = useState<number | string>("");
  const [formReceipt, setFormReceipt] = useState<File | null>(null);

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

  const fetchMeta = async () => {
    try {
      const token = localStorage.getItem("token");
      const [agentsRes, clientsRes] = await Promise.all([
        axios.get("/api/public/agents", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/admin/clients", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setAgents(agentsRes.data || []);
      // admin/clients returns { clients, applications }
      const clientsData = clientsRes.data?.clients || [];
      const applicationsData = clientsRes.data?.applications || [];
      setClients(clientsData);
      setApplications(applicationsData);
    } catch (err) {
      // ignore meta errors for now
    }
  };

  useEffect(() => {
    fetchCommissions();
    fetchMeta();
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

  const handleCreateCommission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("agent_id", formAgent);
      form.append("client_id", formClient);
      form.append("application_id", formApplication);
      form.append("commission_amount", String(formAmount));
      if (formReceipt) form.append("receipt", formReceipt);

      await axios.post("/api/admin/commissions", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchCommissions();
      // reset
      setFormAgent("");
      setFormClient("");
      setFormApplication("");
      setFormAmount("");
      setFormReceipt(null);
      alert("Commission created");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create commission");
    }
  };

  // derived lists
  const clientsForAgent = clients.filter((c) => String(c.assignedAgent || c.assignedTo || "") === String(formAgent));
  const appsForClient = applications.filter((a) => String(a.client?._id || a.client) === String(formClient) && a.applicationStatus === "approved");

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

      <h2>Add Commission</h2>
      <form onSubmit={handleCreateCommission}>
        <div>
          <label>Agent</label>
          <select value={formAgent} onChange={(e) => setFormAgent(e.target.value)} required>
            <option value="">Select agent</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>{a.name} ({a.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label>Client (assigned to agent)</label>
          <select value={formClient} onChange={(e) => setFormClient(e.target.value)} required>
            <option value="">Select client</option>
            {clientsForAgent.map((c) => (
              <option key={c._id} value={c._id}>{c.name} ({c.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label>Approved Application</label>
          <select value={formApplication} onChange={(e) => setFormApplication(e.target.value)} required>
            <option value="">Select application</option>
            {appsForClient.map((a) => (
              <option key={a._id} value={a._id}>{a._id} - {a.visaType}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Commission Amount</label>
          <input type="number" value={formAmount as any} onChange={(e) => setFormAmount(e.target.value)} required />
        </div>
        <div>
          <label>Receipt (optional)</label>
          <input type="file" accept="image/*,application/pdf" onChange={(e) => setFormReceipt(e.target.files ? e.target.files[0] : null)} />
        </div>
        <button type="submit">Create Commission</button>
      </form>
    </div>
  );
};

export default AdminCommissions;