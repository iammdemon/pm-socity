"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  LuTrash2,
  LuPencil,
  LuUpload,
  LuPlus,
  LuX,
  LuImage,
  LuLoader,
  LuSearch,
  LuRefreshCw,
  LuLoaderCircle,
} from "react-icons/lu";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../redux/services/blogApi";
import Image from "next/image";
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
import axios from "axios";
// import { databases } from "@/lib/appwrite";
// import { ID } from "appwrite";

interface IBlogForm {
  title: string;
  slug: string;
  content: string;
  tags: string;
  image: string;
}

interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogsResponse {
  data: IBlog[];
  message: string;
  total?: number;
}

export default function AdminBlogs() {
  // const res = databases.listDocuments(
  //  process.env.NEXT_PUBLIC_DATABASE_ID!,
  //         process.env.NEXT_PUBLIC_COLLECTION_ID!
  // )
  // res.then((res) => console.log(res.documents))

  const {
    data: blogsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBlogsQuery(undefined, {
    selectFromResult: (result) =>
      result as { data?: BlogsResponse } & typeof result,
  });
  const blogs: IBlog[] = Array.isArray(
    (blogsResponse as BlogsResponse | undefined)?.data
  )
    ? (blogsResponse as BlogsResponse).data
    : [];

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get all unique tags for filter
  const allTags = [...new Set(blogs.flatMap((blog) => blog.tags))];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IBlogForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      tags: "",
      image: "",
    },
  });

  const watchTitle = watch("title");

  // Reset form when editingBlog changes
  useEffect(() => {
    if (editingBlog) {
      reset({
        title: editingBlog.title,
        slug: editingBlog.slug,
        content: editingBlog.content,
        tags: editingBlog.tags.join(", "),
        image: editingBlog.image,
      });
    } else {
      reset({
        title: "",
        slug: "",
        content: "",
        tags: "",
        image: "",
      });
    }
  }, [editingBlog, reset]);

  // Auto-generate slug from title for new blogs only
  useEffect(() => {
    if (watchTitle && !editingBlog) {
      const slug = slugify(watchTitle);
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [watchTitle, editingBlog, setValue]);

  const slugify = (text: string): string =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  // Improved form close handler
  const handleFormClose = useCallback(() => {
    setEditingBlog(null);
    setShowForm(false);
    reset({
      title: "",
      slug: "",
      content: "",
      tags: "",
      image: "",
    });
  }, [reset]);

  // Improved submit handler
  const onSubmit = async (data: IBlogForm) => {
    const payload: Omit<IBlog, "_id" | "createdAt" | "updatedAt"> = {
      title: data.title.trim(),
      slug: data.slug ? slugify(data.slug) : slugify(data.title),
      content: data.content.trim(),
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image: data.image.trim(),
    };

    try {
      if (editingBlog?._id) {
        await updateBlog({
          slug: editingBlog.slug,
          body: payload,
        }).unwrap();

        toast.success("Blog updated successfully!", {
          description: `"${payload.title}" has been updated.`,
          duration: 3000,
        });
      } else {
        await createBlog(payload).unwrap();
      // const res =  await databases.createDocument(
      //     process.env.NEXT_PUBLIC_DATABASE_ID!,
      //     process.env.NEXT_PUBLIC_COLLECTION_ID!, ID.unique(), payload
      //     )

      //     console.log(res)

        toast.success("Blog created successfully!", {
          description: `"${payload.title}" has been created.`,
          duration: 3000,
        });
      }

      // Force refresh and close form
      handleFormClose();
      await refetch();
    } catch (error: unknown) {
      console.error("Blog operation error:", error);

      let errorMessage = "An unexpected error occurred";

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data === "object" &&
        (error as { data?: { message?: string } }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
      ) {
        errorMessage = (error as { data: { message: string } }).data.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = (error as { message: string }).message;
      }

      toast.error(`Failed to ${editingBlog ? "update" : "create"} blog`, {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleEdit = useCallback((blog: IBlog) => {
    setEditingBlog(blog);
    setShowForm(true);
  }, []);

  const handleNewBlog = useCallback(() => {
    setEditingBlog(null);
    setShowForm(true);
  }, []);

  const handleDeleteClick = useCallback((slug: string) => {
    setBlogToDelete(slug);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog(blogToDelete).unwrap();

      toast.success("Blog deleted successfully!", {
        description: "The blog post has been removed.",
        duration: 3000,
      });

      // Close form if editing the deleted blog
      if (editingBlog?.slug === blogToDelete) {
        handleFormClose();
      }

      await refetch();
    } catch (error: unknown) {
      console.error("Delete error:", error);

      const errorMessage = "Failed to delete blog";
      let errorDescription = "Please try again";

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data === "object" &&
        (error as { data?: { message?: string } }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
      ) {
        errorDescription = (error as { data: { message: string } }).data
          .message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorDescription = (error as { message: string }).message;
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 4000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    toast.error("Invalid file type", {
      description: "Please select a valid image file (JPG, PNG, GIF, WebP)",
      duration: 3000,
    });
    return;
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    toast.error("File too large", {
      description: "Image size must be less than 5MB",
      duration: 3000,
    });
    return;
  }

  setImageUploading(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "raiyanrimon2"); // Replace with your preset

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dggotjc19/image/upload",
      formData
    );
    if (res.status !== 200) {
      throw new Error(`Upload failed: ${res.status}`);
    }
   
    const data = res.data;
 
    if (!data.secure_url) {
      throw new Error("No image URL returned from Cloudinary");
    }
    setValue("image", data.secure_url, { shouldValidate: true });

    toast.success("Image uploaded successfully!", {
      description: "Your image has been uploaded and is ready to use.",
      duration: 3000,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    toast.error("Image upload failed", {
      description: "Please try again or enter the image URL manually",
      duration: 4000,
    });
  } finally {
    setImageUploading(false);
  }
};

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedTag("");
    setCurrentPage(1);
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success("Blogs refreshed successfully!");
    } catch {
      toast.error("Failed to refresh blogs");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage your blog posts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <LuRefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={handleNewBlog}
            className="flex items-center gap-2 bg-black"
            size="default"
          >
            <LuPlus className="w-4 h-4" />
            New Blog Post
          </Button>
        </div>
      </div>

      {/* Add/Edit Blog Form */}
      {showForm && (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
              
                <CardTitle className="text-xl text-black">
                  {editingBlog
                    ? `Edit: ${editingBlog.title}`
                    : "Create New Blog Post"}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50"
              >
                <LuX className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter an engaging blog title..."
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Title must be less than 200 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <LuLoaderCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <Label
                    htmlFor="slug"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    Slug{" "}
                    {!editingBlog && (
                      <span className="text-gray-500 text-xs">
                        (auto-generated)
                      </span>
                    )}
                  </Label>
                  <Input
                    id="slug"
                    placeholder="blog-post-slug"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("slug", {
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message:
                          "Slug must contain only lowercase letters, numbers, and hyphens",
                      },
                    })}
                  />
                  {errors.slug && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <LuLoaderCircle className="w-3 h-3" />
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <Label
                    htmlFor="tags"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    Tags <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tags"
                    placeholder="react, nextjs, typescript"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("tags", {
                      required: "At least one tag is required",
                    })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                  {errors.tags && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <LuLoaderCircle className="w-3 h-3" />
                      {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <Label
                  htmlFor="content"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog content here..."
                  rows={10}
                  className="mt-1 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  {...register("content", {
                    required: "Content is required",
                    minLength: {
                      value: 50,
                      message: "Content must be at least 50 characters",
                    },
                  })}
                />
                {errors.content && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <LuLoaderCircle className="w-3 h-3" />
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  Featured Image <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
       
                    <div className="flex gap-2">
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                          imageUploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {imageUploading ? (
                          <LuLoader className="w-4 h-4 animate-spin" />
                        ) : (
                          <LuUpload className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {imageUploading ? "Uploading..." : "Upload"}
                        </span>
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imageUploading}
                      />
                    </div>
                  </div>
                  {errors.image && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <LuLoaderCircle className="w-3 h-3" />
                      {errors.image.message}
                    </p>
                  )}

                  {/* Image Preview */}
                  {watch("image") && (
                    <div className="mt-3">
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                        <Image
                          src={watch("image")}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                        <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                          <LuLoaderCircle className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 flex justify-end gap-3 p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleFormClose}
                disabled={isCreating || isUpdating}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !isValid ||
                  !isDirty ||
                  isCreating ||
                  isUpdating ||
                  imageUploading
                }
                className="min-w-[120px] bg-black text-white"
              >
                {isCreating || isUpdating ? (
                  <>
                    <LuLoader className="w-4 h-4 animate-spin mr-2" />
                    {editingBlog ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {editingBlog ? (
                      <>
                        <LuPencil className="w-4 h-4 mr-2" />
                        Update Blog
                      </>
                    ) : (
                      <>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Create Blog
                      </>
                    )}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[120px] focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              {(searchTerm || selectedTag) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="border-gray-300"
                >
                  <LuX className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog List */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              Blog Posts
              <Badge variant="secondary" className="text-sm">
                {filteredBlogs.length}
              </Badge>
            </CardTitle>
            {isLoading && (
              <LuLoader className="w-4 h-4 animate-spin text-gray-400" />
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <LuLoader className="w-8 h-8 animate-spin text-black mx-auto mb-2" />
                <p className="text-gray-500">Loading blogs...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <LuLoaderCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 mb-2">Error loading blogs</p>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <LuRefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <LuImage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                {searchTerm || selectedTag
                  ? "No blogs match your filters"
                  : "No blogs found"}
              </p>
              {!searchTerm && !selectedTag && (
                <Button
                  onClick={handleNewBlog}
                  variant="outline"
                  className="border-black text-black hover:bg-blue-50"
                >
                  <LuPlus className="w-4 h-4 mr-2" />
                  Create Your First Blog
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-medium text-gray-900">
                        Blog
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Tags
                      </th>
                      <th className="text-left p-4 font-medium text-gray-900">
                        Image
                      </th>
                      <th className="text-right p-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBlogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="max-w-md">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {blog.content.slice(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Slug: {blog.slug}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          {blog.image ? (
                            <div className="relative w-16 h-10 rounded overflow-hidden shadow-sm">
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <LuImage className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(blog)}
                              disabled={isDeleting}
                              className="border-black text-black hover:bg-blue-50"
                            >
                              <LuPencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(blog.slug)}
                              disabled={isDeleting}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              <LuTrash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {paginatedBlogs.map((blog) => (
                  <Card key={blog._id} className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {blog.image ? (
                          <div className="relative w-20 h-16 rounded overflow-hidden">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <LuImage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {blog.content.slice(0, 80)}...
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {blog.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{blog.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(blog)}
                            disabled={isDeleting}
                            className="text-xs"
                          >
                            <LuPencil className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(blog.slug)}
                            disabled={isDeleting}
                            className="text-xs"
                          >
                            <LuTrash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredBlogs.length)}{" "}
                    of {filteredBlogs.length} blogs
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                      Previous
                    </Button>

                    {/* Page numbers */}
                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <LuLoader className="w-4 h-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
