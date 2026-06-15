import { ArrowUp } from "lucide-react";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useEffect } from "react";


export default function ExpensesCard() {

  const { totals , getMonthlySummary } = useTransactionStore();
  useEffect(()=>{
    getMonthlySummary();
  },[]);



  return (
    <div className=" p-6 bg-red-50  border dark:bg-red-900/10 border-red-200 dark:border-red-800/20 rounded-2xl shadow-sm flex items-center gap-6 transition-colors duration-300">
      
      {/* الجزء الشمال: لوجو المحفظة مع الخلفية المدوّرة الناعمة */}
      <div className="p-5 bg-red-500  dark:bg-red-950/50 rounded-2xl text-white dark:text-red-500 flex items-center justify-center shadow-inner">
        <ArrowUp className="w-8 h-8" strokeWidth={2.5} />
      </div>

      {/* الجزء اليمين: النصوص والأرقام */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          Total Expenses
        </span>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-red-600 dark:text-red-500 tracking-tight">
            { totals?.[0]?.totalExpense || 0 }
          </span>
          <span className="text-xl font-bold text-red-600 dark:text-red-500">
            EGP
          </span>
        </div>

        {/* المؤشر السفلي (Updated just now) */}
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
            This Month
          </span>
        </div>
      </div>

    </div>
  );
}