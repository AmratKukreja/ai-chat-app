import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

