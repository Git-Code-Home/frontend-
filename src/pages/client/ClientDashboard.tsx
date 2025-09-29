import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle,
  Calendar,
  Plus,
  Download,
  AlertTriangle
} from 'lucide-react';

const ClientDashboard = () => {
  const myStats = [
    { title: 'Total Applications', value: '3', icon: FileText, color: 'text-accent' },
    { title: 'Active Visas', value: '1', icon: CheckCircle, color: 'text-success' },
    { title: 'Pending', value: '1', icon: Clock, color: 'text-warning' },
    { title: 'Expiring Soon', value: '0', icon: AlertTriangle, color: 'text-destructive' },
  ];

  const myApplications = [
    { 
      id: 'VA025', 
      type: 'Tourist Visa', 
      status: 'Approved', 
      submitDate: '2024-01-10',
      issueDate: '2024-01-15',
      expiryDate: '2024-07-15',
      validityDays: 181
    },
    { 
      id: 'VA026', 
      type: 'Business Visa', 
      status: 'Under Review', 
      submitDate: '2024-01-14',
      issueDate: null,
      expiryDate: null,
      validityDays: null
    },
    { 
      id: 'VA027', 
      type: 'Transit Visa', 
      status: 'Documents Required', 
      submitDate: '2024-01-16',
      issueDate: null,
      expiryDate: null,
      validityDays: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Under Review': return 'bg-warning text-warning-foreground';
      case 'Documents Required': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const calculateDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground">Track your visa applications and manage your profile</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myStats.map((stat) => (
            <Card key={stat.title} className="shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Visa Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-success" />
                Active Visa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Visa Type</span>
                  <span className="text-sm">Tourist Visa</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Issue Date</span>
                  <span className="text-sm">15 Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Expiry Date</span>
                  <span className="text-sm">15 Jul 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Days Remaining</span>
                  <span className="text-sm font-bold text-success">
                    {calculateDaysRemaining('2024-07-15')} days
                  </span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Visa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Apply for New Visa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application History */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.map((app) => (
                <div key={app.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium">{app.type}</div>
                        <div className="text-sm text-muted-foreground">
                          Application {app.id} • Submitted {app.submitDate}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>

                  {app.status === 'Approved' && (
                    <div className="grid grid-cols-3 gap-4 mt-3 p-3 bg-success/5 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Issue Date</div>
                        <div className="font-medium">{app.issueDate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Expiry Date</div>
                        <div className="font-medium">{app.expiryDate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Validity</div>
                        <div className="font-medium">{app.validityDays} days</div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-3 space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {app.status === 'Approved' && (
                      <Button size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    )}
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

export default ClientDashboard;