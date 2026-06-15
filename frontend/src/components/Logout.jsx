import React from 'react'
import { useAuthStore } from '../../store/useAuthStore';


export default function Logout() {
    const { logout } = useAuthStore();
  return (
    <div className="absolute right-5 top-19 mt-2 w-42 rounded-br-xl rounded-bl-xl bg-white dark:bg-zinc-950 border-b border-x border-gray-100 dark:border-zinc-800/80 shadow-lg p-1.5 z-50">
  

  {/* زرار الـ Logout الأساسي */}
  <button 
    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
    onClick={logout}
  >
    <svg className="w-6 h-6 text-red-500 dark:text-red-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    <span className='text-lg'  > Logout </span>
  </button>

</div>
  )
}
