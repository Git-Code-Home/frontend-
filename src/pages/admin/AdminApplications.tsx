"use client"

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Employee {
  _id: string
  name: string
  email: string
}

interface Client {
  _id: string
  name: string
  email: string
  phone: string
  password: string
  reminders: any[]
  unqualified?: boolean
  assignedTo?: Employee | string
  createdAt: string
  updatedAt: string
  __v: number
}

interface Application {
  _id: string
  client: Client
  processedBy: Employee
  visaType: string
  processingPriority: string
  applicationStatus: string
  invoice: {
    paid: boolean
  }
  documents?: {
    idCard?: string
    passport?: string
    photo?: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

interface ApiResponse {
  clients: Client[]
  applications: Application[]
}

const AdminApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/admin/public/data");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        setApplications(data.applications);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Map API status to display status
  const getDisplayStatus = (status: string): string => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'submitted':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'documents-required':
        return 'Documents Required';
      default:
        return 'Processing';
    }
  };

  // Get priority display text
  const getPriorityDisplay = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Low';
      default:
        return 'Normal';
    }
  };

  const getStatusColor = (status: string) => {
    const displayStatus = getDisplayStatus(status);
    switch (displayStatus) {
      case 'Approved': 
        return 'bg-success text-success-foreground';
      case 'Processing': 
        return 'bg-warning text-warning-foreground';
      case 'Under Review': 
        return 'bg-accent text-accent-foreground';
      case 'Documents Required': 
        return 'bg-destructive text-destructive-foreground';
      case 'Rejected': 
        return 'bg-muted text-muted-foreground';
      default: 
        return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (priority: string) => {
    switch (priority) {
      case 'high': 
        return 'text-destructive';
      case 'normal': 
        return 'text-warning';
      case 'low': 
        return 'text-muted-foreground';
      default: 
        return 'text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (paid: boolean) => {
    return paid ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground';
  };

  const getPaymentStatusText = (paid: boolean) => {
    return paid ? 'Paid' : 'Pending';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate processing days
  const getProcessingDays = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredApplications = applications.filter(app => {
    const displayStatus = getDisplayStatus(app.applicationStatus);
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      app.client.name.toLowerCase().includes(searchLower) ||
      app._id.toLowerCase().includes(searchLower) ||
      app.visaType.toLowerCase().includes(searchLower) ||
      app.processedBy.name.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === 'all' || 
      displayStatus.toLowerCase().replace(' ', '-') === statusFilter;
    
    const matchesType = typeFilter === 'all' || 
      app.visaType.toLowerCase().includes(typeFilter);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Statistics calculations
  const totalApplications = applications.length;
  const processingApplications = applications.filter(app => 
    app.applicationStatus === 'processing' || app.applicationStatus === 'submitted'
  ).length;
  const approvedApplications = applications.filter(app => 
    app.applicationStatus === 'approved'
  ).length;
  const actionRequiredApplications = applications.filter(app => 
    app.applicationStatus === 'documents-required'
  ).length;
  const rejectedApplications = applications.filter(app => 
    app.applicationStatus === 'rejected'
  ).length;

  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading applications...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-destructive">Error: {error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
          <p className="text-muted-foreground">Monitor and manage all visa applications across the system</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by client name, application ID, or visa type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="documents-required">Documents Required</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by visa type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tourist">Tourist Visa</SelectItem>
              <SelectItem value="business">Business Visa</SelectItem>
              <SelectItem value="transit">Transit Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Action</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Application List */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No applications found matching your criteria.
                </div>
              ) : (
                filteredApplications.map((application) => {
                  const displayStatus = getDisplayStatus(application.applicationStatus);
                  const processingDays = getProcessingDays(application.createdAt);
                  const priorityDisplay = getPriorityDisplay(application.processingPriority);
                  
                  return (
                    <div key={application._id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">APP-{application._id.slice(-6).toUpperCase()}</h3>
                              <Badge className={getStatusColor(application.applicationStatus)}>
                                {displayStatus}
                              </Badge>
                              <span className={`text-xs font-medium ${getUrgencyColor(application.processingPriority)}`}>
                                {priorityDisplay} Priority
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <User className="mr-1 h-3 w-3" />
                                Client: {application.client.name}
                              </div>
                              <div>Type: {application.visaType}</div>
                              <div>Assigned to: {application.processedBy.name}</div>
                              <div>Processing Days: {processingDays}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm font-medium">{formatDate(application.createdAt)}</div>
                            <div className="text-xs text-muted-foreground">Submit Date</div>
                          </div>
                          <div className="text-center">
                            <Badge className={getPaymentStatusColor(application.invoice.paid)}>
                              {getPaymentStatusText(application.invoice.paid)}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {application.visaType === 'Tourist Visa' ? 'AED 350' : 
                               application.visaType === 'Business Visa' ? 'AED 650' : 
                               application.visaType === 'Transit Visa' ? 'AED 150' : 'AED 500'}
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Application
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Change Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Documents available indicator */}
                      {application.documents && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span>Documents uploaded: </span>
                            {application.documents.idCard && <Badge variant="outline" className="text-xs">ID Card</Badge>}
                            {application.documents.passport && <Badge variant="outline" className="text-xs">Passport</Badge>}
                            {application.documents.photo && <Badge variant="outline" className="text-xs">Photo</Badge>}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminApplications;