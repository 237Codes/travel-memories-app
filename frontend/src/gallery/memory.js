import {create} from "zustand"

export const useMemoryGallery = create((set) => ({ 
   memories: [],
   setMemories: (memories) => set({memories}),
   createMemory: async(newMemory) => {
      if (!newMemory.location || !newMemory.image || newMemory.month) {
         return {success:false, message: "Please fill in all fields."};
      }
      const res = await fetch("/api/memories", {
         method:"POST",
         headers:{
            "Content-Type":"application/json",
         },
         body:JSON.stringify(newMemory) 
      })
      const data = await res.json()
      set((state) => ({memories:[...state.memories, data.data]}))
   }
   
}));