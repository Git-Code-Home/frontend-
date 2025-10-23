// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { BarChart3, TrendingUp, Download, FileText, Users, DollarSign, Clock } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const AdminReports = () => {
//   const reportMetrics = [
//     { title: "Total Applications", value: "1,247", change: "+12%", trend: "up", color: "text-accent" },
//     { title: "Approval Rate", value: "94.5%", change: "+2.1%", trend: "up", color: "text-success" },
//     { title: "Avg Processing Time", value: "3.2 days", change: "-0.8 days", trend: "down", color: "text-primary" },
//     { title: "Revenue (AED)", value: "485,320", change: "+18%", trend: "up", color: "text-warning" },
//   ]

//   const monthlyData = [
//     { month: "Jan", applications: 89, approved: 84, rejected: 5, revenue: 38450 },
//     { month: "Feb", applications: 127, approved: 119, rejected: 8, revenue: 52340 },
//     { month: "Mar", applications: 156, approved: 148, rejected: 8, revenue: 67890 },
//     { month: "Apr", applications: 203, approved: 192, rejected: 11, revenue: 89120 },
//     { month: "May", applications: 178, approved: 169, rejected: 9, revenue: 76540 },
//     { month: "Jun", applications: 234, approved: 221, rejected: 13, revenue: 98760 },
//   ]

//   const employeePerformance = [
//     { name: "Sarah Johnson", applications: 312, approved: 298, avgTime: "2.8 days", satisfaction: "4.9/5" },
//     { name: "Ahmed Al-Rashid", applications: 189, approved: 178, avgTime: "3.1 days", satisfaction: "4.7/5" },
//     { name: "Maria Garcia", applications: 156, approved: 149, avgTime: "3.5 days", satisfaction: "4.8/5" },
//     { name: "James Wilson", applications: 89, approved: 86, avgTime: "2.9 days", satisfaction: "4.6/5" },
//   ]

//   const visaTypeBreakdown = [
//     { type: "Tourist Visa", count: 456, percentage: 36.6, revenue: 159600 },
//     { type: "Business Visa", count: 298, percentage: 23.9, revenue: 193700 },
//     { type: "Transit Visa", count: 234, percentage: 18.8, revenue: 35100 },
//     { type: "Family Visa", count: 178, percentage: 14.3, revenue: 151300 },
//     { type: "Work Visa", count: 81, percentage: 6.5, revenue: 97200 },
//   ]

