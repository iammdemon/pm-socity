"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from "@/app/redux/services/authApi";

import {
  User,
  Calendar,
  Edit3,
  Plus,
  X,
  Trophy,
  Target,
  Trash2,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import Loading from "@/app/components/functions/Loading";
import { toast } from "sonner";

// Define proper types for Goal and Achievement
interface Goal {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "in-progress" | "completed";
}

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: "certification" | "award" | "milestone" | "recognition";
}

interface User {
  name: string;
  userName: string;
  email: string;
  bio: string;
  title: string;
  phoneNumber: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery({});
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data: goalsData, isLoading: isGoalsLoading } = useGetGoalsQuery({});
  const { data: achievementsData, isLoading: isAchievementsLoading } =
    useGetAchievementsQuery({});

  const [createGoal] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  const [createAchievement] = useCreateAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

  const [activeTab, setActiveTab] = useState("profile");
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  
  // Add state for username validation
  const [usernameError, setUsernameError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: "",
    userName: "",
    email: "",
    bio: "",
    title: "",
    phoneNumber: "",
  });

  const [goalForm, setGoalForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "in-progress" as "in-progress" | "completed",
  });

  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "milestone" as "certification" | "award" | "milestone" | "recognition",
  });

  const user = userData?.data || userData;
  const goals = goalsData?.data || [];
  const achievements = achievementsData?.data || [];

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        bio: user.bio || "",
        title: user.title || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(""); // Reset error message
    
    try {
      await updateProfile(profileForm).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      // Type guard to check if error has the expected structure
      const errorObj = error as { data?: { message?: string }, message?: string };
      // Check if the error is specifically about username being taken
      if (errorObj?.data?.message?.includes("Username already taken") || 
          errorObj?.message?.includes("Username already taken")) {
        setUsernameError("Username is already taken. Please choose another one.");
        toast.error("Username is already taken");
      } else {
        toast.error("Failed to update profile");
      }
    }
  };

  const handleGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGoal) {
        await updateGoal({ id: editingGoal._id, ...goalForm }).unwrap();
        toast.success("Goal updated successfully");
      } else {
        await createGoal(goalForm).unwrap();
        toast.success("Goal created successfully");
      }
      setIsGoalDialogOpen(false);
      setEditingGoal(null);
      setGoalForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "in-progress",
      });
    } catch {
      toast.error("Failed to save goal");
    }
  };

  const handleAchievementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAchievement) {
        await updateAchievement({
          id: editingAchievement._id,
          ...achievementForm,
        }).unwrap();
        toast.success("Achievement updated successfully");
      } else {
        await createAchievement(achievementForm).unwrap();
        toast.success("Achievement created successfully");
      }
      setIsAchievementDialogOpen(false);
      setEditingAchievement(null);
      setAchievementForm({
        title: "",
        description: "",
        date: "",
        type: "milestone",
      });
    } catch {
      toast.error("Failed to save achievement");
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setGoalForm({
      title: goal.title,
      description: goal.description,
      startDate: goal.startDate
        ? new Date(goal.startDate).toISOString().split("T")[0]
        : "",
      endDate: goal.endDate
        ? new Date(goal.endDate).toISOString().split("T")[0]
        : "",
      status: goal.status,
    });
    setIsGoalDialogOpen(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date
        ? new Date(achievement.date).toISOString().split("T")[0]
        : "",
      type: achievement.type,
    });
    setIsAchievementDialogOpen(true);
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id).unwrap();
      toast.success("Goal deleted successfully");
    } catch {
      toast.error("Failed to delete goal");
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteAchievement(id).unwrap();
      toast.success("Achievement deleted successfully");
    } catch {
      toast.error("Failed to delete achievement");
    }
  };

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Edit Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Update your personal information, goals, and achievements
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-black dark:border-white"
              onClick={() => router.push("/dashboard")}
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="userName">Username</Label>
                      <Input
                        id="userName"
                        value={profileForm.userName}
                        onChange={(e) => {
                          setProfileForm({
                            ...profileForm,
                            userName: e.target.value,
                          });
                          // Clear error when user starts typing
                          if (usernameError) setUsernameError("");
                        }}
                        className={`mt-1 ${usernameError ? "border-red-500" : ""}`}
                      />
                      {usernameError && (
                        <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={profileForm.title}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            title: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      <Save className="w-4 h-4" />
                      {isUpdatingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Goals</h2>
              <Dialog
                open={isGoalDialogOpen}
                onOpenChange={setIsGoalDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingGoal ? "Edit Goal" : "Add New Goal"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingGoal
                        ? "Update your goal details."
                        : "Set a new goal to track your progress."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleGoalSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="goalTitle">Title</Label>
                        <Input
                          id="goalTitle"
                          value={goalForm.title}
                          onChange={(e) =>
                            setGoalForm({ ...goalForm, title: e.target.value })
                          }
                          placeholder="Enter goal title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="goalDescription">Description</Label>
                        <Textarea
                          id="goalDescription"
                          value={goalForm.description}
                          onChange={(e) =>
                            setGoalForm({
                              ...goalForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe your goal"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={goalForm.startDate}
                            onChange={(e) =>
                              setGoalForm({
                                ...goalForm,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={goalForm.endDate}
                            onChange={(e) =>
                              setGoalForm({
                                ...goalForm,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={goalForm.status}
                          onValueChange={(value) =>
                            setGoalForm({ ...goalForm, status: value as "in-progress" | "completed" })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        {editingGoal ? "Update" : "Create"} Goal
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {isGoalsLoading ? (
              <Loading />
            ) : goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal: Goal) => (
                  <Card
                    key={goal._id}
                    className="border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <Badge
                          variant={
                            goal.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {goal.status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {goal.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {goal.startDate &&
                            format(new Date(goal.startDate), "MMM d, yyyy")}
                          {goal.endDate &&
                            ` - ${format(
                              new Date(goal.endDate),
                              "MMM d, yyyy"
                            )}`}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditGoal(goal)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGoal(goal._id)}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No goals yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                    Start tracking your progress by adding your first goal.
                  </p>
                  <Button
                    onClick={() => setIsGoalDialogOpen(true)}
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Goal
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Achievements</h2>
              <Dialog
                open={isAchievementDialogOpen}
                onOpenChange={setIsAchievementDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    <Plus className="w-4 h-4" />
                    Add Achievement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingAchievement
                        ? "Edit Achievement"
                        : "Add New Achievement"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingAchievement
                        ? "Update your achievement details."
                        : "Celebrate your accomplishments by adding a new achievement."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAchievementSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="achievementTitle">Title</Label>
                        <Input
                          id="achievementTitle"
                          value={achievementForm.title}
                          onChange={(e) =>
                            setAchievementForm({
                              ...achievementForm,
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter achievement title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="achievementDescription">
                          Description
                        </Label>
                        <Textarea
                          id="achievementDescription"
                          value={achievementForm.description}
                          onChange={(e) =>
                            setAchievementForm({
                              ...achievementForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe your achievement"
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="achievementDate">Date</Label>
                        <Input
                          id="achievementDate"
                          type="date"
                          value={achievementForm.date}
                          onChange={(e) =>
                            setAchievementForm({
                              ...achievementForm,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="achievementType">Type</Label>
                        <Select
                          value={achievementForm.type}
                          onValueChange={(value) =>
                            setAchievementForm({
                              ...achievementForm,
                              type: value as "certification" | "award" | "milestone" | "recognition",
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="certification">
                              Certification
                            </SelectItem>
                            <SelectItem value="award">Award</SelectItem>
                            <SelectItem value="milestone">Milestone</SelectItem>
                            <SelectItem value="recognition">
                              Recognition
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        {editingAchievement ? "Update" : "Create"} Achievement
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {isAchievementsLoading ? (
              <Loading />
            ) : achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement: Achievement) => (
                  <Card
                    key={achievement._id}
                    className="border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {achievement.title}
                        </CardTitle>
                        <Badge variant="outline">{achievement.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.date &&
                            format(new Date(achievement.date), "MMM d, yyyy")}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditAchievement(achievement)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteAchievement(achievement._id)
                            }
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trophy className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No achievements yet
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                    Start documenting your accomplishments by adding your first
                    achievement.
                  </p>
                  <Button
                    onClick={() => setIsAchievementDialogOpen(true)}
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Achievement
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}