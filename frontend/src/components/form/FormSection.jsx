const FormSection = ({ children, className = "" }) => (
  <section className={`border-t border-gray-100 py-6 first:border-t-0 first:pt-0 ${className}`}>
    {children}
  </section>
);

export default FormSection;
