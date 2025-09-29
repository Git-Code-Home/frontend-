import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Shield,
  Eye,
  Bell
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'employee' | 'client';
  userName?: string;
}

const DashboardLayout = ({ children, userRole, userName = 'User' }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = {
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Employees', href: '/admin/employees', icon: Users },
      { name: 'Clients', href: '/admin/clients', icon: Users },
      { name: 'Applications', href: '/admin/applications', icon: FileText },
      { name: 'Reports', href: '/admin/reports', icon: LayoutDashboard },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
    employee: [
      { name: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
      { name: 'My Clients', href: '/employee/clients', icon: Users },
      { name: 'Applications', href: '/employee/applications', icon: FileText },
      { name: 'New Application', href: '/employee/new-application', icon: FileText },
      { name: 'Profile', href: '/employee/profile', icon: Settings },
    ],
    client: [
      { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
      { name: 'My Applications', href: '/client/applications', icon: FileText },
      { name: 'New Application', href: '/client/new-application', icon: FileText },
      { name: 'Documents', href: '/client/documents', icon: FileText },
      { name: 'Profile', href: '/client/profile', icon: Settings },
    ]
  };

  const roleConfig = {
    admin: { title: 'Admin Portal', color: 'text-destructive' },
    employee: { title: 'Employee Portal', color: 'text-accent' },
    client: { title: 'Client Portal', color: 'text-success' }
  };

  const navItems = navigationItems[userRole];
  const config = roleConfig[userRole];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Shield className={`h-6 w-6 ${config.color}`} />
              <h1 className="text-xl font-bold">{config.title}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-sm">
              <p className="font-medium">{userName}</p>
              <p className="text-muted-foreground capitalize">{userRole}</p>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}>
          <div className="p-4 mt-16 lg:mt-0">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive(item.href) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;