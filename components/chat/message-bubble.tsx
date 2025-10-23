import { Message } from "@/types/database";
import { cn } from "@/lib/utils";
import { Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: Message;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function MessageBubble({ message, onDelete, isDeleting }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const date = new Date(message.created_at);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
          isUser ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2 break-words",
            isUser
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{timeString}</span>
          {isUser && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(message.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

