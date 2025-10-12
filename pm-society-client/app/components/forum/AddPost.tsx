"use client";

import { useCreateForumTopicMutation } from "@/app/redux/services/forumApi";
import {  Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";


const AddPost = () => {
  const { data: session } = useSession();
  const [addForumTopic, { isLoading }] = useCreateForumTopicMutation();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleEmojiClick = (emoji: string) => {
    setText(prevText => prevText + emoji);
    setShowEmojiPicker(false);
  };

  const popularEmojis = ["😊", "👍", "❤️", "🎉", "🚀", "💡", "🔥", "💯", "👏", "🙌", "🤝"];

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex space-x-4">
          {/* User avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-white dark:ring-gray-700">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name || "Avatar"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <p className="font-semibold text-gray-900 dark:text-white">{user?.name || "Anonymous User"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.email?.split("@")[0] || "user"}</p>
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={user ? "Share your project management insights..." : "Login to post"}
                className={`w-full resize-none border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${isFocused ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
                rows={3}
                maxLength={maxLength}
                disabled={!user || isLoading}
                style={{ minHeight: "80px" }}
              />
              
              {/* Character count */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                {remaining}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-end mt-3">
              
              
              <button
                onClick={handlePost}
                disabled={text.trim() === "" || !user || isLoading}
                className={`px-6 py-2 rounded-full font-medium text-white transition-all duration-200 ${
                  text.trim() === "" || !user || isLoading
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Posting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-10">
          <div className="grid grid-cols-8 gap-2">
            {popularEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default AddPost;