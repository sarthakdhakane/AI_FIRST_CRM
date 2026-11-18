import {
  Bell,
  CircleUserRound,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-4">

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-200">
            <Stethoscope className="text-white" size={23} />
          </div>

          <div>
            <h1 className="font-[Outfit] text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              AI-First CRM
            </h1>

            <p className="hidden sm:block text-xs text-slate-500">
              Healthcare Professional Interaction Management
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* AI Badge */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
            <ShieldCheck size={15} />
            AI workspace
          </div>

          {/* Notification */}
          <button className="relative h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">
            <Bell size={19} className="text-slate-700" />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-sm">
              SR
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Sales Representative
              </p>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CircleUserRound size={14} />
                Logged In
              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;
