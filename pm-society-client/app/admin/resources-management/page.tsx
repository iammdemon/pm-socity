"use client";

import React, { useState } from "react";
import {
  useGetResourcesQuery,
  useAddResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  IResource
} from "../../redux/services/resourceApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FiEdit, FiTrash2, FiSearch, FiX, FiExternalLink, FiPlus, FiBook, FiTag } from "react-icons/fi";

export default function AdminResourcesPage() {
  const { data, isLoading, refetch } = useGetResourcesQuery();
  const resources: IResource[] = data?.data ?? [];

  console.log('re', resources)

  const [addResource] = useAddResourceMutation();
  const [updateResource] = useUpdateResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();

  const [editingResource, setEditingResource] = useState<IResource | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{
    title: string;
    description: string;
    link: string;
    tags: string;
  }>({
    defaultValues: { title: "", description: "", link: "", tags: "" }
  });

  const onSubmit = async (values: { title: string; description: string; link: string; tags: string }) => {
    const payload: Partial<IResource> = {
      title: values.title,
      description: values.description,
      link: values.link,
      tags: values.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    };
    try {
      if (editingResource) {
        await updateResource({ id: editingResource._id!, data: payload }).unwrap();
        toast.success("Resource updated successfully");
        setEditingResource(null);
      } else {
        await addResource(payload).unwrap();
        toast.success("Resource added successfully");
      }
      reset();
      setShowForm(false);
      refetch();
    } catch {
      toast.error("Failed to save resource");
    }
  };

  const handleEdit = (resource: IResource) => {
    setEditingResource(resource);
    setValue("title", resource.title);
    setValue("description", resource.description);
    setValue("link", resource.link);
    setValue("tags", resource.tags.join(", "));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
   
      try {
        await deleteResource(id).unwrap();
        toast.success("Resource deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete resource");
      }
   
  };

  const handleAddNew = () => {
    setEditingResource(null);
    reset();
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingResource(null);
    reset();
    setShowForm(false);
  };

  // Filter resources based on search term
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Action Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FiBook className="text-blue-600" />
              Resource Manager
            </h1>
            <p className="text-gray-600">Manage your learning resources and documentation</p>
          </div>
          <Button
            onClick={handleAddNew}
            className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Add New Resource
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources by title, description, or tags..."
                className="pl-12 pr-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-lg py-4 rounded-lg transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form - Only show when needed */}
        {showForm && (
          <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <CardHeader className="bg-black text-white p-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <FiPlus className="w-6 h-6" />
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiBook className="w-4 h-4" />
                      Title *
                    </label>
                    <Input
                      placeholder="Enter resource title"
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 py-3 rounded-lg transition-all duration-200"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="text-red-500 text-sm flex items-center gap-1">
                      <FiX className="w-3 h-3" />
                      {errors.title.message}
                    </p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FiExternalLink className="w-4 h-4" />
                      Link or PDF URL *
                    </label>
                    <Input
                      placeholder="https://example.com"
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 py-3 rounded-lg transition-all duration-200"
                      {...register("link", { required: "Link is required" })}
                    />
                    {errors.link && <p className="text-red-500 text-sm flex items-center gap-1">
                      <FiX className="w-3 h-3" />
                      {errors.link.message}
                    </p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Description *</label>
                  <Input
                    placeholder="Brief description of the resource"
                    className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 py-3 rounded-lg transition-all duration-200"
                    {...register("description", { required: "Description is required" })}
                  />
                  {errors.description && <p className="text-red-500 text-sm flex items-center gap-1">
                    <FiX className="w-3 h-3" />
                    {errors.description.message}
                  </p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FiTag className="w-4 h-4" />
                    Tags *
                  </label>
                  <Input
                    placeholder="react, javascript, tutorial (comma separated)"
                    className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 py-3 rounded-lg transition-all duration-200"
                    {...register("tags", { required: "Tags are required" })}
                  />
                  {errors.tags && <p className="text-red-500 text-sm flex items-center gap-1">
                    <FiX className="w-3 h-3" />
                    {errors.tags.message}
                  </p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    className="bg-black  text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {editingResource ? "Update Resource" : "Add Resource"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg transition-all duration-200"
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-600">
          <p className="text-sm font-medium">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
          {searchTerm && (
            <p className="text-sm">
              Search results for: <span className="font-semibold text-gray-900">{searchTerm}</span>
            </p>
          )}
        </div>

        {/* Resources Table */}
        <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FiBook className="w-6 h-6 text-black" />
              All Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-600 mt-4 text-lg">Loading resources...</p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="p-12 text-center">
                <FiBook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">
                  {searchTerm ? "No resources found matching your search" : "No resources available"}
                </p>
                {searchTerm ? (
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddNew}
                    className="bg-black  text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <FiPlus className="w-5 h-5" />
                    Add Your First Resource
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200 bg-gray-50">
                      <TableHead className="text-gray-900 font-bold py-4 px-6">Title</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4 px-6">Description</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4 px-6">Link</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4 px-6">Tags</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4 px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource, index) => (
                      <TableRow key={resource._id} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <TableCell className="text-gray-900 font-medium py-4 px-6 max-w-[200px]">
                          <div className="truncate font-semibold" title={resource.title}>
                            {resource.title}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 py-4 px-6 max-w-[250px]">
                          <div className="truncate" title={resource.description}>
                            {resource.description}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black  hover:underline flex items-center max-w-[200px] transition-colors duration-200"
                            title={resource.link}
                          >
                            <FiExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Open Link</span>
                          </a>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {resource.tags?.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="border-blue-200 text-black bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                              onClick={() => handleEdit(resource)}
                            >
                              <FiEdit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              onClick={() => handleDelete(resource._id!)}
                            >
                              <FiTrash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}