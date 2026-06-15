import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2, ChevronDown, ListFilter } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';


export default function RecentTransactions() {
  const { getTransaction , transactions , deleteTransaction  , getMonthlySummary , getLast7DaysExpenses } = useTransactionStore();
  useEffect(()=>{
    getTransaction();
  },[])

  const handleDelete = async (id) =>{
    await deleteTransaction(id);
    await getTransaction();
    await getMonthlySummary();
    await getLast7DaysExpenses();
  }


  if(transactions?.length <= 0 ) return null
  

  return (
    // Card Wrapper: Handles dark background and borders seamlessly
    <div className="mb-10 mt-6 mx-8 bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 transition-colors duration-200">
      
      {/* Component Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
            <ListFilter size={18} className="stroke-[2.5]" />
            
          </div>
          <h2 className="text-slate-900 dark:text-zinc-100 font-bold text-base">Recent Transactions</h2>
        </div>
        {/* <button className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/60 dark:border-zinc-800 rounded-lg px-3 py-1.5 transition-colors">
          View All
        </button> */}
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 font-medium text-xs tracking-wider">
              <th className="pb-3 font-semibold pl-2">Type</th>
              <th className="pb-3 font-semibold">Description</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold text-right pr-4">Action</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-900/50">
            {transactions?.map((tx) => {
              const isIncome = tx.type === 'income';


              const formatted = new Date(tx.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

              
              return (
                <tr key={tx.id} className="group hover:bg-slate-50/40 dark:hover:bg-zinc-900/30 transition-colors">
                  {/* Column 1: Type with Badge */}
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${
                        isIncome 
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400'
                      }`}>
                        {isIncome ? <ArrowDownLeft size={14} className="stroke-[3]" /> : <ArrowUpRight size={14} className="stroke-[3]" />}
                      </div>
                      <span className={`text-xs font-bold ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                        {tx.type}
                      </span>
                    </div>
                  </td>

                  {/* Column 2: Description */}
                  <td className="py-3.5 text-sm font-medium text-slate-700 dark:text-zinc-300">
                    {tx.description}
                  </td>

                  {/* Column 3: Amount */}
                  <td className={`py-3.5 text-sm font-bold ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    {isIncome ? `+${tx.amount.toLocaleString()} EGP` : `-${tx.amount.toLocaleString()} EGP`}
                  </td>

                  {/* Column 4: Date */}
                  <td className="py-3.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                    {formatted}
                  </td>

                  {/* Column 5: Action (Delete button) */}
                  <td className="py-3.5 text-right pr-4">
                    <button 
                      className="p-1.5 text-slate-400 dark:text-zinc-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-100 dark:border-zinc-800/80 rounded-lg transition-all"
                      aria-label="Delete transaction"
                      onClick={() => handleDelete(tx._id)}
                    >
                      <Trash2 size={14} className="stroke-[2.2]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      

    </div>
  );
}