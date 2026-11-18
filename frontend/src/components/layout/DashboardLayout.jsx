const DashboardLayout = ({ left, right }) => {
  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f5f7fb]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 xl:items-start xl:gap-8">
          <section className="min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-3">
            {left}
          </section>
          <aside className="min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm xl:sticky xl:top-24 xl:col-span-1 xl:h-[calc(100vh-116px)] xl:min-h-[640px] xl:overflow-hidden">
            {right}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
