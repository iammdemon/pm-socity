"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react"; // or @radix-ui/react-icons
import { useAskTPMSAIMutation } from "../redux/services/aiApi";


interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const [askTPMSAI, { isLoading }] = useAskTPMSAIMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await askTPMSAI({ question: input }).unwrap();

      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        text: res.answer || "Sorry, I didn't get that.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        console.log(error)
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        text: "Error communicating with AI server.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">TPMS AI Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 border rounded-md p-4 bg-white shadow-md">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Ask me anything about TPMS Coaching!</p>
        )}
        {messages.map(({ id, text, sender }) => (
          <div
            key={id}
            className={`flex ${
              sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap ${
                sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center space-x-2">
        <textarea
          rows={1}
          className="flex-1 resize-none rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || input.trim().length === 0}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
