import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldIcon,
  KeyIcon,
  UserIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  // Function to create user document in Firestore
  const createUserDocument = async (userData: any) => {
    try {
      const Data = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
      };
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      setTimeout(async () => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error creating user document: ", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic form validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && !displayName) {
      toast({
        title: "Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        // Create user document in Firestore
        await createUserDocument({
          email,
          displayName,
          password,
          role,
        });

        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      // Handle Firebase auth errors
      let errorMessage = "Authentication failed";

      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error - please check your connection";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests - please try again later";
      }

      toast({
        title: "Authentication failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
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
                {isLogin ? "Welcome back" : "Create an account"}
              </span>
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isLogin
                ? "Enter your credentials to access the medical portal"
                : "Enter your information to create a new account"}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-4">
              {!isLogin && (
                <div className="space-y-2 group">
                  <Label
                    htmlFor="displayName"
                    className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Dr. John Doe"
                      className="pl-10 h-12 bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-300"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 group">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                >
                  Email
                </Label>
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
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <KeyIcon className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
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
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <LockIcon className="h-5 w-5" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-300"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2 group">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors"
                  >
                    Account Type
                  </Label>
                  <div className="relative">
                    <Select
                      value={role}
                      onValueChange={(value: string) => setRole(value)}
                      required={!isLogin}
                    >
                      <SelectTrigger className="flex justify-between items-center w-full h-full px-3 py-2 text-left bg-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        {role || "Select Account Type"}
                      </SelectTrigger>
                      <SelectContent className="w-full max-h-40 overflow-auto">
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="user">Patient</SelectItem>
                        {/* <SelectItem value="admin">Admin</SelectItem> */}
                      </SelectContent>
                    </Select>
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
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-sm">
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </div>
                ) : (
                  <span>{isLogin ? "Sign in" : "Create account"}</span>
                )}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
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
