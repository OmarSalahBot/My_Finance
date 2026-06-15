import { ArrowDown } from "lucide-react";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useEffect } from "react";

export default function InComeCard() {

    const { totals , getMonthlySummary } = useTransactionStore();
    useEffect(()=>{
      getMonthlySummary();
    },[]);
  

  return (
    <div className=" p-6 bg-emerald-50  border dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/20 rounded-2xl shadow-sm flex items-center gap-6 transition-colors duration-300">
      
      {/* الجزء الشمال: لوجو المحفظة مع الخلفية المدوّرة الناعمة */}
      <div className="p-5 bg-emerald-500  dark:bg-emerald-950/50 rounded-2xl text-white dark:text-emerald-400 flex items-center justify-center shadow-inner">
        <ArrowDown className="w-8 h-8" strokeWidth={2.5} />
      </div>

      {/* الجزء اليمين: النصوص والأرقام */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          Total Income 
        </span>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-500 tracking-tight">
            { totals?.[0]?.totalIncome || 0 }
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
            EGP
          </span>
        </div>

        {/* المؤشر السفلي (Updated just now) */}
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
            This Month
          </span>
        </div>
      </div>

    </div>
  );
}