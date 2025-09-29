import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  FileText,
  Eye,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EmployeeClients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const myClients = [
    {
      id: 'CL001',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+91 98765 43210',
      nationality: 'Indian',
      passportNumber: 'A1234567',
      type: 'Qualified',
      status: 'Active',
      applications: 3,
      lastContact: '2024-01-16',
      registrationDate: '2023-11-15',
      nextAction: 'Document Review'
    },
    {
      id: 'CL007',
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+971 50 555 4444',
      nationality: 'Pakistani',
      passportNumber: 'P7890123',
      type: 'Qualified',
      status: 'Active',
      applications: 2,
      lastContact: '2024-01-15',
      registrationDate: '2024-01-08',
      nextAction: 'Payment Follow-up'
    },
    {
      id: 'CL012',
      name: 'Raj Patel',
      email: 'raj.patel@email.com',
      phone: '+91 99887 76655',
      nationality: 'Indian',
      passportNumber: 'I5555666',
      type: 'Unqualified',
      status: 'Pending',
      applications: 1,
      lastContact: '2024-01-14',
      registrationDate: '2024-01-12',
      nextAction: 'Initial Consultation'
    },
    {
      id: 'CL018',
      name: 'Sarah Thompson',
      email: 'sarah.thompson@email.com',
      phone: '+44 77 8899 0011',
      nationality: 'British',
      passportNumber: 'B9988776',
      type: 'Qualified',
      status: 'Active',
      applications: 4,
      lastContact: '2024-01-13',
      registrationDate: '2023-09-20',
      nextAction: 'Visa Renewal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Qualified': return 'bg-accent text-accent-foreground';
      case 'Unqualified': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredClients = myClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Clients</h1>
            <p className="text-muted-foreground">Manage your assigned clients and their applications</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Register New Client
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients by name, email, or nationality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myClients.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myClients.filter(c => c.status === 'Active').length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified Clients</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myClients.filter(c => c.type === 'Qualified').length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myClients.reduce((sum, client) => sum + client.applications, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{client.name}</h3>
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Badge className={getTypeColor(client.type)}>
                            {client.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {client.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {client.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {client.nationality}
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-1 h-3 w-3" />
                            Passport: {client.passportNumber}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Last Contact: {client.lastContact} • Next Action: {client.nextAction}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{client.applications}</div>
                        <div className="text-xs text-muted-foreground">Applications</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Applications
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              New Application
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                <span>Register New Client</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span>Bulk Update Status</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageCircle className="h-6 w-6 mb-2" />
                <span>Send Bulk Message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeClients;