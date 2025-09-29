import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backTo?: string;
}

const AuthLayout = ({ title, description, children, backTo = '/' }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to={backTo}>
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;