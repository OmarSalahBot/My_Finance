import { useState } from "react";
import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";


export default function AddTransactionForm() {
  const { user } = useAuthStore();

  const { createTransaction , getMonthlySummary , getLast7DaysExpenses , getTransaction } = useTransactionStore();
  



  // State for transaction type (Default is "income")
  const [type, setTransactionType] = useState("income");


  
  // States for form inputs (To be used for submission later)
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const num = Number(amount);
    console.log({ type, num, description })
    await createTransaction({ type , amount:num, description });
    await getMonthlySummary();
    await getLast7DaysExpenses();
    await getTransaction();
  };

  return (
    <div className="mx-8 p-6 mt-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-sm transition-colors duration-300">
      
      {/* Header section with icon and title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-1.5 bg-blue-600 rounded-lg text-white flex items-center justify-center">
          <Plus className="w-4 h-4" strokeWidth={3} />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50">
          Add New Transaction
        </h2>
      </div>

      {/* Main Form - Layout handles column layout on mobile and row layout on large screens */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:items-end gap-5">
        
        {/* 1. Amount Input Field */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
            Amount
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 text-sm font-bold text-slate-400 dark:text-zinc-500 pointer-events-none">
              EGP
            </span>
          </div>
        </div>

        {/* 2. Type Selection (Income / Expense Buttons) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
            Type
          </label>
          <div className="flex gap-3">
            
            {/* Income Button */}
            <button
              type="button"
              onClick={() => setTransactionType("income")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all ${
                type === "income"
                  ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <div className={`p-1 rounded-full ${type === "income" ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-slate-100 dark:bg-zinc-800"}`}>
                <ArrowDownLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              Income
            </button>

            {/* Expense Button */}
            <button
              type="button"
              onClick={() => setTransactionType("expense")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all ${
                type === "expense"
                  ? "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <div className={`p-1 rounded-full ${type === "expense" ? "bg-rose-100 dark:bg-rose-900/40" : "bg-slate-100 dark:bg-zinc-800"}`}>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              Expense
            </button>

          </div>
        </div>

        {/* 3. Description Input Field */}
        <div className="flex-[2] flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description (e.g. Salary, Food, etc.)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* 4. Submit Button (Add Transaction) */}
        <button
          type="submit"
          className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Transaction
        </button>

      </form>
    </div>
  );
}