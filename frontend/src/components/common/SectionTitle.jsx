const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-7 border-b border-slate-100 pb-6">
      <h2 className="font-[Outfit] text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm leading-6 text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
