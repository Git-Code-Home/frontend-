import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  FileText,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminReports = () => {
  const reportMetrics = [
    { title: 'Total Applications', value: '1,247', change: '+12%', trend: 'up', color: 'text-accent' },
    { title: 'Approval Rate', value: '94.5%', change: '+2.1%', trend: 'up', color: 'text-success' },
    { title: 'Avg Processing Time', value: '3.2 days', change: '-0.8 days', trend: 'down', color: 'text-primary' },
    { title: 'Revenue (AED)', value: '485,320', change: '+18%', trend: 'up', color: 'text-warning' }
  ];

  const monthlyData = [
    { month: 'Jan', applications: 89, approved: 84, rejected: 5, revenue: 38450 },
    { month: 'Feb', applications: 127, approved: 119, rejected: 8, revenue: 52340 },
    { month: 'Mar', applications: 156, approved: 148, rejected: 8, revenue: 67890 },
    { month: 'Apr', applications: 203, approved: 192, rejected: 11, revenue: 89120 },
    { month: 'May', applications: 178, approved: 169, rejected: 9, revenue: 76540 },
    { month: 'Jun', applications: 234, approved: 221, rejected: 13, revenue: 98760 }
  ];

  const employeePerformance = [
    { name: 'Sarah Johnson', applications: 312, approved: 298, avgTime: '2.8 days', satisfaction: '4.9/5' },
    { name: 'Ahmed Al-Rashid', applications: 189, approved: 178, avgTime: '3.1 days', satisfaction: '4.7/5' },
    { name: 'Maria Garcia', applications: 156, approved: 149, avgTime: '3.5 days', satisfaction: '4.8/5' },
    { name: 'James Wilson', applications: 89, approved: 86, avgTime: '2.9 days', satisfaction: '4.6/5' }
  ];

  const visaTypeBreakdown = [
    { type: 'Tourist Visa', count: 456, percentage: 36.6, revenue: 159600 },
    { type: 'Business Visa', count: 298, percentage: 23.9, revenue: 193700 },
    { type: 'Transit Visa', count: 234, percentage: 18.8, revenue: 35100 },
    { type: 'Family Visa', count: 178, percentage: 14.3, revenue: 151300 },
    { type: 'Work Visa', count: 81, percentage: 6.5, revenue: 97200 }
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive system performance and business insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="last-6-months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-primary">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reportMetrics.map((metric) => (
            <Card key={metric.title} className="shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <TrendingUp className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.trend === 'up' ? 'text-success' : 'text-primary'}>
                    {metric.change}
                  </span> from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance Chart */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Monthly Application Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium w-8">{data.month}</span>
                      <div className="text-sm text-muted-foreground">
                        {data.applications} total • {data.approved} approved • {data.rejected} rejected
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      AED {data.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visa Type Breakdown */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Visa Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visaTypeBreakdown.map((visa) => (
                  <div key={visa.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{visa.type}</span>
                      <span className="text-sm text-muted-foreground">{visa.count} ({visa.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${visa.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Revenue: AED {visa.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Performance */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Employee Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformance.map((employee) => (
                <div key={employee.name} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {employee.applications} applications processed
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <div className="text-lg font-bold text-success">{employee.approved}</div>
                        <div className="text-xs text-muted-foreground">Approved</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">{employee.avgTime}</div>
                        <div className="text-xs text-muted-foreground">Avg Time</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-warning">{employee.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Report Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-semibold">Application Report</h3>
                  <p className="text-sm text-muted-foreground">Detailed application analytics</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-semibold">Revenue Report</h3>
                  <p className="text-sm text-muted-foreground">Financial performance summary</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <h3 className="font-semibold">Efficiency Report</h3>
                  <p className="text-sm text-muted-foreground">Processing time analysis</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;