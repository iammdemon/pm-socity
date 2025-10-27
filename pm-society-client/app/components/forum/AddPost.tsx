"use client";

import { useGetMeQuery } from "@/app/redux/services/authApi";
import {
  useCreateForumTopicMutation,
  IForumTopic,
} from "@/app/redux/services/forumApi";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const AddPost = () => {
  const { data } = useGetMeQuery({});
  const [addForumTopic, { isLoading }] = useCreateForumTopicMutation();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = data?.data;
 

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!user) {
      toast.error("You must be logged in to post");
      return;
    }

    if (text.trim() === "") {
      toast.error("Post content cannot be empty");
      return;
    }

    try {
      // Create FormData to handle both text and file
      const formData = new FormData();
      formData.append("content", text);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await addForumTopic(formData as unknown as IForumTopic).unwrap();

      setText("");
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Post added successfully!");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add post. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handlePost();
    }
  };

  const handleCancel = () => {
    setText("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsFocused(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200">
      <div className="p-3 sm:p-4">
        <div className="flex space-x-2 sm:space-x-3">
          {/* User avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || "Avatar"}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Add your voice to The Exchange — shared wisdom elevates us all."
              className="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base leading-5 sm:leading-6"
              rows={2}
              disabled={!user || isLoading}
              style={{ minHeight: "50px" }}
            />

            {/* Image preview */}
            {imagePreview && (
              <div className="mt-3 relative">
                <div className="relative rounded-lg overflow-hidden w-full max-w-full sm:max-w-md">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons - only show when focused or has text */}
            {(isFocused || text.length > 0 || selectedImage) && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  {/* Image upload button */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Image
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePost}
                      disabled={text.trim() === "" || !user || isLoading}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        text.trim() === "" || !user || isLoading
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-black dark:bg-white  text-white dark:text-gray-900"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-1">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Posting...</span>
                        </div>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;