import React from 'react'
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import InComeCard from '../components/InComeCard';
import ExpensesCard from '../components/ExpensesCard';
import AddTransactionForm from '../components/AddTransactionForm';
import Chart from '../components/Chart';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import RecentTransactions from '../components/RecentTransactions';
import { useTransactionStore } from '../../store/useTransactionStore';
import Loading from '../components/Loading';

export default function dashboard() {

  const { isDeleting } = useTransactionStore();

  const { user } = useAuthStore();


  return (
    <div className='w-full min-h-screen @container relative bg-gray-50 dark:bg-zinc-950'>
        {isDeleting ? <Loading /> : null}
        <Header/>
        { /* Money Cards  */}
        <div className='w-full mx-auto  grid @max-[950px]:grid-cols-1  grid-cols-3 px-8 mt-6 gap-4 flex-wrap'>
            <BalanceCard/>
            <InComeCard/>
            <ExpensesCard/>
        </div>

        {/* Transaction Form */ }
        <AddTransactionForm/>

        {/*  Chart */ }
        <Chart/>

        {/* Recent Transactions */ }
        <RecentTransactions/>
        
    </div>
  )
}
