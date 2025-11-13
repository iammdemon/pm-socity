"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Users, Plus, Eye, Edit, Trash2, Search, X } from "lucide-react";
import { useGetAllUsersQuery } from "@/app/redux/services/userApi";
import {
  useCreateCohortMutation,
  useGetCohortsQuery,
  useUpdateCohortMutation,
  useDeleteCohortMutation,
} from "@/app/redux/services/authApi";
import { toast } from "sonner";

// Type definitions
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

interface CohortFormData {
  name: string;
  description: string;
  members: string[];
}

interface CohortFormProps {
  formData: CohortFormData;
  setFormData: React.Dispatch<React.SetStateAction<CohortFormData>>;
  users: User[];
  onSubmit: () => void;
  loading: boolean;
  onCancel: () => void;
  submitText: string;
}

export default function CohortManagement() {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [formData, setFormData] = useState<CohortFormData>({
    name: "",
    description: "",
    members: [],
  });

  // API hooks with proper typing
  const {
    data: cohortResponse,
    isLoading,
    error,
    refetch,
  } = useGetCohortsQuery({});
  const cohorts = cohortResponse?.data || [];

  const { data: userResponse } = useGetAllUsersQuery();
  const users = userResponse?.data || [];

  const [createCohort, { isLoading: isCreating }] = useCreateCohortMutation();
  const [updateCohort, { isLoading: isUpdating }] = useUpdateCohortMutation();
  const [deleteCohort, { isLoading: isDeleting }] = useDeleteCohortMutation();

  // Create
  const handleCreateCohort = async () => {
    if (!formData.name.trim()) {
      toast.error("Cohort name is required");
      return;
    }

    try {
      await createCohort(formData).unwrap();
      setFormData({ name: "", description: "", members: [] });
      setOpen(false);
      toast.success("Cohort created successfully");
      refetch();
    } catch {
      toast.error("Failed to create cohort");
    }
  };

  // Edit
  const handleEditCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setFormData({
      name: cohort.name,
      description: cohort.description || "",
      members: cohort.members.map((m) => m._id),
    });
    setEditOpen(true);
  };

  const handleUpdateCohort = async () => {
    if (!formData.name.trim()) {
      toast.error("Cohort name is required");
      return;
    }

    if (!selectedCohort?._id) {
      toast.error("Cohort ID is missing");
      return;
    }

    try {
      await updateCohort({
        id: selectedCohort._id,
        ...formData,
      }).unwrap();
      setEditOpen(false);
      toast.success("Cohort updated successfully");
      refetch();
    } catch  {
      toast.error("Failed to update cohort");
    }
  };

  // Delete
  const handleDeleteCohort = (id: string) => {
    toast("Are you sure?", {
      description: "This will permanently delete the cohort.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteCohort(id).unwrap();
            toast.success("Cohort deleted successfully");
            refetch();
          } catch {
            toast.error("Failed to delete cohort");
          }
        },
      },
    });
  };

  const handleViewCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setViewOpen(true);
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
            <p className="text-gray-600 mt-2">
              Manage and view your organization cohorts
            </p>
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
              </DialogHeader>
              <CohortForm
                formData={formData}
                setFormData={setFormData}
                users={users}
                onSubmit={handleCreateCohort}
                loading={isCreating}
                onCancel={() => setOpen(false)}
                submitText="Create"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cohorts Grid */}
        {cohorts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">
              No cohorts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first cohort to get started
            </p>
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
              <Card
                key={cohort._id}
                className="border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-black">
                      {cohort.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-black"
                    >
                      {cohort.memberCount || cohort.members?.length || 0}{" "}
                      members
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {cohort.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(cohort.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <Separator className="bg-gray-200" />
                <CardFooter className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCohort(cohort)}
                    className="border-gray-300 text-black hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCohort(cohort)}
                      className="border-gray-300 text-black hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCohort(cohort._id)}
                      disabled={isDeleting}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* View Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-black">
                {selectedCohort?.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedCohort?.description || "No description provided"}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-60 border rounded-md p-4">
              {selectedCohort?.members?.map((m) => (
                <div
                  key={m._id}
                  className="p-3 mb-2 bg-gray-50 rounded-lg flex flex-col"
                >
                  <span className="font-medium text-black">{m.name}</span>
                  <span className="text-sm text-gray-600">{m.email}</span>
                </div>
              ))}
            </ScrollArea>
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

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Cohort</DialogTitle>
            </DialogHeader>
            <CohortForm
              formData={formData}
              setFormData={setFormData}
              users={users}
              onSubmit={handleUpdateCohort}
              loading={isUpdating}
              onCancel={() => setEditOpen(false)}
              submitText="Update"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

/* ====== REUSABLE FORM COMPONENT WITH SEARCH ====== */
function CohortForm({
  formData,
  setFormData,
  users,
  onSubmit,
  loading,
  onCancel,
  submitText,
}: CohortFormProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const toggleMember = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter((id) => id !== userId)
        : [...prev.members, userId],
    }));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Get selected users details for display
  const selectedUsers = users.filter((user) =>
    formData.members.includes(user._id)
  );

  return (
    <>
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="cohort-name">Name</Label>
          <Input
            id="cohort-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter cohort name"
          />
        </div>
        <div>
          <Label htmlFor="cohort-description">Description</Label>
          <Textarea
            id="cohort-description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description"
          />
        </div>
        <div>
          <Label>Members</Label>

          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Selected Members Display */}
          {selectedUsers.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">
                Selected ({selectedUsers.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <Badge
                    key={user._id}
                    variant="default"
                    className="bg-black text-white"
                  >
                    {user.name}
                    <button
                      onClick={() => toggleMember(user._id)}
                      className="ml-2 hover:bg-gray-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* User List */}
          <div className="border rounded-md">
            <ScrollArea className="h-48">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchQuery ? "No users found" : "No users available"}
                </div>
              ) : (
                <div className="p-2">
                  {filteredUsers.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => toggleMember(u._id)}
                    >
                      <input
                        type="checkbox"
                        id={`user-${u._id}`}
                        checked={formData.members.includes(u._id)}
                        onChange={() => toggleMember(u._id)}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={`user-${u._id}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        <span className="font-medium">{u.name}</span>
                        <span className="text-gray-500 ml-2">({u.email})</span>
                      </Label>
                      {formData.members.includes(u._id) && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {searchQuery && (
            <p className="text-xs text-gray-500 mt-1">
              Found {filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!formData.name.trim() || loading}
          className="bg-black text-white hover:bg-gray-800"
        >
          {loading ? `${submitText}...` : submitText}
        </Button>
      </DialogFooter>
    </>
  );
}
