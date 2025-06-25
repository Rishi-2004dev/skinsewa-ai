
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginSelectorProps {
  onSelect: (type: "admin" | "clinic") => void;
}

export function LoginSelector({ onSelect }: LoginSelectorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">SkinSewa Login Portal</h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Select the appropriate login option based on your role. For clinics, use your registered credentials. For administrators, use your admin credentials.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            className="border-2 hover:border-skinsewa-pink hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onSelect("admin")}
          >
            <CardHeader className="pb-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-skinsewa-pink/10">
                  <Shield className="h-8 w-8 text-skinsewa-pink" />
                </div>
              </div>
              <CardTitle className="text-xl">Admin Login</CardTitle>
              <CardDescription>
                For website administrators only
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-500">
              <p>Access to approve clinics, manage content, and oversee website operations</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-skinsewa-darkblue hover:bg-skinsewa-darkblue/90"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect("admin");
                }}
              >
                Login as Admin
              </Button>
            </CardFooter>
          </Card>
          
          <Card 
            className="border-2 hover:border-skinsewa-blue hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onSelect("clinic")}
          >
            <CardHeader className="pb-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-skinsewa-blue/10">
                  <User className="h-8 w-8 text-skinsewa-blue" />
                </div>
              </div>
              <CardTitle className="text-xl">Clinic Login</CardTitle>
              <CardDescription>
                For registered clinic staff only
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-500">
              <p>Access to manage patients, view reports, and update clinic information</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect("clinic");
                }}
              >
                Login as Clinic
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
