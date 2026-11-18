import { useDispatch, useSelector } from "react-redux";
import { Mic, Plus, Sparkles } from "lucide-react";
import { updateField } from "../../redux/slices/interactionSlice";
import FormSection from "./FormSection";
import InputField from "./InputField";
import SectionHeader from "./SectionHeader";

const InteractionForm = () => {
  const interaction = useSelector((state) => state.interaction);
  const dispatch = useDispatch();
  const setField = (field) => (event) => dispatch(updateField({ field, value: event.target.value }));
  const suggestions = Array.isArray(interaction.aiSuggestedFollowUps)
    ? interaction.aiSuggestedFollowUps
    : interaction.aiSuggestedFollowUps
      ? interaction.aiSuggestedFollowUps.split(/\n|(?=\d+\.\s)/).filter(Boolean)
    : ["Schedule a follow-up discussion within the next two weeks.", "Share the requested clinical evidence by email."];

  return (
    <form className="p-5 sm:p-7 lg:p-8" onSubmit={(event) => event.preventDefault()}>
      <div className="mb-7 flex flex-col gap-2 border-b border-gray-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Log HCP Interaction</h1>
          <p className="mt-1.5 text-sm text-gray-500">Capture the details of your healthcare professional interaction.</p>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Draft</span>
      </div>

      <FormSection>
        <SectionHeader title="Interaction details" description="Add the essential information about this conversation." />
        <div className="grid gap-5 md:grid-cols-2">
          <InputField label="HCP Search" type="select" value={interaction.hcpName} onChange={setField("hcpName")} placeholder="Search or select HCP" options={["Dr. Sarah Mitchell", "Dr. James Wilson", "Dr. Priya Shah"]} />
          <InputField label="Interaction Type" type="select" value={interaction.interactionType} onChange={setField("interactionType")} placeholder="Select interaction type" options={["In-person meeting", "Virtual meeting", "Phone call", "Conference"]} />
          <InputField label="Date" value={interaction.interactionDate} onChange={setField("interactionDate")} placeholder="e.g. 15 July 2026" />
          <InputField label="Time" value={interaction.interactionTime} onChange={setField("interactionTime")} placeholder="e.g. 10:30 AM" />
          <InputField label="Attendees" value={interaction.attendees} onChange={setField("attendees")} placeholder="Add attendees" className="md:col-span-2" />
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader title="Discussion" />
        <InputField label="Topics Discussed" type="textarea" rows={4} value={interaction.topicsDiscussed} onChange={setField("topicsDiscussed")} placeholder="Describe the key topics discussed..." />
        <InputField label="Voice Summary" type="textarea" rows={3} value={interaction.voiceSummary} onChange={setField("voiceSummary")} placeholder="AI-generated summary of the discussion..." className="mt-5" />
        <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
          <Mic size={16} /> Summarize from Voice Note
        </button>
      </FormSection>

      <FormSection>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <SectionHeader title="Materials Shared" />
            <InputField label="Materials" value={interaction.materialsShared} onChange={setField("materialsShared")} placeholder="e.g. Product brochure" />
          </div>
          <div>
            <SectionHeader title="Samples Distributed" />
            <InputField label="Samples" value={interaction.samplesDistributed} onChange={setField("samplesDistributed")} placeholder="e.g. 2 sample packs" />
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader title="HCP Sentiment" description="How did the HCP respond to the interaction?" />
        <div className="flex flex-wrap gap-3">
          {["Positive", "Neutral", "Negative"].map((option) => (
            <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${interaction.sentiment === option ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
              <input type="radio" name="sentiment" value={option} checked={interaction.sentiment === option} onChange={setField("sentiment")} className="accent-blue-600" />
              {option}
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection>
        <div className="grid gap-5 md:grid-cols-2">
          <InputField label="Outcomes" type="textarea" rows={4} value={interaction.outcomes} onChange={setField("outcomes")} placeholder="Record any outcomes or commitments..." />
          <InputField label="Follow-up Actions" type="textarea" rows={4} value={interaction.followUpActions} onChange={setField("followUpActions")} placeholder="Add follow-up actions..." />
        </div>
      </FormSection>

      <FormSection className="pb-0">
        <SectionHeader title="AI Suggested Follow-ups" description="Recommendations based on this interaction." action={<Sparkles size={18} className="text-blue-600" />} />
        <ul className="space-y-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
          {suggestions.map((suggestion, index) => <li key={index} className="flex gap-3 text-sm leading-5 text-gray-700"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-600 shadow-sm">{index + 1}</span>{suggestion}</li>)}
        </ul>
        <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"><Plus size={16} /> Add follow-up action</button>
      </FormSection>
    </form>
  );
};

export default InteractionForm;
