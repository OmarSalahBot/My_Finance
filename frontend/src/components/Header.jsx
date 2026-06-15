import { Wallet, Moon, Sun, ChevronDown , UserRound } from "lucide-react";
import { useTheme } from 'next-themes';
import { useAuthStore } from "../../store/useAuthStore";
import Logout from "./Logout";


export default function Header() {
  const { theme, setTheme } = useTheme();


  const { user , setOpenLogout , openLogout  } = useAuthStore();
  


  return (
    <header className="w-full max-w-12/12 mx-auto px-5 sticky -top-4 z-50   pt-4">
      <div className="flex items-center justify-between py-4  px-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-sm transition-colors duration-300">
        
        {/* الجزء الشمال: اللوجو والاسم */}
        <div className="flex items-center gap-3">
          <div className="p-2  rounded-x  text-slate-700  dark:text-white">
            <Wallet  className="w-9 h-9 "  />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-zinc-50 tracking-tight">
            My Finance
          </span>
        </div>

        {/* الجزء اليمين: زرار الدارك مود والبروفايل */}
        <div className="flex items-center gap-4">
          
          {/* زرار الدارك مود (نفس شكل الصورة المدوّر الشفاف) */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-full  dark:bg-stale bg-slate-50 bg- hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 " strokeWidth={2.5} />
            ) : (
              <Moon className="w-6 h-6 " strokeWidth={2.5} />
            )}
          </button>

          {/* خط فاصل خفيف بين الزرار والبروفايل */}
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-zinc-700"></div>

          {/* الصورة الشخصية أو الأفتار الافتراضي */}
            <div className="w-12 h-12  rounded-full bg-slate-50  dark:bg-zinc-800  dark:text-zinc-300 text-slate-700 flex items-center justify-center ">
              <UserRound  strokeWidth={2.5}  />
            </div>

          

          {/* قائمة المستخدم (Profile Dropdown) */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setOpenLogout(!openLogout)}>
            
            
            {/* الاسم والسهم */}
            <span className="text-sm  text-gray-800 dark:text-zinc-50 font-bold  group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {user?.username}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors"  />
          </div>
            {openLogout && <Logout />}
        </div>

      </div>
    </header>
  );
}