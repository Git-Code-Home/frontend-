import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Eye, Calendar, User, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusCheck = () => {
  const [trackingId, setTrackingId] = useState('');
  const [applicationData, setApplicationData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockApplication = {
    id: 'VA-DXB-2024-001234',
    clientName: 'Ahmed Hassan',
    visaType: 'Tourist Visa',
    status: 'Approved',
    submitDate: '2024-01-10',
    issueDate: '2024-01-15',
    expiryDate: '2024-07-15',
    validityDays: 181,
    paymentStatus: 'Paid',
    paymentAmount: 'AED 350'
  };

  const handleSearch = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (trackingId.toLowerCase().includes('va')) {
        setApplicationData(mockApplication);
      } else {
        setApplicationData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Processing': return 'bg-warning text-warning-foreground';
      case 'Rejected': return 'bg-destructive text-destructive-foreground';
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
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Check Application Status</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Track your visa application progress using your unique tracking ID
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Eye className="mr-2 h-5 w-5" />
                Track Your Application
              </CardTitle>
              <CardDescription>
                Enter your tracking ID or secure link to view application status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  id="trackingId"
                  placeholder="VA-DXB-2024-001234"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleSearch} 
                className="w-full bg-gradient-primary" 
                disabled={loading || !trackingId}
              >
                {loading ? (
                  'Searching...'
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check Status
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Demo ID: VA-DXB-2024-001234
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Details */}
        {applicationData && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Status Overview */}
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Application Status</CardTitle>
                  <Badge className={getStatusColor(applicationData.status)}>
                    {applicationData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{applicationData.clientName}</div>
                    <div className="text-sm text-muted-foreground">Applicant</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{applicationData.visaType}</div>
                    <div className="text-sm text-muted-foreground">Visa Type</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{applicationData.submitDate}</div>
                    <div className="text-sm text-muted-foreground">Submitted</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-success mb-1">
                      {calculateDaysRemaining(applicationData.expiryDate)}
                    </div>
                    <div className="text-sm text-muted-foreground">Days Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visa Details */}
            {applicationData.status === 'Approved' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-elegant border-0">
                  <CardHeader>
                    <CardTitle className="text-success">Visa Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Issue Date:</span>
                      <span>{applicationData.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Expiry Date:</span>
                      <span>{applicationData.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Validity Period:</span>
                      <span>{applicationData.validityDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusColor(applicationData.status)}>
                        {applicationData.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant border-0">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Status:</span>
                      <Badge className="bg-success text-success-foreground">
                        {applicationData.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Amount:</span>
                      <span className="font-bold">{applicationData.paymentAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Date:</span>
                      <span>{applicationData.issueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Important Notice */}
            <Card className="shadow-elegant border-0 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Important Information</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a read-only status page. For any changes or updates to your application, 
                    please contact your designated visa officer or visit the client portal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {applicationData === null && trackingId && !loading && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elegant border-0">
              <CardContent className="text-center py-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Application Found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find an application with the provided tracking ID. 
                  Please check your ID and try again.
                </p>
                <Button variant="outline" onClick={() => setTrackingId('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCheck;