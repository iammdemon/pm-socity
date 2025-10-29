"use client";
import { useState } from "react";

import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, ExternalLink} from "lucide-react";
import { ILearningResource, useCreateLearningResourceMutation, useDeleteLearningResourceMutation, useGetLearningResourcesQuery, useUpdateLearningResourceMutation } from "@/app/redux/services/learningResourcesApi";

export default function LearningResourcesPage() {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<ILearningResource | null>(null);
  const [formData, setFormData] = useState<ILearningResource>({
    title: "",
    shortDescription: "",
    linkUrl: "",
  });

  const {
    data: resources = [],
    isLoading,
    error,
  } = useGetLearningResourcesQuery({});

  const [createResource, { isLoading: isCreating }] = useCreateLearningResourceMutation();
  const [updateResource, { isLoading: isUpdating }] = useUpdateLearningResourceMutation();
  const [deleteResource, { isLoading: isDeleting }] = useDeleteLearningResourceMutation();

  const handleCreateResource = async () => {
    try {
      await createResource(formData).unwrap();
      setIsCreateModalOpen(false);
      setFormData({ title: "", shortDescription: "", linkUrl: "" });
      toast.success("Resource created successfully!");
    } catch (error) {
      toast.error("Failed to create resource");
      console.error("Failed to create resource:", error);
    }
  };

  const handleUpdateResource = async () => {
    if (!currentResource?._id) return;
    
    try {
      await updateResource({
        id: currentResource._id,
        resource: formData,
      }).unwrap();
      setIsEditModalOpen(false);
      setCurrentResource(null);
      setFormData({ title: "", shortDescription: "", linkUrl: "" });
      toast.success("Resource updated successfully!");
    } catch (error) {
      toast.error("Failed to update resource");
      console.error("Failed to update resource:", error);
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      await deleteResource(id).unwrap();
      toast.success("Resource deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete resource");
      console.error("Failed to delete resource:", error);
    }
  };

  const openEditModal = (resource: ILearningResource) => {
    setCurrentResource(resource);
    setFormData({
      title: resource.title,
      shortDescription: resource.shortDescription,
      linkUrl: resource.linkUrl,
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", shortDescription: "", linkUrl: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 border-b-2 border-foreground pb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Learning Suite</h1>
              <p className="mt-2 text-muted-foreground">Manage your collection of learning suites</p>
            </div>
          
          </div>
        </header>

        <div className="mb-6 flex justify-end">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsCreateModalOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Learning Suite
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Learning Suite</DialogTitle>
                <DialogDescription>
                  Create a new learning suite to add to your collection.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter resource title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Enter short description"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Link URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateResource} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-destructive">Error loading learning suites. Please try again.</p>
            </CardContent>
          </Card>
        ) : resources.length === 0 ? (
          <Card className="text-center py-12 border-2 border-dashed">
            <CardContent>
              <p className="text-muted-foreground text-lg">No learning suites found. Add your first learning suite!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource: ILearningResource) => (
              <Card key={resource._id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {resource.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <a
                    href={resource.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="truncate">{resource.linkUrl}</span>
                  </a>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(resource)}
                        className="flex-1"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Learning Suite</DialogTitle>
                        <DialogDescription>
                          Update the details of this learning suite.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-title">Title</Label>
                          <Input
                            id="edit-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter resource title"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            placeholder="Enter short description"
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-url">Link URL</Label>
                          <Input
                            id="edit-url"
                            type="url"
                            value={formData.linkUrl}
                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" onClick={handleUpdateResource} disabled={isUpdating}>
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteResource(resource._id!)}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}