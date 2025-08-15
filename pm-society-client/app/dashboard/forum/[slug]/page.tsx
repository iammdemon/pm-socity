'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetForumTopicBySlugQuery, useGetMessagesByTopicQuery, useCreateMessageMutation } from '@/app/redux/services/forumApi';
import { useGetMeQuery } from '@/app/redux/services/authApi';

export default function DiscussionThread() {
  const { slug } = useParams() as { slug: string };
  const { data: topicData, isLoading, isError } = useGetForumTopicBySlugQuery(slug);
  const { data: users } = useGetMeQuery({});

  const user = users?.data
  console.log(user);
  const topic = topicData?.data;

  const topicId = topic?._id;
  const { data: messagesData, refetch } = useGetMessagesByTopicQuery(topicId ?? '', {
    skip: !topicId,
  });

  const [createMessage, { isLoading: isPosting }] = useCreateMessageMutation();
  const { register, handleSubmit, reset } = useForm<{ userName: string; message: string }>({});
  
  const onSubmit = async (values: {userName: string; message: string }) => {
    if (!topic?._id) return;
    await createMessage({ topicId: topic._id, userName: user?.name, message: values.message }).unwrap();
    reset();
    refetch();
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <Skeleton className="h-4 w-1/4 mb-3" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isError || !topic) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic not found</h3>
        <p className="text-gray-600 mb-6">The discussion thread you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/dashboard/forum">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Return to Forum
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/forum">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Forum
              </Button>
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{messagesData?.data.length ?? 0} replies</span>
              <span>•</span>
              <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Topic Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {topic.slug}
              </Badge>
              <span className="text-sm text-gray-500">
                Started {new Date(topic.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {topic.title}
            </h1>
          </div>
          
          {/* Original Post */}
          <div className="p-6 bg-gray-50/50">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">OP</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">Topic Author</span>
                  <Badge variant="outline" className="text-xs">Original Poster</Badge>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {topic.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {messagesData?.data.length === 0 ? 'No replies yet' : `${messagesData?.data.length} ${messagesData?.data.length === 1 ? 'Reply' : 'Replies'}`}
            </h2>
            {/* {messagesData?.data.length > 0 && (
              <Button variant="outline" size="sm" className="text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Sort by newest
              </Button>
            )} */}
          </div>

          {messagesData?.data.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start the conversation</h3>
              <p className="text-gray-600 mb-6">Be the first to share your thoughts on this topic.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messagesData?.data.map((msg, index) => (
                <div key={msg._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {msg?.userName?.charAt(0)?.toUpperCase() || 'A'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{msg?.userName}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(msg.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {index === 0 && (
                            <Badge variant="outline" className="text-xs">First reply</Badge>
                          )}
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700">
                          {msg?.message}
                        </div>
                        <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 -ml-2">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-lg shadow-sm border sticky bottom-4">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'Y'}
                </span>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-900">Replying as {user?.name}</span>
                </div>
                <Textarea
                  placeholder="Share your thoughts..."
                  {...register("message", { required: true })}
                  rows={4}
                  className="mb-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>• Be respectful and constructive</span>
                    <span>• Stay on topic</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => reset()}
                      className="text-gray-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPosting || !user}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      {isPosting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Posting...
                        </>
                      ) : (
                        "Post Reply"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}