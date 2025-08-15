"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { 
  Calendar,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  Clock,
  Users
} from "lucide-react";

import { 
  useAddEventMutation, 
  useDeleteEventMutation, 
  useGetEventsQuery, 
  useUpdateEventMutation 
} from "@/app/redux/services/eventApi";
import Image from "next/image";

// Form validation schema
const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  slug: z.string().min(1, "Slug is required").max(50, "Slug must be less than 50 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  image: z.string().url("Please provide a valid image URL"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
});

type FormData = z.infer<typeof eventSchema>;
  interface ErrorWithMessage {
        data?: {
          message?: string;
        };
      }

// Cloudinary upload configuration
const CLOUDINARY_CLOUD_NAME = "dggotjc19"
const CLOUDINARY_UPLOAD_PRESET = "raiyanrimon2"

 type Event = {
    title: string;
    slug: string;
    description: string;
    image: string;
    date: string;
    location: string;
    // Add other fields if needed
  };

export default function AdminEventsPage() {
  const { data: eventResponse, isLoading, refetch } = useGetEventsQuery();
 

  const events: Event[] = eventResponse?.data || [];

  const [addEvent] = useAddEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editEventSlug, setEditEventSlug] = useState<string | null>(null);
  const [deleteEventSlug, setDeleteEventSlug] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: "",
      date: "",
      location: "",
    }
  });

  const watchedImage = watch("image");

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!editEventSlug) {
      const slug = generateSlug(title);
      setValue("slug", slug);
    }
  };

  // Cloudinary image upload
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    formData.append("folder", "events");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      setImageUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      setValue("image", imageUrl);
      setImagePreview(imageUrl);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  // Handle save event
  // Handle save event
  const handleSave = async (data: FormData) => {
    try {
      if (editEventSlug) {
        await updateEvent({ slug: editEventSlug, data }).unwrap();
        toast.success("Event updated successfully");
      } else {
        await addEvent(data).unwrap();
        toast.success("Event added successfully");
      }
      setIsDialogOpen(false);
      reset();
      setImagePreview(null);
      refetch();
    } catch (err: unknown) {
    
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as ErrorWithMessage).data === "object" &&
        (err as ErrorWithMessage).data !== null &&
        "message" in ((err as ErrorWithMessage).data as object)
      ) {
        toast.error((err as ErrorWithMessage).data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };



  // Handle edit event
  const handleEdit = (event: Event) => {
    setEditEventSlug(event.slug);
    reset(event);
    setImagePreview(event.image);
    setIsDialogOpen(true);
  };

  // Handle delete event
  const handleDelete = async (slug: string) => {
    try {
      await deleteEvent(slug).unwrap();
      toast.success("Event deleted successfully");
      refetch();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as ErrorWithMessage).data === "object" &&
        (err as ErrorWithMessage).data !== null &&
        "message" in ((err as ErrorWithMessage).data as object)
      ) {
        toast.error((err as ErrorWithMessage).data?.message || "Failed to delete event");
      } else {
        toast.error("Failed to delete event");
      }
    } finally {
      setDeleteEventSlug(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if event is upcoming
  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Event Management</h1>
              <p className="text-slate-600">Create and manage your events with ease</p>
            </div>
            <Button
              onClick={() => {
                setEditEventSlug(null);
                reset();
                setImagePreview(null);
                setIsDialogOpen(true);
              }}
              className="bg-black text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Events</p>
                  <p className="text-2xl font-bold text-slate-900">{events.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Upcoming</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {events.filter(event => isUpcoming(event.date)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Past Events</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {events.filter(event => !isUpcoming(event.date)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl font-semibold text-slate-900">
              Events List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No events yet</h3>
                <p className="text-slate-600 mb-4">Get started by creating your first event</p>
                <Button
                  onClick={() => {
                    setEditEventSlug(null);
                    reset();
                    setImagePreview(null);
                    setIsDialogOpen(true);
                  }}
                  className="bg-black text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event: Event) => (
                  <div
                    key={event.slug}
                    className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      {isUpcoming(event.date) && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteEventSlug(event.slug)}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border-0 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {editEventSlug ? "Edit Event" : "Create New Event"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Event Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter event title"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                {...register("title")}
                onChange={handleTitleChange}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium text-slate-700">
                URL Slug *
              </Label>
              <Input
                id="slug"
                placeholder="event-url-slug"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                {...register("slug")}
                disabled={!!editEventSlug}
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                rows={4}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Event Image *
              </Label>
              <div className="space-y-4">
                {/* Image Preview */}
                {(imagePreview || watchedImage) && (
                  <div className="relative">
                    <Image
                    width={64}
                    height={64}
                      src={imagePreview || watchedImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-slate-300"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => {
                        setImagePreview(null);
                        setValue("image", "");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {/* Upload Options */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className="flex-1"
                  >
                    {imageUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload Image
                  </Button>
                  
                 
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {errors.image && (
                <p className="text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            {/* Date and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-slate-700">
                  Event Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="Enter event location"
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || imageUploading}
              className="w-full bg-black text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {editEventSlug ? "Update Event" : "Create Event"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteEventSlug} onOpenChange={() => setDeleteEventSlug(null)}>
        <AlertDialogContent className="bg-white border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-slate-900">
              Delete Event
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-300 hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteEventSlug && handleDelete(deleteEventSlug)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}