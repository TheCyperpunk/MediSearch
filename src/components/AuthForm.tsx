import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, MailIcon, ShieldIcon, KeyIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic form validation
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    try {
      setTimeout(() => {
        // In a real app, this would be an API call
        if (isLogin && email === 'doctor@example.com' && password === 'password') {
          toast({
            title: 'Success',
            description: 'You have successfully logged in.',
          });
          navigate('/dashboard');
        } else if (isLogin) {
          throw new Error('Invalid credentials');
        } else {
          // Signup success
          toast({
            title: 'Account created',
            description: 'Your account has been created successfully.',
          });
          setIsLogin(true);
        }
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating circles background elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-24 h-24 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-10 w-28 h-28 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <Card className="w-full backdrop-blur-lg bg-white/40 border border-white/20 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-blue-200/40 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/60 to-indigo-50/50 rounded-2xl z-0"></div>
        
        <div className="relative z-10">
          <CardHeader className="space-y-1 pb-2">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 p-1 shadow-lg animate-pulse-slow">
                <ShieldIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </span>
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isLogin
                ? 'Enter your credentials to access the medical portal'
                : 'Enter your information to create a new account'}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    className="pl-10 h-12 bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <KeyIcon className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2 group">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Confirm Password</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <LockIcon className="h-5 w-5" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-300"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="text-sm text-right">
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/70 text-gray-500 rounded">Or continue with</span>
                </div>
              </div>
              
              <div className="flex space-x-3 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white/70 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl shadow-sm transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white/70 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl shadow-sm transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white/70 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl shadow-sm transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
              </div>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setPassword('');
                    setConfirmPassword('');
                  }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;