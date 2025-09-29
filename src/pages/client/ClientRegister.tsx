import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/AuthLayout';

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please login.",
      });
      navigate('/client/login');
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout
      title="Client Registration"
      description="Create your account to start applying for Dubai visas"
      backTo="/client/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Ahmed"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Hassan"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="ahmed@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+971 50 123 4567"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nationality</Label>
            <Select onValueChange={(value) => handleInputChange('nationality', value)}>
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
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="passportNumber">Passport Number</Label>
            <Input
              id="passportNumber"
              placeholder="A1234567"
              value={formData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/client/login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ClientRegister;