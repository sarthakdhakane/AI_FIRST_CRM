import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Bot, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../services/chatService";
import {
  updateField,
  updateInteraction,
} from "../../redux/slices/interactionSlice";

const ChatPanel = () => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ FIXED useEffect (do not return a value)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: text,
      },
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(text);

      let message = "";

      if (response.operation === "edit") {
        dispatch(
          updateField({
            field: response.field,
            value: response.value,
          })
        );

        message = `✓ ${response.field} updated successfully.`;
      } else if (response.operation === "search") {
        const results = response.results || [];

        message = `Previous Interactions with ${response.hcpName}

${
  results.length
    ? results
        .map(
          (item, index) => `Interaction ${index + 1}
Doctor: ${item.hcpName || response.hcpName}
Date: ${item.date || "Not Available"}
Interaction Type: ${item.interactionType || "Meeting"}
Topic: ${item.topic || "Not Available"}
Materials Shared: ${item.materialsShared || "None"}
Sentiment: ${item.sentiment || "Not Available"}
Outcome: ${item.outcome || "Not Available"}`
        )
        .join("\n\n")
    : "No previous interactions found."
}`;
      } else if (response.operation === "summary") {
        message = `Interaction Summary\n\n${response.summary}`;
      } else if (response.operation === "followup") {
        message = `Suggested Follow-up Actions

${
  response.followUps?.length
    ? response.followUps
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n")
    : "No follow-up suggestions available."
}`;
      } else {
        dispatch(updateInteraction(response));

        message =
          "✓ Interaction extracted successfully.\n\nThe HCP Interaction Form has been updated automatically.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "Unable to contact the AI service. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-[560px] flex-col bg-white">
      <div className="border-b border-gray-100 bg-white px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-200">
              <Bot className="text-white" size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                AI Assistant
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Log interaction via chat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            <Sparkles size={14} />
            Ready
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50/70 p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            message={message.message}
          />
        ))}

        {loading && (
          <div className="mt-4 flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <div>
              <p className="font-medium text-blue-700">
                AI is processing...
              </p>

              <p className="text-sm text-gray-500">
                Detecting intent • Extracting details • Updating CRM
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-100 bg-white p-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPanel;
