"use client"
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, Heart, Send, ImagePlus, MoreVertical, Trash2, Edit2, X, Users, TrendingUp, Loader2, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { 
  Cohort, 
  CohortPost, 
  useAddReplyMutation, 
  useCreatePostMutation, 
  useDeletePostMutation, 
  useGetMyCohortsQuery, 
  useGetPostsByCohortQuery, 
  useToggleReactionOnPostMutation, 
  useUpdatePostMutation 
} from '@/app/redux/services/cohortPost';
import { useToggleReactionOnReplyMutation } from '@/app/redux/services/forumApi';
import { useGetMeQuery } from '@/app/redux/services/authApi';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
    </div>
  );
};

// Define type for reaction objects
type ReactionObject = {
  _id?: string;
  id?: string;
  userId?: string;
  [key: string]: unknown;
};

const CohortPage = () => {
  // Get current user data
  const { data: userData, isLoading: userLoading } = useGetMeQuery({});
  const currentUser = userData?.data;
  const isAdmin = currentUser?.role === 'admin';

  // Get cohorts data
  const { data: cohortsData, isLoading: cohortsLoading } = useGetMyCohortsQuery();
  const cohorts = useMemo(() => cohortsData?.data || [], [cohortsData?.data]);
  
  // State for selected cohort and dropdown
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [showCohortDropdown, setShowCohortDropdown] = useState(false);
  
  // Get posts for selected cohort
  const { data: postsData, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = useGetPostsByCohortQuery(
    { cohortId: selectedCohort?._id || '', page: 1, limit: 20 },
    { skip: !selectedCohort }
  );
  const posts = postsData?.data || [];
  
  // Mutations
  const [createPost, { isLoading: createLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [addReply] = useAddReplyMutation();
  const [togglePostReaction] = useToggleReactionOnPostMutation();
  const [toggleReplyReaction] = useToggleReactionOnReplyMutation();
  
  // State for UI
  const [newPostContent, setNewPostContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editSelectedFile, setEditSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [reactingPostId, setReactingPostId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set default cohort when data loads
  useEffect(() => {
    if (cohorts.length > 0 && !selectedCohort) {
      // If admin, select the first cohort
      // If regular user, select their cohort
      setSelectedCohort(cohorts[0]);
    }
  }, [cohorts, selectedCohort]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCohortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate preview for selected file
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  }, [selectedFile]);

  // Generate preview for edit file
  useEffect(() => {
    if (editSelectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(editSelectedFile);
    } else {
      setEditPreviewImage(null);
    }
  }, [editSelectedFile]);

  const formatRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "some time ago";
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !selectedCohort) return;
    
    try {
      await createPost({
        cohort: selectedCohort._id,
        content: newPostContent,
        file: selectedFile || undefined
      }).unwrap();
      
      setNewPostContent('');
      setSelectedFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      showToast('Post created successfully!', 'success');
    } catch (error) {
      console.error('Failed to create post:', error);
      showToast('Failed to create post. Please try again.', 'error');
    }
  };

  const handleAddReply = async (postId: string) => {
    if (!replyContent.trim()) return;
    
    try {
      await addReply({
        postId,
        data: { content: replyContent }
      }).unwrap();
      
      setReplyContent('');
      setReplyingTo(null);
      showToast('Reply added successfully!', 'success');
    } catch (error) {
      console.error('Failed to add reply:', error);
      showToast('Failed to add reply. Please try again.', 'error');
    }
  };

  const toggleReaction = async (postId: string, replyId?: string) => {
    setReactingPostId(replyId || postId);
    try {
      if (replyId) {
        await toggleReplyReaction({
          topicId: postId, replyId,
          userId: ''
        }).unwrap();
      } else {
        await togglePostReaction(postId).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
      showToast('Failed to update reaction. Please try again.', 'error');
    } finally {
      setReactingPostId(null);
    }
  };

  const hasReacted = (post: CohortPost, replyId?: string) => {
    if (!currentUser) return false;
    
    const reactions: unknown[] = replyId 
      ? post.replies.find(r => r._id === replyId)?.reactions || []
      : post.reactions || [];
      
    return reactions.some((reaction) => {
      // handle string reaction ids
      if (typeof reaction === 'string') {
        return reaction === currentUser._id;
      }

      // handle object reactions with different id shapes
      if (reaction && typeof reaction === 'object') {
        const reactionObj = reaction as ReactionObject;
        const id = reactionObj._id ?? reactionObj.id ?? reactionObj.userId ?? null;
        return id === currentUser._id;
      }

      return false;
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deletePost(postId).unwrap();
      showToast('Post deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete post:', error);
      showToast('Failed to delete post. Please try again.', 'error');
    }
  };

  const handleUpdatePost = async (postId: string) => {
    if (!editContent.trim()) return;
    
    try {
      await updatePost({
        postId,
        data: { content: editContent },
        file: editSelectedFile || undefined
      }).unwrap();
      
      setEditingPost(null);
      setEditContent('');
      setEditSelectedFile(null);
      setEditPreviewImage(null);
      showToast('Post updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update post:', error);
      showToast('Failed to update post. Please try again.', 'error');
    }
  };

  const startEdit = (post: CohortPost) => {
    setEditingPost(post._id);
    setEditContent(post.content);
    setEditPreviewImage(post.imageUrl || null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditSelectedFile(e.target.files[0]);
    }
  };

  if (userLoading || cohortsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your cohorts...</p>
        </div>
      </div>
    );
  }

  if (cohorts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 max-w-md">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-600 dark:text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No cohorts found</h3>
          <p className="text-gray-600 dark:text-gray-400">You are not part of any cohort yet. Join one to start collaborating!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedCohort && (
                <>
               
                  <div>
                    {/* Cohort name with dropdown for admins */}
                    {isAdmin ? (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setShowCohortDropdown(!showCohortDropdown)}
                          className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-lg transition-colors"
                        >
                          {selectedCohort.name}
                          <ChevronDown className={`w-5 h-5 transition-transform ${showCohortDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showCohortDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                            <div className="py-1">
                              {cohorts.map(cohort => (
                                <button
                                  key={cohort._id}
                                  onClick={() => {
                                    setSelectedCohort(cohort);
                                    setShowCohortDropdown(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 ${
                                    selectedCohort._id === cohort._id ? 'bg-gray-100 dark:bg-gray-700' : ''
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    {cohort.icon || '💻'}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{cohort.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{cohort.memberCount} members</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCohort.name}</h1>
                    )}
                    <div className="flex items-center gap-4 text-sm mt-1">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        {selectedCohort.memberCount} members
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4" />
                        {posts.length} posts
                      </span>
                      {isAdmin && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                          Admin View
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Create Post */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={currentUser?.avatar || ""}
                alt={currentUser?.name || ""}
              />
              <AvatarFallback>
                {currentUser?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your progress, ask questions, or help your cohort..."
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none resize-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
              />
              
              {/* Image Preview */}
              {previewImage && (
                <div className="mt-3 relative w-full">
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-lg"
                    width={200}
                    height={100}
                  />
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <button 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="w-5 h-5" />
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || createLoading}
                  className="px-6 py-2.5 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        {postsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 animate-pulse"
              >
                <div className="flex space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/6"></div>
                    <div className="space-y-2 mt-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : postsError ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error loading posts</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Please try again later.</p>
            <button
              onClick={() => refetchPosts()}
              className="px-4 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map(post => {
              const reacted = hasReacted(post);
              const isReactingThisPost = reactingPostId === post._id;

              return (
                <article
                  key={post._id}
                  className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <AvatarImage
                        src={post.author.avatar || ""}
                        alt={post.author.name || ""}
                      />
                      <AvatarFallback>
                        {post.author.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="font-bold text-black dark:text-white text-sm sm:text-base">
                            {post.author.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            @{post.author.userName}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            ·
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {formatRelativeTime(post.createdAt)}
                          </span>
                        </div>
                        
                        {/* Only show menu for post author or admin */}
                        {(post.author._id === currentUser?._id || isAdmin) && (
                          <div className="relative group">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                              {post.author._id === currentUser?._id && (
                                <button 
                                  onClick={() => startEdit(post)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeletePost(post._id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      {editingPost === post._id ? (
                        <div className="space-y-3 mt-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows={3}
                          />
                          
                          {/* Edit Image Preview */}
                          {(editPreviewImage || post.imageUrl) && (
                            <div className="relative w-full ">
                              <Image 
                                src={(editPreviewImage || post.imageUrl) as string} 
                                alt="Preview" 
                                className="w-full h-full object-cover rounded-lg"
                                width={200}
                                height={100}
                              />
                              <button 
                                onClick={() => {
                                  setEditSelectedFile(null);
                                  setEditPreviewImage(null);
                                  if (editFileInputRef.current) {
                                    editFileInputRef.current.value = '';
                                  }
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => editFileInputRef.current?.click()}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                            >
                              <ImagePlus className="w-5 h-5" />
                            </button>
                            <input 
                              ref={editFileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleEditFileChange}
                            />
                            <button
                              onClick={() => handleUpdatePost(post._id)}
                              disabled={!editContent.trim() || updateLoading}
                              className="px-4 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                            >
                              {updateLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save'
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setEditingPost(null);
                                setEditContent('');
                                setEditSelectedFile(null);
                                setEditPreviewImage(null);
                              }}
                              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-2 text-black dark:text-white text-sm sm:text-base break-words whitespace-pre-wrap">
                            {post.content}
                          </div>
                          
                          {/* Display image if available */}
                          {post.imageUrl && (
                            <div className="mt-3 rounded-lg overflow-hidden max-w-md">
                              <Image
                                src={post.imageUrl}
                                alt="Post image"
                                className="w-full h-auto object-cover"
                                width={500}
                                height={300}
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => toggleReaction(post._id)}
                          className={`flex items-center gap-1 sm:gap-2 transition-colors ${
                            reacted ? "text-red-500" : "hover:text-red-500"
                          }`}
                          disabled={isReactingThisPost}
                        >
                          <Heart
                            className={`w-4 h-4 ${reacted ? "fill-current" : ""}`}
                          />
                          <span className="text-xs sm:text-sm">
                            {post.reactions.length}
                          </span>
                        </button>
                        
                        <button 
                          onClick={() => setReplyingTo(replyingTo === post._id ? null : post._id)}
                          className="flex items-center gap-1 sm:gap-2 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">
                            {post.replies.length}
                          </span>
                        </button>
                      </div>

                      {/* Replies */}
                      {post.replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {post.replies.map(reply => {
                            // const replyReacted = hasReacted(post, reply._id);
                            // const isReactingThisReply = reactingPostId === reply._id;

                            return (
                              <div key={reply._id} className="flex gap-3">
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarImage
                                    src={reply.author.avatar || ""}
                                    alt={reply.author.name || ""}
                                  />
                                  <AvatarFallback>
                                    {reply.author.name
                                      ?.split(" ")
                                      .map((n: string) => n[0])
                                      .join("") || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="font-medium text-sm text-gray-900 dark:text-white">{reply.author.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeTime(reply.createdAt)}</div>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{reply.content}</p>
                                  {/* <button 
                                    onClick={() => toggleReaction(post._id, reply._id)}
                                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all ${
                                      replyReacted
                                        ? 'text-red-500'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                                    }`}
                                    disabled={isReactingThisReply}
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${replyReacted ? 'fill-current' : ''}`} />
                                    {reply.reactions.length > 0 && <span>{reply.reactions.length}</span>}
                                  </button> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Reply Input */}
                      {replyingTo === post._id && (
                        <div className="mt-4 flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={currentUser?.avatar || ""}
                              alt={currentUser?.name || ""}
                            />
                            <AvatarFallback>
                              {currentUser?.name
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("") || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddReply(post._id)}
                            />
                            <button
                              onClick={() => handleAddReply(post._id)}
                              disabled={!replyContent.trim()}
                              className="px-4 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!postsLoading && posts.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Be the first to share something with your cohort!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortPage;