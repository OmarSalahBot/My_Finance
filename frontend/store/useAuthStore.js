import { create } from "zustand";
import { api } from '../lib/axios'

export const useAuthStore = create( (set , get) =>({
    user:null,
    isCheckingAuth: true,
    errorMessage:"",
    isLoggingIn: false,
    openLogout: false,



    setUser: (user) => set({ user }),
    setOpenLogout: (open) => set({ openLogout: open }),


    authCheck: async () => {
        try{
            const res = await api.get('/auth/check');
            set({ user : res.data });
        }catch(err){
            console.log(err);
            set({ user : null });
        }finally{
            set({ isCheckingAuth: false });
        }
    },

    login: async(data)=> {
        try{
            const res = await api.post('/auth/login',data);
            set({ user : res.data })
        }catch(err){
            set({user:null})
            set({ errorMessage : err.response?.data?.message || "Something went wrong" })
        }finally{
            set({ isLoggingIn: false })
        }
    },

    signup: async(data)=> {
        try{
            const res = await api.post('/auth/signup',data);
            set({ user : res.data })
        }catch(err){
            console.log(err);
            set({user:null})
            set({ errorMessage : err.response?.data?.message || "Something went wrong" })
        }finally{
            set({ isLoggingIn: false })
        }
    },
    logout: async()=> {
        try{
            await api.post('/auth/logout');
            set({ user : null })
        }catch(err){
            console.log(err);
        }finally{
            set({ isLoggingIn: false })
        }
    }

}));