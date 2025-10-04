"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, Send, MessageSquare, Trash2, Menu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActive: number;
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load sessions
  useEffect(() => {
    const stored = sessionStorage.getItem("tpms_chat_sessions");
    if (stored) {
      const parsed: ChatSession[] = JSON.parse(stored);
      const validSessions = parsed.filter(s => s.lastActive > Date.now() - 30 * 24 * 60 * 60 * 1000);
      setSessions(validSessions);
      if (validSessions.length > 0) setCurrentSessionId(validSessions[0].id);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tpms_chat_sessions", JSON.stringify(sessions));
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastActive: Date.now(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const deleteSession = (id: string) => {
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (currentSessionId === id) setCurrentSessionId(filtered[0]?.id || "");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    let sessionId = currentSessionId;

    if (!sessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: input.slice(0, 50),
        messages: [],
        lastActive: Date.now(),
      };
      setSessions([newSession]);
      sessionId = newSession.id;
      setCurrentSessionId(sessionId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: Date.now(),
    };

    const userInput = input;
    setInput("");

    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? {
              ...s,
              messages: [...s.messages, userMessage],
              lastActive: Date.now(),
              title: s.messages.length === 0 ? userInput.slice(0, 50) : s.title,
            }
          : s
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });
      const data = await response.json();
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        text: data.answer || "Sorry, I didn't get that.",
        sender: "ai",
        timestamp: Date.now(),
      };
      setSessions(prev =>
        prev.map(s =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, aiMessage], lastActive: Date.now() }
            : s
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        text: "Error communicating with AI server. Please try again.",
        sender: "ai",
        timestamp: Date.now(),
      };
      console.error(error);
      setSessions(prev =>
        prev.map(s => (s.id === sessionId ? { ...s, messages: [...s.messages, errorMessage] } : s))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <span className="font-bold text-lg">Chats</span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={createNewSession}
            className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {sessions.map(session => (
            <div
              key={session.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors truncate ${
                session.id === currentSessionId ? "bg-gray-800 font-semibold" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setCurrentSessionId(session.id);
                setSidebarOpen(false);
              }}
            >
              <div className="flex-1 truncate text-sm">{session.title}</div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-400">Chat history stored for 30 days</div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Chat */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 flex items-center justify-between shadow sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">SIA - Your Society Intelligent Assistant</h1>
            <p className="text-sm text-gray-500">Ask anything about PMP & project management</p>
          </div>
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col space-y-4">
          {(!currentSession || currentSession.messages.length === 0) && (
            <div className="text-center py-12 flex-1 flex flex-col justify-center items-center text-gray-500">
              <MessageSquare className="w-16 h-16 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
              <p className="max-w-xs">Ask about PMP certification, project management, or TPMS coaching programs</p>
            </div>
          )}

          {currentSession?.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm max-w-full  break-words prose prose-sm sm:prose md:prose-base transition-all ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white animate-fade-in prose-invert"
                    : "bg-white text-gray-800 border border-gray-200 animate-fade-in"
                }`}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-2 animate-pulse">
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                <span className="text-gray-500">SIA is typing...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-4 py-4 flex-shrink-0">
          <div className="flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 p-2 w-full">
            <textarea
              ref={textareaRef}
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none px-3 py-2 max-h-32 overflow-y-auto"
              placeholder="Message SIA..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">Press Enter to send, Shift + Enter for new line</p>
        </div>
      </main>
    </div>
  );
}
