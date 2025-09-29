import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/AuthLayout';

const EmployeeLogin = () => {
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
          description: "Welcome to the Employee Portal",
        });
        navigate('/employee/dashboard');
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
      title="Employee Login"
      description="Access your employee portal to manage client applications"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Employee ID / Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="employee@dubai.gov"
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

        <div className="text-center text-sm text-muted-foreground">
          Demo credentials: employee@dubai.gov / emp123
        </div>
      </form>
    </AuthLayout>
  );
};

export default EmployeeLogin;