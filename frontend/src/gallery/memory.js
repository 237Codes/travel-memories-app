import {create} from "zustand"

export const useMemoryGallery = create((set) => ({ 
   memories: [],
   setMemories: (memories) => set({memories}),
   createMemory: async(newMemory) => {
      if (!newMemory.location || !newMemory.image || newMemory.month) {
         return {success:false, message: "Please fill in all fields."};
      }
      const res = await fetch("/api/memories")
   }
   
}));