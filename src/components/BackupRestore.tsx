import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Upload, Trash2, Database, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Backup {
  name: string;
  size: string;
  sizeBytes: number;
  created: string;
  modified: string;
}

interface BackupRestoreProps {
  apiBaseUrl?: string;
}

const BackupRestore: React.FC<BackupRestoreProps> = ({ 
  apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000' 
}) => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [backupToDelete, setBackupToDelete] = useState<string | null>(null);

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch all backups
  const fetchBackups = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${apiBaseUrl}/api/admin/backup/list`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (response.data.success) {
        setBackups(response.data.backups);
      }
    } catch (err: any) {
      console.error('Error fetching backups:', err);
      setError(err.response?.data?.message || 'Failed to fetch backups');
    } finally {
      setLoading(false);
    }
  };

  // Create new backup
  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await axios.post(
        `${apiBaseUrl}/api/admin/backup/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(`Backup created successfully: ${response.data.backup.name}`);
        fetchBackups();
      }
    } catch (err: any) {
      console.error('Error creating backup:', err);
      setError(err.response?.data?.message || 'Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  // Download backup
  const handleDownloadBackup = async (filename: string) => {
    try {
      setError(null);

      const response = await axios.get(
        `${apiBaseUrl}/api/admin/backup/download/${filename}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
          responseType: 'blob',
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(`Backup downloaded: ${filename}`);
    } catch (err: any) {
      console.error('Error downloading backup:', err);
      setError(err.response?.data?.message || 'Failed to download backup');
    }
  };

  // Delete backup
  const handleDeleteBackup = async (filename: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(
        `${apiBaseUrl}/api/admin/backup/delete/${filename}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(`Backup deleted: ${filename}`);
        fetchBackups();
      }
    } catch (err: any) {
      console.error('Error deleting backup:', err);
      setError(err.response?.data?.message || 'Failed to delete backup');
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
      setBackupToDelete(null);
    }
  };

  // Handle file selection for restore
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.zip')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please select a valid ZIP backup file');
        setSelectedFile(null);
      }
    }
  };

  // Restore from backup
  const handleRestoreBackup = async () => {
    if (!selectedFile) {
      setError('Please select a backup file');
      return;
    }

    try {
      setRestoring(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('backupFile', selectedFile);

      const response = await axios.post(
        `${apiBaseUrl}/api/admin/backup/restore`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSuccess('System restored successfully! Please refresh the page.');
        setShowRestoreDialog(false);
        setSelectedFile(null);
        fetchBackups();
      }
    } catch (err: any) {
      console.error('Error restoring backup:', err);
      setError(err.response?.data?.message || 'Failed to restore backup');
    } finally {
      setRestoring(false);
    }
  };

  // Load backups on mount
  useEffect(() => {
    fetchBackups();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Backup & Restore</h2>
          <p className="text-muted-foreground">
            Create, download, and restore system backups
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleCreateBackup}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            Create Backup
          </Button>
          <Button
            onClick={() => setShowRestoreDialog(true)}
            variant="outline"
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Restore Backup
          </Button>
        </div>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Backups List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Backups</CardTitle>
          <CardDescription>
            List of all system backups. You can download or delete them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && backups.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : backups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No backups found. Create your first backup to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.name}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium">{backup.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Created: {formatDate(backup.created)} • Size: {backup.size}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadBackup(backup.name)}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setBackupToDelete(backup.name);
                        setShowDeleteDialog(true);
                      }}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Restore Dialog */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Restore System Backup
            </DialogTitle>
            <DialogDescription>
              Warning: This will replace all current data with the backup data.
              This action cannot be undone. Please make sure you have a recent backup
              before proceeding.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileSelect}
                className="hidden"
                id="backup-file-input"
              />
              <label
                htmlFor="backup-file-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-sm">
                  {selectedFile ? (
                    <span className="font-medium text-green-600">
                      {selectedFile.name}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Click to select backup file (.zip)
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRestoreDialog(false);
                setSelectedFile(null);
                setError(null);
              }}
              disabled={restoring}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRestoreBackup}
              disabled={!selectedFile || restoring}
              className="bg-red-600 hover:bg-red-700"
            >
              {restoring ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Restoring...
                </>
              ) : (
                'Restore Now'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Backup</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this backup? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm font-medium">{backupToDelete}</p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setBackupToDelete(null);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => backupToDelete && handleDeleteBackup(backupToDelete)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackupRestore;
