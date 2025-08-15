"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/app/redux/services/authApi";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

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
  // RTK Query returns errors in a consistent shape
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
    <div className="flex min-h-screen items-center justify-center bg-white ">
      <Card className="w-full max-w-lg    shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="oldPassword" className="">Old Password</Label>
              <Input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="mt-1   placeholder-gray-400"
                placeholder="Enter old password"
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="">New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="mt-1  placeholder-gray-400"
                placeholder="Enter new password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
