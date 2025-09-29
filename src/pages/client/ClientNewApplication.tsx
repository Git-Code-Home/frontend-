import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Send } from 'lucide-react';

const ClientNewApplication = () => {
  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Visa Application</h1>
          <p className="text-muted-foreground">Submit a new visa application</p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Visa Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourist">Tourist Visa</SelectItem>
                    <SelectItem value="business">Business Visa</SelectItem>
                    <SelectItem value="transit">Transit Visa</SelectItem>
                    <SelectItem value="family">Family Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelDate">Travel Date</Label>
                <Input id="travelDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date</Label>
                <Input id="returnDate" type="date" />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
              <Button className="bg-gradient-primary">
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientNewApplication;