import { useState } from 'react';
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
  MoreHorizontal
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

const AdminApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const applications = [
    {
      id: 'VA001',
      clientName: 'Ahmed Hassan',
      clientEmail: 'ahmed.hassan@email.com',
      visaType: 'Tourist Visa',
      status: 'Processing',
      assignedTo: 'Sarah Johnson',
      submitDate: '2024-01-15',
      processingDays: 3,
      expiryDate: null,
      paymentStatus: 'Paid',
      paymentAmount: 'AED 350',
      urgency: 'Normal'
    },
    {
      id: 'VA002',
      clientName: 'Maria Garcia',
      clientEmail: 'maria.garcia@email.com',
      visaType: 'Business Visa',
      status: 'Approved',
      assignedTo: 'Ahmed Al-Rashid',
      submitDate: '2024-01-12',
      processingDays: 6,
      expiryDate: '2024-07-12',
      paymentStatus: 'Paid',
      paymentAmount: 'AED 650',
      urgency: 'High'
    },
    {
      id: 'VA003',
      clientName: 'John Smith',
      clientEmail: 'john.smith@email.com',
      visaType: 'Transit Visa',
      status: 'Documents Required',
      assignedTo: 'Maria Garcia',
      submitDate: '2024-01-14',
      processingDays: 4,
      expiryDate: null,
      paymentStatus: 'Pending',
      paymentAmount: 'AED 150',
      urgency: 'Normal'
    },
    {
      id: 'VA004',
      clientName: 'Emma Wilson',
      clientEmail: 'emma.wilson@email.com',
      visaType: 'Family Visa',
      status: 'Rejected',
      assignedTo: 'James Wilson',
      submitDate: '2024-01-10',
      processingDays: 8,
      expiryDate: null,
      paymentStatus: 'Refunded',
      paymentAmount: 'AED 850',
      urgency: 'Low'
    },
    {
      id: 'VA005',
      clientName: 'David Brown',
      clientEmail: 'david.brown@email.com',
      visaType: 'Work Visa',
      status: 'Under Review',
      assignedTo: 'Sarah Johnson',
      submitDate: '2024-01-16',
      processingDays: 2,
      expiryDate: null,
      paymentStatus: 'Paid',
      paymentAmount: 'AED 1200',
      urgency: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Processing': return 'bg-warning text-warning-foreground';
      case 'Under Review': return 'bg-accent text-accent-foreground';
      case 'Documents Required': return 'bg-destructive text-destructive-foreground';
      case 'Rejected': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-destructive';
      case 'Normal': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-success text-success-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      case 'Refunded': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesType = typeFilter === 'all' || app.visaType.toLowerCase().includes(typeFilter);
    
    return matchesSearch && matchesStatus && matchesType;
  });

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
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
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
              <SelectItem value="family">Family Visa</SelectItem>
              <SelectItem value="work">Work Visa</SelectItem>
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
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Processing' || a.status === 'Under Review').length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Approved').length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Action</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Documents Required').length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Rejected').length}</div>
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
              {filteredApplications.map((application) => (
                <div key={application.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{application.id}</h3>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                          <span className={`text-xs font-medium ${getUrgencyColor(application.urgency)}`}>
                            {application.urgency} Priority
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>Client: {application.clientName}</div>
                          <div>Type: {application.visaType}</div>
                          <div>Assigned to: {application.assignedTo}</div>
                          <div>Processing Days: {application.processingDays}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{application.submitDate}</div>
                        <div className="text-xs text-muted-foreground">Submit Date</div>
                      </div>
                      <div className="text-center">
                        <Badge className={getPaymentStatusColor(application.paymentStatus)}>
                          {application.paymentStatus}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">{application.paymentAmount}</div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminApplications;