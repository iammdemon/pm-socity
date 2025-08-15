'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaComments, FaPlus, FaUser, FaClock,  FaFire,  FaArrowUp, FaSearch } from 'react-icons/fa';
import { useAddForumTopicMutation, useGetForumTopicsQuery } from '@/app/redux/services/forumApi';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface IForumTopic {
  _id?: string;
  title: string;
  slug: string;
  createdAt?: string;
  description?: string;
  author?: string;
  replies?: number;
  views?: number;
  lastActivity?: string;
  isHot?: boolean;
  isPinned?: boolean;
  category?: string;
}

export default function Discussions() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [addForumTopic] = useAddForumTopicMutation();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IForumTopic>({
    defaultValues: { title: "", slug: "", description: "" }
  });

  const onSubmit = async (values: IForumTopic) => {
    try {
      await addForumTopic(values).unwrap();
      toast.success("Forum topic created successfully");
      reset();
      setShowCreateForm(false);
      refetch();
    } catch {
      toast.error("Failed to create forum topic");
    }
  };

  const { data, isLoading, isError, refetch } = useGetForumTopicsQuery();
  const discussions: IForumTopic[] = data?.data ?? [];

  return (
    <div className="min-h-screen bg-[#ECE8E1]">
      {/* Glassmorphism Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-lg border-b border-white/20 py-3">
        <div className="max-w-7xl mx-auto ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <FaComments className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black tracking-tight">Community Hub</h1>
                <p className="text-black/70 font-medium">
                  Where ideas come to life
                </p>
              </div>
            </div>
            
            {/* Search and Action Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40 h-4 w-4" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10 w-80 bg-white/90 border-black/20 focus:border-black text-black placeholder:text-black/50"
                />
              </div>
              <Button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaPlus className="mr-2 h-4 w-4" />
                New Topic
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Create Topic Form with Glassmorphism */}
        {showCreateForm && (
          <div className="mb-8 animate-in slide-in-from-top-5 duration-300">
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-white/30 overflow-hidden">
              <div className="bg-gradient-to-r from-black to-black/80 p-6">
                <CardTitle className="text-xl text-white flex items-center">
                  <FaPlus className="mr-3 h-5 w-5" />
                  Create New Discussion
                </CardTitle>
                <p className="text-white/80 mt-1">Start a conversation that matters</p>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold">Topic Title</label>
                    <Input
                      placeholder="What's on your mind?"
                      className="border-black/20 focus:border-black text-black bg-white/80 h-12 text-lg"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="text-red-600 text-sm font-medium">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold">URL Slug</label>
                    <Input
                      placeholder="topic-url-slug"
                      className="border-black/20 focus:border-black text-black bg-white/80 h-12"
                      {...register("slug", { required: "Slug is required" })}
                    />
                    {errors.slug && <p className="text-red-600 text-sm font-medium">{errors.slug.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold">Description</label>
                    <Textarea
                      placeholder="Tell us more about your topic..."
                      className="border-black/20 focus:border-black text-black bg-white/80 min-h-[120px] resize-none"
                      {...register("description")}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className="bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <FaArrowUp className="mr-2 h-4 w-4" />
                      Publish Topic
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCreateForm(false)}
                      className="border-black/20 text-black hover:bg-black/5 shadow-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

  
        {/* Main Forum Content */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-white/30 overflow-hidden">
          <div className="bg-gradient-to-r from-black to-black/80 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaComments className="h-6 w-6 text-white" />
                <CardTitle className="text-xl text-white">Latest Discussions</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  {discussions.length} topics
                </Badge>
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="divide-y divide-black/10">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="p-6 animate-pulse">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full bg-black/10" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4 bg-black/10" />
                        <Skeleton className="h-4 w-full bg-black/10" />
                        <div className="flex space-x-6">
                          <Skeleton className="h-4 w-20 bg-black/10" />
                          <Skeleton className="h-4 w-20 bg-black/10" />
                          <Skeleton className="h-4 w-20 bg-black/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm border border-black/10 p-8 rounded-2xl max-w-md mx-auto shadow-lg">
                  <div className="h-16 w-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaComments className="h-8 w-8 text-black/40" />
                  </div>
                  <p className="text-black font-semibold text-lg mb-3">Unable to load discussions</p>
                  <p className="text-black/60 mb-6">Something went wrong. Please try again.</p>
                  <Button 
                    onClick={() => refetch()} 
                    className="bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : discussions.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl max-w-lg mx-auto shadow-lg">
                  <div className="h-20 w-20 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaComments className="h-10 w-10 text-black/40" />
                  </div>
                  <p className="text-black font-bold text-xl mb-2">No discussions yet</p>
                  <p className="text-black/60 mb-8 text-lg">Be the pioneer and start the first conversation.</p>
                  <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Create First Topic
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-black/10">
                {discussions.map((thread, index) => (
                  <div key={thread.slug} className="p-6 hover:bg-black/5 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      {/* Enhanced Avatar */}
                      <div className="flex-shrink-0 relative">
                        <div className="h-12 w-12 bg-gradient-to-br from-black to-black/80 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <FaUser className="h-6 w-6 text-white" />
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-black rounded-full flex items-center justify-center">
                            <FaFire className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {index < 3 && (
                                <Badge className="bg-black text-white text-xs">
                                  <FaFire className="mr-1 h-3 w-3" />
                                  HOT
                                </Badge>
                              )}
                              {thread.category && (
                                <Badge variant="outline" className="border-black/20 text-black/60 text-xs">
                                  {thread.category}
                                </Badge>
                              )}
                            </div>
                            
                            <Link href={`/dashboard/forum/${thread.slug}`}>
                              <h3 className="text-xl font-bold text-black hover:text-black/70 cursor-pointer transition-colors duration-200 group-hover:translate-x-1">
                                {thread.title}
                              </h3>
                            </Link>
                            
                            {thread.description && (
                              <p className="text-black/70 mt-2 line-clamp-2 text-base leading-relaxed">
                                {thread.description}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-6 mt-4 text-sm text-black/60">
                              <span className="flex items-center font-medium">
                                <FaUser className="h-3 w-3 mr-2" />
                                {thread.author || 'Anonymous'}
                              </span>
                              <span className="flex items-center">
                                <FaClock className="h-3 w-3 mr-2" />
                                {thread.createdAt ? new Date(thread.createdAt).toLocaleDateString() : 'Today'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Enhanced Stats */}
                          <div className="flex items-center space-x-6 text-sm text-black/60 ml-6">
                            <div className="text-center group-hover:scale-105 transition-transform duration-200">
                              <div className="font-bold text-black text-lg">{thread.replies || Math.floor(Math.random() * 50)}</div>
                              <div className="text-xs uppercase tracking-wider">Replies</div>
                            </div>
                            <div className="text-center group-hover:scale-105 transition-transform duration-200">
                              <div className="font-bold text-black text-lg">{thread.views || Math.floor(Math.random() * 500)}</div>
                              <div className="text-xs uppercase tracking-wider">Views</div>
                            </div>
                            <Link href={`/dashboard/forum/${thread.slug}`}>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-black hover:bg-black/10 hover:text-black transition-all duration-200"
                              >
                                <FaArrowUp className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Pagination */}
        {discussions.length > 0 && (
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg">
              <Button variant="ghost" size="sm" disabled className="text-black/40">
                Previous
              </Button>
              <Button size="sm" className="bg-black text-white shadow-lg">
                1
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:bg-black/10">
                2
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:bg-black/10">
                3
              </Button>
              <Button variant="ghost" size="sm" className="text-black hover:bg-black/10">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}