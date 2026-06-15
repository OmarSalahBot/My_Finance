import { create } from "zustand";
import { api } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useTransactionStore = create( ( set , get ) => ({
    totals:null ,
    chartData:null,
    transactions:null,
    isDeleting:false,


    getMonthlySummary: async() => {
        try{
            const res = await api.get('/transactions/monthly-summary');
            set({ totals : res.data });
        }catch(err){
            console.log(err);
        }
    },
    createTransaction: async(data) =>{
        try{
            const { setUser } = useAuthStore.getState();

            const res = await api.post('/transactions/create-transaction',data);
            setUser(res.data.finalUser);
        }catch(err){
            console.log(err)
        }
    },
    getLast7DaysExpenses: async() => {
        try{
            const res =  await api.get('/transactions/last-7-days-expenses');
            set({ chartData: res.data })
        }catch(err){
            console.log(err)
        }
    },
    getTransaction: async (page) => {
        try{
            const res = await api.get(`/transactions/getTransactions?page=${page}`);
            set({ transactions: res.data.transactions});

        }catch(err){
            console.log(err)
        }
    },
    deleteTransaction: async (id)=> {
        set({ isDeleting:true });
        try{
            const { setUser } = useAuthStore.getState();

            const res = await api.delete(`/transactions/delete/${id}`);
            setUser(res.data.finalUser);
        }catch(err){
            console.log(err);
        }finally{
            set({ isDeleting:false });
        }
    }

}));