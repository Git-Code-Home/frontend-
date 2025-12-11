import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams } from "react-router-dom";
import adminApi from "@/lib/adminApi";

export default function ApplicationDetail() {
  const { id } = useParams();
  const [app, setApp] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApp = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get(`/applications/${id}`);
      setApp(res);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApp() }, [id]);

  if (loading) return <DashboardLayout userRole="admin" userName="Admin User"><div className="p-6">Loading...</div></DashboardLayout>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Application Detail</h1>
        {error && <p className="text-red-600">{error}</p>}
        {!app && !loading && <p>No application found.</p>}

        {app && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded shadow p-4">
              <h2 className="font-semibold">Client</h2>
              <p>{app.client?.name} — {app.client?.email}</p>

              <h3 className="mt-4 font-semibold">Fields</h3>
              <div className="mt-2 space-y-2">
                {app.details && app.details.length > 0 ? (
                  app.details.map((d:any) => (
                    <div key={d._id} className="p-2 border rounded">
                      <div className="text-xs text-gray-500">{d.fieldName}</div>
                      <div className="font-medium">{String(d.fieldValue)}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No form fields submitted.</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold">Documents</h3>
              <div className="mt-2 space-y-2">
                {app.documentsList && app.documentsList.length > 0 ? (
                  app.documentsList.map((d:any) => (
                    <div key={d._id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{d.fileName}</div>
                        <div className="text-xs text-gray-500">{d.fieldName}</div>
                      </div>
                      <div className="space-x-2">
                        <a className="text-sky-600" href={`/api/admin/applications/${id}/documents/download?field=${d.fieldName}`} target="_blank" rel="noreferrer">Preview</a>
                        <a className="text-sky-600" href={`/api/admin/applications/${id}/documents/download?field=${d.fieldName}`} download>Download</a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No documents uploaded.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
