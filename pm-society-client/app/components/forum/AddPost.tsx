"use client";

import { useCreateForumTopicMutation } from "@/app/redux/services/forumApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const AddPost = () => {
  const { data: session } = useSession();
  const [addForumTopic, { isLoading }] = useCreateForumTopicMutation();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 280;
  const remaining = maxLength - text.length;
  const user = session?.user;

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
      await addForumTopic({ 
        content: text
      }).unwrap();
      
      setText("");
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex space-x-3">
          {/* User avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name || "Avatar"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={user ? "What do you want to talk about?" : "Sign in to post"}
              className="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-base leading-6"
              rows={2}
              maxLength={maxLength}
              disabled={!user || isLoading}
              style={{ minHeight: "60px" }}
            />
            
            {/* Action buttons - only show when focused or has text */}
            {(isFocused || text.length > 0) && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {remaining} characters remaining
                  </div>
                  
                  {/* Post button */}
                  <button
                    onClick={handlePost}
                    disabled={text.trim() === "" || !user || isLoading}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      text.trim() === "" || !user || isLoading
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-1">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Posting...</span>
                      </div>
                    ) : (
                      "Post"
                    )}
                  </button>
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