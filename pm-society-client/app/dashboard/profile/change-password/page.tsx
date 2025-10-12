"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Shield } from "lucide-react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/app/redux/services/authApi";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(form).unwrap();
      toast.success("Password changed successfully 🚀");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const apiErr = err as { data?: { message?: string } };
        toast.error(apiErr.data?.message || "Failed to change password 😢");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to change password 😢");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Change Password
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure your account with a new password
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="oldPassword" className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                Old Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 text-base placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-xl"
                  placeholder="Enter old password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 text-base placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-xl"
                  placeholder="Enter new password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none border-0"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Changing Password..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}