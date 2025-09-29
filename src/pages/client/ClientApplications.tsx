import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const ClientApplications = () => {
  const applications = [
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
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Under Review': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Track all your visa applications</p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="shadow-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">{app.type}</h3>
                      <p className="text-sm text-muted-foreground">Application {app.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Submit Date</p>
                    <p className="font-medium">{app.submitDate}</p>
                  </div>
                  {app.issueDate && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Issue Date</p>
                        <p className="font-medium">{app.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p className="font-medium">{app.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Validity</p>
                        <p className="font-medium">{app.validityDays} days</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  {app.status === 'Approved' && (
                    <Button size="sm">
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientApplications;