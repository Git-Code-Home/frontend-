import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/AuthLayout';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to your Client Portal",
        });
        navigate('/client/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Client Login"
      description="Access your personal visa application portal"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Demo credentials: client@example.com / client123
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/client/register" className="text-primary hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ClientLogin;