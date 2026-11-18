const InputField = ({ label, value, onChange, type = "text", placeholder, options = [], className = "", rows = 4 }) => {
  const sharedClass = "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100";
  const selectOptions = value && !options.includes(value) ? [value, ...options] : options;

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      {type === "textarea" ? (
        <textarea rows={rows} value={value || ""} onChange={onChange} placeholder={placeholder} className={`${sharedClass} resize-y leading-6`} />
      ) : type === "select" ? (
        <select value={value || ""} onChange={onChange} className={sharedClass}>
          <option value="">{placeholder || `Select ${label}`}</option>
          {selectOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} value={value || ""} onChange={onChange} placeholder={placeholder} className={sharedClass} />
      )}
    </label>
  );
};

export default InputField;
