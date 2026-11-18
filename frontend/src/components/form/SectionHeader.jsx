const SectionHeader = ({ title, description, action }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {description && <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeader;
