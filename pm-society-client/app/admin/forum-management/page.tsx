"use client";


import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {  FiTrash2 } from "react-icons/fi";

import {
  useGetForumTopicsQuery,
  useAddForumTopicMutation,
  useDeleteForumTopicMutation,
  IForumTopic,
} from "@/app/redux/services/forumApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";


export default function AdminForumsPage() {
  const { data, isLoading, refetch } = useGetForumTopicsQuery();
  const forums = data?.data ?? [];

  const [addForumTopic] = useAddForumTopicMutation();
  const [deleteForumTopic] = useDeleteForumTopicMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IForumTopic>({
    defaultValues: { title: "", slug: "" }
  });

  const onSubmit = async (values: IForumTopic) => {
    try {
      await addForumTopic(values).unwrap();
      toast.success("Forum topic created successfully");
      reset();
      refetch();
    } catch {
      toast.error("Failed to create forum topic");
    }
  };

  const handleDelete = async (slug: string) => {
  
    try {
      await deleteForumTopic(slug).unwrap();
      toast.success("Forum topic deleted");
      refetch();
    } catch {
      toast.error("Failed to delete topic");
    }
  };

  return (
    <div className="min-h-screen bg-[#ECE8E1] p-8">
      <div className="max-w-5xl mx-auto space-y-10">

        <Card className="bg-white shadow-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">Create New Forum Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Title"
                className="border-black text-black"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

              <Input
                placeholder="Slug (e.g. pm-discussions)"
                className="border-black text-black"
                {...register("slug", { required: "Slug is required" })}
              />
              {errors.slug && <p className="text-red-600 text-sm">{errors.slug.message}</p>}

              <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                Create Topic
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">All Forum Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-black">Loading topics...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Title</TableHead>
                    <TableHead className="text-black">Slug</TableHead>
                    <TableHead className="text-black">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forums.map((topic: IForumTopic) => (
                    <TableRow key={topic._id}>
                     <TableCell className="text-black">{topic.title}</TableCell>
                      <TableCell className="text-black">{topic.slug}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-black text-black"
                          onClick={() => handleDelete(topic.slug)}
                        >
                          <FiTrash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
