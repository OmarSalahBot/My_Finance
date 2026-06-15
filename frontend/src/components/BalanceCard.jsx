import { Wallet } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';

export default function BalanceCard() {

  const { user } = useAuthStore();

  return (
    <div className=" p-6 bg-blue-50  border dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/20 rounded-2xl shadow-sm flex items-center gap-6 transition-colors duration-300">
      
      {/* الجزء الشمال: لوجو المحفظة مع الخلفية المدوّرة الناعمة */}
      <div className="p-5 bg-blue-500  dark:bg-blue-950/50 rounded-2xl text-white dark:text-blue-400 flex items-center justify-center shadow-inner">
        <Wallet className="w-8 h-8" strokeWidth={2.5} />
      </div>

      {/* الجزء اليمين: النصوص والأرقام */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          Current Balance
        </span>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tight">
            {user?.balance}
          </span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
            EGP
          </span>
        </div>

        {/* المؤشر السفلي (Updated just now) */}
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
            Live
          </span>
        </div>
      </div>

    </div>
  );
}