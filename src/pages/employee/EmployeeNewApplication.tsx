import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Upload, 
  User, 
  Plane,
  CreditCard,
  Save,
  Send,
  ArrowRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EmployeeNewApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [applicationData, setApplicationData] = useState({
    // Client Information
    clientType: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    
    // Application Details
    visaType: '',
    purpose: '',
    duration: '',
    urgency: 'normal',
    
    // Personal Information
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    dateOfBirth: '',
    
    // Travel Information
    travelDate: '',
    returnDate: '',
    accommodation: '',
    
    // Additional Information
    previousVisa: '',
    criminalRecord: '',
    medicalConditions: '',
    additionalNotes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Visa application has been created successfully. Application ID: VA-2024-001.",
      });
      setLoading(false);
      // Reset form or redirect
    }, 2000);
  };

  const steps = [
    { id: 1, title: 'Client Info', icon: User },
    { id: 2, title: 'Application', icon: FileText },
    { id: 3, title: 'Personal', icon: User },
    { id: 4, title: 'Travel', icon: Plane },
    { id: 5, title: 'Review', icon: Send }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Client Information</h3>
            
            <div className="space-y-2">
              <Label>Client Type</Label>
              <Select value={applicationData.clientType} onValueChange={(value) => handleInputChange('clientType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="existing">Existing Client</SelectItem>
                  <SelectItem value="new-qualified">New Qualified Client</SelectItem>
                  <SelectItem value="new-unqualified">New Unqualified Client</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name</Label>
                <Input
                  id="clientName"
                  placeholder="Ahmed Hassan"
                  value={applicationData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email Address</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="ahmed@example.com"
                  value={applicationData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                placeholder="+971 50 123 4567"
                value={applicationData.clientPhone}
                onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Visa Type</Label>
                <Select value={applicationData.visaType} onValueChange={(value) => handleInputChange('visaType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourist">Tourist Visa</SelectItem>
                    <SelectItem value="business">Business Visa</SelectItem>
                    <SelectItem value="transit">Transit Visa</SelectItem>
                    <SelectItem value="family">Family Visa</SelectItem>
                    <SelectItem value="work">Work Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select value={applicationData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                    <SelectItem value="multiple">Multiple Entry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of the visit..."
                value={applicationData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Processing Priority</Label>
              <Select value={applicationData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (5-7 days)</SelectItem>
                  <SelectItem value="urgent">Urgent (2-3 days)</SelectItem>
                  <SelectItem value="express">Express (24 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nationality</Label>
                <Select value={applicationData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="pakistani">Pakistani</SelectItem>
                    <SelectItem value="british">British</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="canadian">Canadian</SelectItem>
                    <SelectItem value="australian">Australian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={applicationData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input
                  id="passportNumber"
                  placeholder="A1234567"
                  value={applicationData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Passport Expiry</Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={applicationData.passportExpiry}
                  onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Previous UAE Visa</Label>
              <Select value={applicationData.previousVisa} onValueChange={(value) => handleInputChange('previousVisa', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Do you have a previous UAE visa?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="expired">Yes, but expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Travel Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelDate">Intended Travel Date</Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={applicationData.travelDate}
                  onChange={(e) => handleInputChange('travelDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Expected Return Date</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={applicationData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodation">Accommodation Details</Label>
              <Textarea
                id="accommodation"
                placeholder="Hotel name, address, or host information..."
                value={applicationData.accommodation}
                onChange={(e) => handleInputChange('accommodation', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information or special requirements..."
                value={applicationData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Application</h3>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {applicationData.clientName}</div>
                  <div><strong>Email:</strong> {applicationData.clientEmail}</div>
                  <div><strong>Phone:</strong> {applicationData.clientPhone}</div>
                  <div><strong>Type:</strong> {applicationData.clientType}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Visa Type:</strong> {applicationData.visaType}</div>
                  <div><strong>Duration:</strong> {applicationData.duration} days</div>
                  <div><strong>Priority:</strong> {applicationData.urgency}</div>
                  <div><strong>Purpose:</strong> {applicationData.purpose}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Nationality:</strong> {applicationData.nationality}</div>
                  <div><strong>Passport:</strong> {applicationData.passportNumber}</div>
                  <div><strong>Date of Birth:</strong> {applicationData.dateOfBirth}</div>
                  <div><strong>Previous Visa:</strong> {applicationData.previousVisa}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Travel Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Travel Date:</strong> {applicationData.travelDate}</div>
                  <div><strong>Return Date:</strong> {applicationData.returnDate}</div>
                  <div><strong>Accommodation:</strong> {applicationData.accommodation}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Visa Application</h1>
          <p className="text-muted-foreground">Create a new visa application for your client</p>
        </div>

        {/* Progress Steps */}
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                    ${currentStep === step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : currentStep > step.id 
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-success' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            
            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="bg-gradient-primary"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-primary"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeNewApplication;