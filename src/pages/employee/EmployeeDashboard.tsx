import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';

const EmployeeDashboard = () => {
  const myStats = [
    { title: 'My Clients', value: '47', icon: Users, color: 'text-accent' },
    { title: 'Applications Today', value: '8', icon: FileText, color: 'text-primary' },
    { title: 'Pending Review', value: '12', icon: Clock, color: 'text-warning' },
    { title: 'Completed Today', value: '5', icon: CheckCircle, color: 'text-success' },
  ];

  const myApplications = [
    { id: 'VA015', client: 'Ahmed Hassan', type: 'Tourist Visa', status: 'Pending Documents', urgent: true },
    { id: 'VA016', client: 'Maria Garcia', type: 'Business Visa', status: 'Under Review', urgent: false },
    { id: 'VA017', client: 'John Smith', type: 'Transit Visa', status: 'Ready for Approval', urgent: false },
    { id: 'VA018', client: 'Fatima Al-Zahra', type: 'Family Visa', status: 'Processing', urgent: true },
  ];

  const todayTasks = [
    { task: 'Review Ahmed Hassan\'s documents', priority: 'High', time: '10:00 AM' },
    { task: 'Update Maria Garcia application status', priority: 'Medium', time: '11:30 AM' },
    { task: 'Send reminder to John Smith', priority: 'Low', time: '2:00 PM' },
    { task: 'Process payment confirmation', priority: 'High', time: '4:00 PM' },
  ];

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your assigned clients and applications</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Applications */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>My Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      {app.urgent && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                      <div>
                        <div className="font-medium">{app.client}</div>
                        <div className="text-sm text-muted-foreground">{app.id} • {app.type}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      app.status === 'Ready for Approval' ? 'bg-success/10 text-success' : 
                      app.status === 'Pending Documents' ? 'bg-warning/10 text-warning' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{task.task}</div>
                      <div className="text-xs text-muted-foreground">{task.time}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                      task.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Register Client
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                New Application
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Clock className="h-6 w-6 mb-2" />
                Update Status
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <CheckCircle className="h-6 w-6 mb-2" />
                Generate Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;