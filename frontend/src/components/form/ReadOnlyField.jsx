import {
  User,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  FileText,
  Package,
  Boxes,
  HeartHandshake,
  Target,
  ClipboardList,
  Sparkles,
} from "lucide-react";

const ReadOnlyField = ({
  label,
  value = "Waiting for AI...",
  multiline = false,
}) => {

  const getIcon = () => {
    switch (label) {
      case "HCP Name":
        return <User size={18} className="text-blue-600" />;

      case "Interaction Type":
        return <HeartHandshake size={18} className="text-green-600" />;

      case "Date":
        return <Calendar size={18} className="text-orange-500" />;

      case "Time":
        return <Clock size={18} className="text-purple-600" />;

      case "Attendees":
        return <Users size={18} className="text-indigo-600" />;

      case "Topics Discussed":
        return <MessageSquare size={18} className="text-blue-500" />;

      case "Voice Note Summary":
        return <FileText size={18} className="text-gray-600" />;

      case "Materials Shared":
        return <Package size={18} className="text-emerald-600" />;

      case "Samples Distributed":
        return <Boxes size={18} className="text-yellow-600" />;

      case "Observed HCP Sentiment":
        return <HeartHandshake size={18} className="text-pink-600" />;

      case "Outcomes":
        return <Target size={18} className="text-red-500" />;

      case "Follow-up Actions":
        return <ClipboardList size={18} className="text-cyan-600" />;

      case "AI Suggested Follow-ups":
        return <Sparkles size={18} className="text-violet-600" />;

      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  const isWaiting = value === "Waiting for AI...";

  const sentimentColor = () => {
    if (!value) return "";

    const text = value.toLowerCase();

    if (text.includes("positive"))
      return "text-green-700 bg-green-100";

    if (text.includes("negative"))
      return "text-red-700 bg-red-100";

    if (text.includes("neutral"))
      return "text-yellow-700 bg-yellow-100";

    return "";
  };

  return (
    <div className="mb-4">

      {/* Label */}
      <div className="flex items-center gap-2 mb-2">

        {getIcon()}

        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>

      </div>

      {/* Field */}
      {multiline ? (
        <div
          className={`min-h-[92px] rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm leading-6 transition hover:border-slate-300 ${
            isWaiting ? "text-slate-400 italic" : "text-slate-700"
          }`}
        >
          {value}
        </div>
      ) : (
        <div
          className={`min-h-[48px] rounded-xl border border-slate-200 bg-slate-50/60 px-4 flex items-center text-sm transition hover:border-slate-300 ${
            label === "Observed HCP Sentiment"
              ? sentimentColor()
              : isWaiting
              ? "text-slate-400 italic"
              : "text-slate-700"
          }`}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default ReadOnlyField;
