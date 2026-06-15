import React from 'react';

export default function Loading() {

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm dark:bg-black/50 transition-all duration-300">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/90 dark:bg-zinc-950 shadow-2xl border border-slate-200/50 dark:border-zinc-800 min-w-[180px]">
        
        {/* الـ Spinner الأنيميتد الـ Tailwind الصافي */}
        <svg 
          className="animate-spin h-10 w-10 text-red-500 dark:text-red-400" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>

        {/* النص المصاحب للودنج */}
        <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
          Deleting Transaction...
        </span>
      </div>
    </div>
  );
}