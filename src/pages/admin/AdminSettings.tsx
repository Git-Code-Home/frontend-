import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Shield, Database, Globe, Save, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AdminSettings = () => {
  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* General Settings */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mr-3">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName" className="text-sm font-medium">
                  System Name
                </Label>
                <Input
                  id="systemName"
                  defaultValue="Dubai Visa Application System"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium">
                  Default Timezone
                </Label>
                <Select defaultValue="uae">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uae">UAE Standard Time (UTC+4)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Standard Time</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">
                  Default Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium">
                  Default Currency
                </Label>
                <Select defaultValue="aed">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aed">AED (UAE Dirham)</SelectItem>
                    <SelectItem value="usd">USD (US Dollar)</SelectItem>
                    <SelectItem value="eur">EUR (Euro)</SelectItem>
                    <SelectItem value="gbp">GBP (British Pound)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mr-3">
                  <Database className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="processingTime" className="text-sm font-medium">
                  Default Processing Time (Days)
                </Label>
                <Input
                  id="processingTime"
                  type="number"
                  defaultValue="5"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize" className="text-sm font-medium">
                  Maximum File Size (MB)
                </Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  defaultValue="10"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Auto-assign Applications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Automatically assign new applications to available employees
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Enable Priority Processing</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Allow urgent applications to be fast-tracked
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Require Document Verification</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    All documents must be verified before approval
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 mr-3">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
                </div>
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Send email updates for status changes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">SMS Notifications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Send SMS alerts for urgent updates</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">WhatsApp Notifications</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Send WhatsApp messages for status updates</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminderDays" className="text-sm font-medium">
                  Expiry Reminder (Days Before)
                </Label>
                <Input
                  id="reminderDays"
                  type="number"
                  defaultValue="30"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-sm font-medium">
                  Admin Email
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  defaultValue="admin@dubai.gov"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 mr-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                </div>
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="text-sm font-medium">
                  Session Timeout (Minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  defaultValue="60"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordPolicy" className="text-sm font-medium">
                  Minimum Password Length
                </Label>
                <Input
                  id="passwordPolicy"
                  type="number"
                  defaultValue="8"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Require Two-Factor Authentication</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mandate 2FA for all admin users</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Enable Login Monitoring</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Track and log all login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Auto-lock Inactive Accounts</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Lock accounts after 90 days of inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Integration Settings */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mr-3">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentGateway" className="text-sm font-medium">
                  Payment Gateway
                </Label>
                <Select defaultValue="stripe">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="adcb">ADCB Gateway</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smsProvider" className="text-sm font-medium">
                  SMS Provider
                </Label>
                <Select defaultValue="twilio">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="aws-sns">AWS SNS</SelectItem>
                    <SelectItem value="messagebird">MessageBird</SelectItem>
                    <SelectItem value="etisalat">Etisalat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailProvider" className="text-sm font-medium">
                  Email Provider
                </Label>
                <Select defaultValue="sendgrid">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="ses">AWS SES</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Enable WhatsApp Business API</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Connect WhatsApp Business for notifications
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* System Maintenance */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mr-3">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
                System Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency" className="text-sm font-medium">
                  Backup Frequency
                </Label>
                <Select defaultValue="daily">
                  <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logRetention" className="text-sm font-medium">
                  Log Retention (Days)
                </Label>
                <Input
                  id="logRetention"
                  type="number"
                  defaultValue="90"
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 flex-1 pr-3">
                  <Label className="text-sm font-medium">Enable Maintenance Mode</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Put system in maintenance mode</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage" className="text-sm font-medium">
                  Maintenance Message
                </Label>
                <Textarea
                  id="maintenanceMessage"
                  placeholder="System is currently under maintenance. Please try again later."
                  rows={3}
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent"
                >
                  <Database className="mr-2 h-4 w-4" />
                  Backup Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Settings */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" className="rounded-2xl border-muted/30 hover:bg-muted/20 bg-transparent">
            Reset to Defaults
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminSettings
