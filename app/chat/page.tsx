"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/provider";
import { createClient } from "@/lib/supabase/client";
import { MessageBubble } from "@/components/chat/message-bubble";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ModelSelector } from "@/components/chat/model-selector";
import { ChatInput } from "@/components/chat/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [user, setUser] = useState<any>(null);

  // Fetch user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    };
    getUser();
  }, [router, supabase.auth]);

  // Fetch models
  const { data: models = [], isLoading: modelsLoading } =
    trpc.models.getAvailable.useQuery(undefined, {
      enabled: !!user,
    });

  // Set default model when models load
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].tag);
    }
  }, [models, selectedModel]);

  // Fetch chat history
  const {
    data: messages = [],
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = trpc.chat.history.useQuery(
    { modelTag: selectedModel },
    {
      enabled: !!user && !!selectedModel,
    }
  );

  // Send message mutation
  const sendMutation = trpc.chat.send.useMutation({
    onSuccess: () => {
      refetchMessages();
    },
  });

  // Delete message mutation
  const deleteMutation = trpc.chat.deleteMessage.useMutation({
    onSuccess: () => {
      refetchMessages();
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMutation.isPending]);

  const handleSendMessage = (content: string) => {
    if (!selectedModel) {
      alert("Please select a model first");
      return;
    }
    sendMutation.mutate({
      modelTag: selectedModel,
      prompt: content,
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMutation.mutate({ messageId });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <h1 className="text-xl font-bold">AI Chat</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-5xl w-full mx-auto">
        {/* Model Selector */}
        <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
          {modelsLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          ) : (
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="space-y-4">
            {messagesLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500 dark:text-gray-400">Loading messages...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a conversation with {selectedModel}
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onDelete={handleDeleteMessage}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
                {sendMutation.isPending && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6 dark:border-gray-700 dark:bg-gray-800">
          {sendMutation.isError && (
            <div className="mb-3 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              Error: {sendMutation.error.message}
            </div>
          )}
          <ChatInput
            onSend={handleSendMessage}
            disabled={sendMutation.isPending || !selectedModel}
            placeholder={
              selectedModel
                ? "Type your message..."
                : "Select a model to start chatting"
            }
          />
        </div>
      </div>
    </div>
  );
}

