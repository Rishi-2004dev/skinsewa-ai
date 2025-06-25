
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, UserIcon, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface ClinicLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onBack?: () => void;
}

export function ClinicLogin({ onLogin, onBack }: ClinicLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ username, password });
    }, 800);
  };

  const setDemoCredentials = () => {
    setUsername("clinic");
    setPassword("clinic123");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4 space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-skinsewa-blue/10">
              <User className="h-10 w-10 text-skinsewa-blue" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">Clinic Login</CardTitle>
          <CardDescription>
            Enter your clinic credentials to access patient data
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="pl-10"
                  id="clinic-username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="pl-10"
                  id="clinic-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full relative" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner size="sm" />
                </div>
              ) : null}
              <span className={isLoading ? "opacity-0" : ""}>Sign In</span>
            </Button>
            
            {onBack && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack} 
                className="w-full"
              >
                Back to Selection
              </Button>
            )}
          </CardFooter>
        </form>
        <div className="p-4 text-center text-sm text-gray-500">
          <p>New clinic? <a href="/admin?tab=register" className="text-skinsewa-blue hover:underline">Register here</a></p>
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <p className="font-medium mb-1">Demo Credentials</p>
            <p>Username: clinic | Password: clinic123</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={setDemoCredentials} 
              className="mt-2 text-xs h-7"
            >
              Use Demo Credentials
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
