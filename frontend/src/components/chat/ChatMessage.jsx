import { Bot, UserRound } from "lucide-react";

const ChatMessage = ({ message, sender }) => {
  const isUser = sender === "user";

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-end gap-2.5 mb-5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
          <Bot size={20} className="text-white" />
        </div>
      )}

      {/* Message */}
      <div className="max-w-[78%]">

        <p
          className={`text-[11px] font-semibold mb-1 ${
            isUser ? "text-right text-slate-500" : "text-slate-500"
          }`}
        >
          {isUser ? "You" : "AI Assistant"}
        </p>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm whitespace-pre-wrap break-words transition-all ${
            isUser
            ? "bg-blue-600 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
          }`}
        >
          {message}
        </div>

        <p
          className={`text-[10px] mt-1 text-slate-400 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {currentTime}
        </p>

      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center shadow-sm flex-shrink-0">
          <UserRound size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
