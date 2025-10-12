"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Send, Sparkles,  Copy,  RefreshCw, Bot, User, Check } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const WEBHOOK_URL = "https://n8n.thepmsociety.com/webhook/sia";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
 
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || !session?.user?.email || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input.trim();
    setInput("");
    setLoading(true);
   

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.user.email,
          message: userInput,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.output || "Sorry, I didn't understand that.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "⚠️ Sorry, there was an error contacting the AI server. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
     
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };


  const copyMessage = async (text: string, id: string) => {
    try {
      // Fallback for older browsers
      if (!navigator.clipboard) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const quickPrompts = [
    "What are the steps to get PMP certified?",
    "Tell me about the Elevate PMP Program.",
    "What do I get with a Society+ membership?",
    "Can you help me prepare for the PMP application?",
    "Do you offer coaching or mentoring?",
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome to SIA</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen md:mt-5 flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
     

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center text-center px-4">
                <div className="space-y-6 max-w-lg w-full">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <Sparkles className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      Hello! I&apos;m SIA
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Your intelligent assistant for The PM Society. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left group shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base">
                        {prompt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {messages.map((m) => (
                <article
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} px-1`}
                >
                  <div className={`flex items-end max-w-[85%] sm:max-w-[75%] ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.sender === "user" ? "ml-2 bg-blue-600" : "mr-2 bg-gradient-to-br from-purple-500 to-indigo-500"}`}>
                      {m.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`relative px-4 py-3 rounded-2xl shadow-md ${
                        m.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words pr-12 sm:pr-16">
                        {m.text}
                      </p>
                      <div className="absolute bottom-1 right-1 flex items-center space-x-1">
                        <time className="text-[10px] opacity-60">
                          {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </time>
                        <button
                          onClick={() => copyMessage(m.text, m.id)}
                          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                          aria-label="Copy message"
                        >
                          {copiedMessageId === m.id ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                      {copiedMessageId === m.id && (
                        <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              {loading && (
                <article className="flex justify-start px-1">
                  <div className="flex items-end max-w-[85%] sm:max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-2">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                </article>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="sticky bottom-0 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 resize-none outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Ask me anything..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 transition-all flex-shrink-0 transform hover:scale-105 active:scale-95 disabled:transform-none"
              aria-label="Send message"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </footer>
    </div>
  );
}