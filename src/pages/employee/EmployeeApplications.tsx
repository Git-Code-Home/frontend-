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
  AlertTriangle,
  Eye,
  Edit,
  Send,
  MoreHorizontal,
  Upload
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

const EmployeeApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const myApplications = [
    {
      id: 'VA015',
      clientName: 'Ahmed Hassan',
      clientId: 'CL001',
      visaType: 'Tourist Visa',
      status: 'Documents Required',
      priority: 'High',
      submitDate: '2024-01-15',
      processingDays: 3,
      nextAction: 'Document Review',
      paymentStatus: 'Paid',
      documents: ['Passport Copy', 'Photo'],
      missingDocs: ['Bank Statement', 'Hotel Booking']
    },
    {
      id: 'VA016',
      clientName: 'Fatima Al-Zahra',
      clientId: 'CL007',
      visaType: 'Family Visa',
      status: 'Under Review',
      priority: 'Normal',
      submitDate: '2024-01-12',
      processingDays: 6,
      nextAction: 'Background Verification',
      paymentStatus: 'Paid',
      documents: ['Passport Copy', 'Photo', 'Marriage Certificate', 'Sponsor Documents'],
      missingDocs: []
    },
    {
      id: 'VA017',
      clientName: 'Raj Patel',
      clientId: 'CL012',
      visaType: 'Business Visa',
      status: 'Processing',
      priority: 'High',
      submitDate: '2024-01-14',
      processingDays: 4,
      nextAction: 'Final Approval',
      paymentStatus: 'Paid',
      documents: ['Passport Copy', 'Photo', 'Business License', 'Company Letter'],
      missingDocs: []
    },
    {
      id: 'VA018',
      clientName: 'Sarah Thompson',
      clientId: 'CL018',
      visaType: 'Tourist Visa',
      status: 'Ready for Approval',
      priority: 'Normal',
      submitDate: '2024-01-10',
      processingDays: 8,
      nextAction: 'Issue Visa',
      paymentStatus: 'Paid',
      documents: ['Passport Copy', 'Photo', 'Bank Statement', 'Travel Itinerary'],
      missingDocs: []
    },
    {
      id: 'VA019',
      clientName: 'Mohammed Ali',
      clientId: 'CL025',
      visaType: 'Transit Visa',
      status: 'Pending Documents',
      priority: 'Low',
      submitDate: '2024-01-16',
      processingDays: 2,
      nextAction: 'Document Upload',
      paymentStatus: 'Pending',
      documents: ['Passport Copy'],
      missingDocs: ['Photo', 'Flight Tickets']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Approval': return 'bg-success text-success-foreground';
      case 'Processing': return 'bg-warning text-warning-foreground';
      case 'Under Review': return 'bg-accent text-accent-foreground';
      case 'Documents Required': return 'bg-destructive text-destructive-foreground';
      case 'Pending Documents': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Normal': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const filteredApplications = myApplications.filter(app => {
    const matchesSearch = app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '-') === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Manage and track all applications assigned to you</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <SelectItem value="ready-for-approval">Ready for Approval</SelectItem>
              <SelectItem value="documents-required">Documents Required</SelectItem>
              <SelectItem value="pending-documents">Pending Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myApplications.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myApplications.filter(a => a.status === 'Processing' || a.status === 'Under Review').length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready to Approve</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myApplications.filter(a => a.status === 'Ready for Approval').length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myApplications.filter(a => a.status.includes('Documents')).length}
              </div>
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
                  <div className="flex items-start justify-between mb-4">
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
                          <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
                            {application.priority} Priority
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>Client: {application.clientName}</div>
                          <div>Type: {application.visaType}</div>
                          <div>Submit Date: {application.submitDate}</div>
                          <div>Processing Days: {application.processingDays}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      
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
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Contact Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="mr-2 h-4 w-4" />
                            Request Documents
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Documents Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-success mb-2">Submitted Documents</h4>
                      <div className="flex flex-wrap gap-1">
                        {application.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {application.missingDocs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-destructive mb-2">Missing Documents</h4>
                        <div className="flex flex-wrap gap-1">
                          {application.missingDocs.map((doc, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Action */}
                  <div className="mt-3 p-3 bg-accent/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-accent">Next Action: </span>
                        <span className="text-sm">{application.nextAction}</span>
                      </div>
                      <div className="flex space-x-2">
                        {application.status === 'Documents Required' && (
                          <Button size="sm" variant="outline">
                            <Send className="mr-1 h-3 w-3" />
                            Request Docs
                          </Button>
                        )}
                        {application.status === 'Ready for Approval' && (
                          <Button size="sm" className="bg-success text-success-foreground">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                        )}
                        {application.status === 'Under Review' && (
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Update Status
                          </Button>
                        )}
                      </div>
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

export default EmployeeApplications;