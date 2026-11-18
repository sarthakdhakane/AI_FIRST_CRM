import { useState } from "react";
import { SendHorizontal } from "lucide-react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-1.5 focus-within:border-blue-400 focus-within:ring-3 focus-within:ring-blue-100">
      <textarea
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your HCP interaction..."
        className="
          flex-1
          resize-none
          rounded-lg
          border-0
          bg-white
          px-2.5
          py-2
          outline-none
          focus:ring-0
          transition
        "
      />

      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="
          h-10
          w-10
          rounded-lg
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-slate-300
          disabled:cursor-not-allowed
          text-white
          flex
          items-center
          justify-center
          shadow-sm
          transition
        "
      >
        <SendHorizontal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
