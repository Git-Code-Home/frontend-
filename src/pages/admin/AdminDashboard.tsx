import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Clients', value: '1,247', icon: Users, change: '+12%', color: 'text-accent' },
    { title: 'Active Applications', value: '89', icon: FileText, change: '+5%', color: 'text-primary' },
    { title: 'Expiring Visas', value: '23', icon: Clock, change: '+2%', color: 'text-warning' },
    { title: 'Revenue (AED)', value: '485,320', icon: DollarSign, change: '+18%', color: 'text-success' },
  ];

  const applicationStats = [
    { status: 'Processing', count: 45, color: 'bg-warning', icon: Clock },
    { status: 'Approved', count: 312, color: 'bg-success', icon: CheckCircle },
    { status: 'Rejected', count: 18, color: 'bg-destructive', icon: XCircle },
    { status: 'Expired', count: 67, color: 'bg-muted', icon: AlertTriangle },
  ];

  const recentApplications = [
    { id: 'VA001', client: 'Ahmed Hassan', type: 'Tourist Visa', status: 'Processing', date: '2024-01-15' },
    { id: 'VA002', client: 'Sarah Johnson', type: 'Business Visa', status: 'Approved', date: '2024-01-14' },
    { id: 'VA003', client: 'Mohammad Ali', type: 'Transit Visa', status: 'Processing', date: '2024-01-14' },
    { id: 'VA004', client: 'Emma Wilson', type: 'Tourist Visa', status: 'Approved', date: '2024-01-13' },
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor system performance and key metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Status */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationStats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="text-sm font-medium">{stat.status}</span>
                  </div>
                  <span className="text-sm font-bold">{stat.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Approval Rate</span>
                <span className="text-sm font-bold text-success">94.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Processing Time</span>
                <span className="text-sm font-bold">3.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="text-sm font-bold text-success">4.8/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Employees</span>
                <span className="text-sm font-bold">12</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Add New Employee</div>
                <div className="text-sm text-muted-foreground">Create employee account</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Monthly analytics report</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Review Expiring Visas</div>
                <div className="text-sm text-muted-foreground">Check renewal alerts</div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">{app.client}</div>
                      <div className="text-sm text-muted-foreground">{app.id} • {app.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      app.status === 'Approved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{app.date}</span>
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

export default AdminDashboard;