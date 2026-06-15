import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList  } from 'recharts';
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { useTransactionStore } from '../../store/useTransactionStore';
import { useTheme } from 'next-themes';



export default function Chart() {
    const { theme } = useTheme();
    const { chartData ,getLast7DaysExpenses  } = useTransactionStore();

    useEffect(()=>{
      getLast7DaysExpenses();
    },[])

    const formattedData = chartData?.map((item) => ({
  day: new Date(item._id).toLocaleDateString("en-US", {
    weekday: "short",
  }),
  amount: item.totalAmount,
}));

if(!chartData || chartData.length === 0) return null;


  return (
    <div className=" mt-6 mx-8 bg-white p-6 rounded-2xl border  dark:bg-zinc-950 dark:border-zinc-800 border-slate-100 shadow-sm">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-semibold text-lg"> <ChartNoAxesColumnIncreasing strokeWidth={5}  /> </span>
          <h3 className="text-slate-900 font-bold text-base dark:text-white ">Spending Over Last 7 Days</h3>
        </div>

      </div>

      {/* Chart Responsive Container */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          data={formattedData || []}
          margin={{ top: 30, right: 10, left: -20, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            tickLine={false}
            domain={[0, (dataMax) => dataMax * 1.05]}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}

          />

          <Bar
            dataKey="amount"
            fill="#F43F5E"
            radius={[6, 6, 0, 0]}
            barSize={50}
          >
            <LabelList
              dataKey="amount"
              position="top"
              fill={theme === 'light' ? '#0F172A' : '#FFFFFF'}
              fontSize={12}
              fontWeight={700}
              offset={10}
              formatter={(value) => `${value} EGP`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}