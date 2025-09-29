import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Award,
  Save,
  Edit,
  FileText,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EmployeeProfile = () => {
  const employeeData = {
    id: 'EMP001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@dubai.gov',
    phone: '+971 50 123 4567',
    department: 'Visa Processing',
    role: 'Senior Officer',
    status: 'Active',
    joinDate: '2022-03-15',
    address: 'Dubai, United Arab Emirates',
    emergencyContact: '+971 55 987 6543',
    skills: ['Document Verification', 'Customer Service', 'Arabic Language', 'Compliance Review'],
    certifications: ['Dubai Visa Processing Certificate', 'Customer Service Excellence', 'Data Protection Training']
  };

  const performanceStats = [
    { title: 'Applications Processed', value: '312', icon: FileText, color: 'text-accent' },
    { title: 'Clients Assigned', value: '47', icon: Users, color: 'text-primary' },
    { title: 'Avg Processing Time', value: '2.8 days', icon: Clock, color: 'text-success' },
    { title: 'Customer Rating', value: '4.9/5', icon: Award, color: 'text-warning' }
  ];

  const recentActivity = [
    { date: '2024-01-16', action: 'Approved tourist visa for Ahmed Hassan', type: 'approval' },
    { date: '2024-01-16', action: 'Requested additional documents from Maria Garcia', type: 'request' },
    { date: '2024-01-15', action: 'Completed document review for John Smith', type: 'review' },
    { date: '2024-01-15', action: 'Updated application status for Emma Wilson', type: 'update' },
    { date: '2024-01-14', action: 'Registered new client Raj Patel', type: 'registration' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval': return <Shield className="h-4 w-4 text-success" />;
      case 'request': return <Mail className="h-4 w-4 text-warning" />;
      case 'review': return <FileText className="h-4 w-4 text-accent" />;
      case 'update': return <Edit className="h-4 w-4 text-primary" />;
      case 'registration': return <Users className="h-4 w-4 text-success" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and view performance metrics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={employeeData.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input id="employeeId" value={employeeData.id} readOnly />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={employeeData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={employeeData.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={employeeData.department} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={employeeData.role} readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={employeeData.address} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" value={employeeData.emergencyContact} />
                </div>

                <Button className="bg-gradient-primary">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Skills & Certifications */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Skills & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {employeeData.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Certifications</Label>
                  <div className="space-y-2 mt-2">
                    {employeeData.certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary & Stats */}
          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {employeeData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle>{employeeData.name}</CardTitle>
                <div className="flex justify-center space-x-2 mt-2">
                  <Badge className="bg-success text-success-foreground">
                    {employeeData.status}
                  </Badge>
                  <Badge variant="outline">
                    {employeeData.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Joined {employeeData.joinDate}
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {employeeData.department}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceStats.map((stat) => (
                  <div key={stat.title} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-sm font-medium">{stat.title}</span>
                    </div>
                    <span className="text-sm font-bold">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
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

export default EmployeeProfile;