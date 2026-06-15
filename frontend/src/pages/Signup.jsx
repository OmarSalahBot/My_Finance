import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { signup } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic التسجيل
    signup({ username: name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-zinc-950 px-4 transition-colors duration-300 relative">
      
      {/* زر تحويل الـ Mode */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0909] text-[#475569] dark:text-[#a3a3a3] hover:bg-[#f1f5f9] dark:hover:bg-[#121212] transition-all"
          aria-label="Toggle Mode"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.58-1.58M17.66 6.34l1.58-1.58M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
            </svg>
          )}
        </button>
      )}

      {/* صندوق الفورم */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-[#e2e8f0] dark:border-[#1a1a1a] rounded-2xl p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
                        <Wallet  className="w-9 h-9 "  />
            <span className="text-xl font-bold text-[#0f172a] dark:text-white">My Finance</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white mt-2">Create an account</h2>
          <p className="text-sm text-[#64748b] dark:text-[#a3a3a3] mt-1">Start managing your personal finance today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#334155] dark:text-[#cbd5e1] mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Steve"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-[#cbd5e1] dark:border-zinc-800 rounded-xl text-[#0f172a] dark:text-white placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155] dark:text-[#cbd5e1] mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-[#cbd5e1] dark:border-zinc-800 rounded-xl text-[#0f172a] dark:text-white placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155] dark:text-[#cbd5e1] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-[#cbd5e1] dark:border-zinc-800 rounded-xl text-[#0f172a] dark:text-white placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 dark:focus:ring-offset-[#0a0909] text-sm"
          >
            Get Started
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#64748b] dark:text-[#a3a3a3] mt-6">
          Already have an account?{" "}
          <Link to={'/login'} className="font-semibold text-[#2563eb] dark:text-[#3b82f6] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}