//   return (
//     <DashboardLayout userRole="admin" userName="Admin User">
//       <div className="space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reports & Analytics</h1>
//             <p className="text-sm sm:text-base text-muted-foreground">
//               Comprehensive system performance and business insights
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
//             <Select defaultValue="last-6-months">
//               <SelectTrigger className="w-full sm:w-40 rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="last-30-days">Last 30 Days</SelectItem>
//                 <SelectItem value="last-3-months">Last 3 Months</SelectItem>
//                 <SelectItem value="last-6-months">Last 6 Months</SelectItem>
//                 <SelectItem value="last-year">Last Year</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button className="bg-gradient-primary">
//               <Download className="mr-2 h-4 w-4" />
//               Export Report
//             </Button>
//           </div>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {reportMetrics.map((metric) => (
//             <Card
//               key={metric.title}
//               className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]"
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
//                 <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 ${metric.color}`}>
//                   <TrendingUp className="h-4 w-4" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl sm:text-3xl font-bold mb-2">{metric.value}</div>
//                 <p className="text-xs text-muted-foreground">
//                   <span
//                     className={
//                       metric.trend === "up"
//                         ? "text-success bg-success/10 px-2 py-1 rounded-full"
//                         : "text-primary bg-primary/10 px-2 py-1 rounded-full"
//                     }
//                   >
//                     {metric.change}
//                   </span>{" "}
//                   from last period
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
//           {/* Monthly Performance Chart */}
//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
//                 <div className="p-2 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mr-3">
//                   <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
//                 </div>
//                 Monthly Application Trends
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {monthlyData.map((data) => (
//                   <div
//                     key={data.month}
//                     className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-md transition-all duration-200 space-y-2 sm:space-y-0"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <span className="font-medium w-8 text-lg">{data.month}</span>
//                       <div className="text-sm text-muted-foreground">
//                         {data.applications} total • {data.approved} approved • {data.rejected} rejected
//                       </div>
//                     </div>
//                     <div className="text-sm font-medium bg-success/10 text-success px-3 py-1 rounded-full w-fit">
//                       AED {data.revenue.toLocaleString()}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Visa Type Breakdown */}
//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
//                 <div className="p-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mr-3">
//                   <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
//                 </div>
//                 Visa Type Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {visaTypeBreakdown.map((visa) => (
//                   <div
//                     key={visa.type}
//                     className="space-y-2 p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-medium">{visa.type}</span>
//                       <span className="text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
//                         {visa.count} ({visa.percentage}%)
//                       </span>
//                     </div>
//                     <div className="w-full bg-muted/30 rounded-full h-3">
//                       <div
//                         className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300 shadow-sm"
//                         style={{ width: `${visa.percentage}%` }}
//                       />
//                     </div>
//                     <div className="text-xs text-muted-foreground">Revenue: AED {visa.revenue.toLocaleString()}</div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Employee Performance */}
//         <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 mr-3">
//                 <Users className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
//               </div>
//               Employee Performance Summary
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {employeePerformance.map((employee) => (
//                 <div
//                   key={employee.name}
//                   className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
//                     <div className="flex items-center space-x-3 sm:space-x-4">
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
//                         <span className="text-primary font-semibold text-sm">
//                           {employee.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </span>
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-base sm:text-lg">{employee.name}</h3>
//                         <p className="text-sm text-muted-foreground">{employee.applications} applications processed</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-3 gap-3 sm:gap-8 text-center">
//                       <div className="bg-success/5 px-3 sm:px-4 py-2 rounded-2xl">
//                         <div className="text-base sm:text-lg font-bold text-success">{employee.approved}</div>
//                         <div className="text-xs text-muted-foreground">Approved</div>
//                       </div>
//                       <div className="bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
//                         <div className="text-base sm:text-lg font-bold text-primary">{employee.avgTime}</div>
//                         <div className="text-xs text-muted-foreground">Avg Time</div>
//                       </div>
//                       <div className="bg-warning/5 px-3 sm:px-4 py-2 rounded-2xl">
//                         <div className="text-base sm:text-lg font-bold text-warning">{employee.satisfaction}</div>
//                         <div className="text-xs text-muted-foreground">Rating</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Report Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
//                   <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-base sm:text-lg">Application Report</h3>
//                   <p className="text-sm text-muted-foreground">Detailed application analytics</p>
//                 </div>
//               </div>
//               <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
//                 Generate Report
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-3 rounded-2xl bg-gradient-to-br from-success/20 to-success/10">
//                   <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-base sm:text-lg">Revenue Report</h3>
//                   <p className="text-sm text-muted-foreground">Financial performance summary</p>
//                 </div>
//               </div>
//               <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
//                 Generate Report
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-3 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10">
//                   <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-base sm:text-lg">Efficiency Report</h3>
//                   <p className="text-sm text-muted-foreground">Processing time analysis</p>
//                 </div>
//               </div>
//               <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
//                 Generate Report
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default AdminReports








import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Download, FileText, Users, DollarSign, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react";
import BASE_URL from "@/lib/BaseUrl";

const AdminReports = () => {
  const [duration, setDuration] = useState("last-6-months");
  const [summary, setSummary] = useState<{ totalApplications: number; approvalRate: number; avgProcessingDays: number; revenue: number } | null>(null);

  const metrics = summary ? [
    { title: "Total Applications", value: summary.totalApplications.toLocaleString(), change: "", trend: "up", color: "text-accent" },
    { title: "Approval Rate", value: `${summary.approvalRate}%`, change: "", trend: "up", color: "text-success" },
    { title: "Avg Processing Time", value: `${summary.avgProcessingDays} days`, change: "", trend: "down", color: "text-primary" },
    { title: "Revenue (AED)", value: summary.revenue.toLocaleString(), change: "", trend: "up", color: "text-warning" },
  ] : [
    { title: "Total Applications", value: "—", change: "", trend: "up", color: "text-accent" },
    { title: "Approval Rate", value: "—", change: "", trend: "up", color: "text-success" },
    { title: "Avg Processing Time", value: "—", change: "", trend: "down", color: "text-primary" },
    { title: "Revenue (AED)", value: "—", change: "", trend: "up", color: "text-warning" },
  ];

  const monthlyData = [
    { month: "Jan", applications: 89, approved: 84, rejected: 5, revenue: 38450 },
    { month: "Feb", applications: 127, approved: 119, rejected: 8, revenue: 52340 },
    { month: "Mar", applications: 156, approved: 148, rejected: 8, revenue: 67890 },
    { month: "Apr", applications: 203, approved: 192, rejected: 11, revenue: 89120 },
    { month: "May", applications: 178, approved: 169, rejected: 9, revenue: 76540 },
    { month: "Jun", applications: 234, approved: 221, rejected: 13, revenue: 98760 },
  ]

  const employeePerformance = [
    { name: "Sarah Johnson", applications: 312, approved: 298, avgTime: "2.8 days", satisfaction: "4.9/5" },
    { name: "Ahmed Al-Rashid", applications: 189, approved: 178, avgTime: "3.1 days", satisfaction: "4.7/5" },
    { name: "Maria Garcia", applications: 156, approved: 149, avgTime: "3.5 days", satisfaction: "4.8/5" },
    { name: "James Wilson", applications: 89, approved: 86, avgTime: "2.9 days", satisfaction: "4.6/5" },
  ]

  const visaTypeBreakdown = [
    { type: "Tourist Visa", count: 456, percentage: 36.6, revenue: 159600 },
    { type: "Business Visa", count: 298, percentage: 23.9, revenue: 193700 },
    { type: "Transit Visa", count: 234, percentage: 18.8, revenue: 35100 },
    { type: "Family Visa", count: 178, percentage: 14.3, revenue: 151300 },
    { type: "Work Visa", count: 81, percentage: 6.5, revenue: 97200 },
  ]

  const getFilteredMonthlyData = () => {
    if (duration === "daily" || duration === "weekly") return monthlyData.slice(-1); // placeholder visualization
    if (duration === "last-30-days") return monthlyData.slice(-1);
    if (duration === "last-3-months") return monthlyData.slice(-3);
    if (duration === "last-6-months") return monthlyData;
    if (duration === "last-year") return monthlyData; // adjust as needed
    return monthlyData;
  };

  const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as HeadersInit;
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const apiBase = BASE_URL.replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/admin/reports/summary?range=${duration}` , { headers: getAuthHeaders() });
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(body?.message || `Failed to fetch summary (${res.status})`);
        const totals = body?.totals;
        setSummary({
          totalApplications: totals?.totalApplications ?? 0,
          approvalRate: totals?.approvalRate ?? 0,
          avgProcessingDays: totals?.avgProcessingDays ?? 0,
          revenue: totals?.revenue ?? 0,
        });
      } catch (e) {
        console.error('Failed to fetch reports summary:', e);
        setSummary(null);
      }
    };
    fetchSummary();
  }, [duration]);

  const exportCSV = () => {
    const rows = [
      ["Month", "Applications", "Approved", "Rejected", "Revenue"],
      ...getFilteredMonthlyData().map(d => [
        d.month, d.applications, d.approved, d.rejected, d.revenue
      ])
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive system performance and business insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full sm:w-40 rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-primary" onClick={exportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric) => (
            <Card
              key={metric.title}
              className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 ${metric.color}`}>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold mb-2">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      metric.trend === "up"
                        ? "text-success bg-success/10 px-2 py-1 rounded-full"
                        : "text-primary bg-primary/10 px-2 py-1 rounded-full"
                    }
                  >
                    {metric.change}
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Monthly Performance Chart */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mr-3">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Monthly Application Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredMonthlyData().map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-md transition-all duration-200 space-y-2 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-medium w-8 text-lg">{data.month}</span>
                      <div className="text-sm text-muted-foreground">
                        {data.applications} total • {data.approved} approved • {data.rejected} rejected
                      </div>
                    </div>
                    <div className="text-sm font-medium bg-success/10 text-success px-3 py-1 rounded-full w-fit">
                      AED {data.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visa Type Breakdown */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mr-3">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                Visa Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visaTypeBreakdown.map((visa) => (
                  <div
                    key={visa.type}
                    className="space-y-2 p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{visa.type}</span>
                      <span className="text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                        {visa.count} ({visa.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${visa.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">Revenue: AED {visa.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Performance */}
        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
              <div className="p-2 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 mr-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              </div>
              Employee Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformance.map((employee) => (
                <div
                  key={employee.name}
                  className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.applications} applications processed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-8 text-center">
                      <div className="bg-success/5 px-3 sm:px-4 py-2 rounded-2xl">
                        <div className="text-base sm:text-lg font-bold text-success">{employee.approved}</div>
                        <div className="text-xs text-muted-foreground">Approved</div>
                      </div>
                      <div className="bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
                        <div className="text-base sm:text-lg font-bold text-primary">{employee.avgTime}</div>
                        <div className="text-xs text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="bg-warning/5 px-3 sm:px-4 py-2 rounded-2xl">
                        <div className="text-base sm:text-lg font-bold text-warning">{employee.satisfaction}</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Application Report</h3>
                  <p className="text-sm text-muted-foreground">Detailed application analytics</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-success/20 to-success/10">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Revenue Report</h3>
                  <p className="text-sm text-muted-foreground">Financial performance summary</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Efficiency Report</h3>
                  <p className="text-sm text-muted-foreground">Processing time analysis</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminReports