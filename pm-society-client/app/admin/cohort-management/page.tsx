"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Users, Plus, Eye } from "lucide-react";
import { useGetAllUsersQuery } from "@/app/redux/services/userApi";
import { useCreateCohortMutation, useGetCohortQuery } from "@/app/redux/services/authApi";


interface User {
  _id: string;
  name: string;
  email: string;
}

interface Cohort {
  _id: string;
  name: string;
  description?: string;
  members: User[];
  memberCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function CohortManagement() {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [] as string[],
  });

  // RTK Query hooks
  const { data: cohortResponse, isLoading, error, refetch } = useGetCohortQuery({});
  const cohorts = cohortResponse?.data
  const { data: userResponse } = useGetAllUsersQuery();
  const users = userResponse?.data
  const [createCohort, { isLoading: isCreating }] = useCreateCohortMutation();

  const handleCreateCohort = async () => {
    try {
      await createCohort(formData).unwrap();
      setFormData({ name: "", description: "", members: [] });
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to create cohort:", error);
    }
  };

  const handleViewCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setViewOpen(true);
  };

  const toggleMember = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-black">Loading cohorts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-black">Error loading cohorts</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Cohort Management</h1>
            <p className="text-gray-600 mt-2">Manage and view your organization cohorts</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Cohort
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Cohort</DialogTitle>
                <DialogDescription>
                  Add a new cohort to your organization. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cohort Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter cohort name"
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter cohort description"
                    className="border-gray-300 focus:border-black resize-none"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Members</Label>
                  <ScrollArea className="h-40 w-full border border-gray-300 rounded-md p-2">
                    <div className="space-y-2">
                      {users?.map((user: User) => (
                        <div key={user._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={user._id}
                            checked={formData.members.includes(user._id)}
                            onChange={() => toggleMember(user._id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <Label htmlFor={user._id} className="text-sm cursor-pointer">
                            {user.name} ({user.email})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <p className="text-xs text-gray-500">
                    {formData.members.length} member(s) selected
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-gray-300 text-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCohort}
                  disabled={!formData.name || isCreating}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {isCreating ? "Creating..." : "Create Cohort"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Cohorts Grid */}
        {cohorts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No cohorts yet</h3>
            <p className="text-gray-600 mb-4">Create your first cohort to get started</p>
            <Button
              onClick={() => setOpen(true)}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Cohort
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cohorts.map((cohort: Cohort) => (
              <Card key={cohort._id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-black">{cohort.name}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-black">
                      {cohort.memberCount || cohort.members?.length || 0} members
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {cohort.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">
                      Created: {new Date(cohort.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(cohort.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <Separator className="bg-gray-200" />
                <CardFooter className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCohort(cohort)}
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* View Cohort Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-black">{selectedCohort?.name}</DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedCohort?.description || "No description provided"}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-black mb-3">
                Members ({selectedCohort?.memberCount || selectedCohort?.members?.length || 0})
              </h4>
              <ScrollArea className="h-60 w-full border border-gray-200 rounded-md p-4">
                <div className="space-y-3">
                  {selectedCohort?.members?.map((member: User) => (
                    <div key={member._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-black">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setViewOpen(false)}
                className="bg-black text-white hover:bg-gray-800"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}