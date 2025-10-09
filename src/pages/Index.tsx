import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, FileText, Eye } from 'lucide-react';
import heroImage from '@/assets/dubai-hero.jpg';

const Index = () => {
  const userRoles = [
    {
      title: 'Admin Portal',
      description: 'Complete system management, employee oversight, and analytics',
      icon: Shield,
      href: '/admin/login',
      features: ['Dashboard & Analytics', 'Employee Management', 'Client Overview', 'Visa Tracking']
    },
    {
      title: 'Employee Portal',
      description: 'Handle client applications and document processing',
      icon: Users,
      href: '/employee/login',
      features: ['Client Registration', 'Application Processing', 'Document Upload', 'Status Updates']
    },
    {
      title: 'Agent  Portal',
      description: 'Handle client applications and document processing',
      icon: Users,
      href: '/Agent/login',
      features: ['Client Registration', 'Application Processing', 'Document Upload', 'Status Updates']
    },
    {
      title: 'Client Portal',
      description: 'Submit applications and track your visa status',
      icon: FileText,
      href: '/client/login',
      features: ['Apply for Visa', 'Track Status', 'Upload Documents', 'View Validity']
    },
    {
      title: 'Check Status',
      description: 'Track application without login using secure link',
      icon: Eye,
      href: '/status',
      features: ['No Login Required', 'Secure Access', 'Real-time Updates', 'Validity Tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Dubai Visa Application System
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Streamlined visa processing with real-time tracking, secure document management, 
            and comprehensive administrative tools for all stakeholders.
          </p>
          <Button size="lg" variant="secondary" className="animate-fade-in">
            Get Started
          </Button>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Portal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access the appropriate portal based on your role in the visa application process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userRoles.map((role, index) => (
            <Card key={role.title} className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in border-0">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-fit">
                  <role.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {role.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={role.href} className="block">
                  <Button className="w-full" variant="outline">
                    Access Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Visa Management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From application to expiry tracking, our system handles every aspect of visa processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-success/10 rounded-full w-fit">
                <FileText className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Application Processing</h3>
              <p className="text-muted-foreground">
                Streamlined application workflow with document upload and status tracking
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-warning/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Management</h3>
              <p className="text-muted-foreground">
                Role-based access control with secure document storage and tracking
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Role Access</h3>
              <p className="text-muted-foreground">
                Dedicated portals for administrators, employees, and clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Dubai Visa Application System</h3>
          <p className="text-background/80 mb-6">
            Professional visa processing with comprehensive tracking and management tools
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/admin/login" className="text-background/80 hover:text-background transition-colors">
              Admin
            </Link>
            <Link to="/employee/login" className="text-background/80 hover:text-background transition-colors">
              Employee
            </Link>
            <Link to="/client/login" className="text-background/80 hover:text-background transition-colors">
              Client
            </Link>
            <Link to="/status" className="text-background/80 hover:text-background transition-colors">
              Status Check
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;