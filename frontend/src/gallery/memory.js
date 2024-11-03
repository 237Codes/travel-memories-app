import {create} from "zustand";

export const useMemoryGallery = create((set) => ({ 
   memories: [],
   setMemories: (memories) => set({memories}),

   createMemory: async (newMemory) => {
      if (!newMemory.location || !newMemory.image || !newMemory.month) {
         return {success:false, message: "Please fill in all fields."};
      }
      try {
         const res = await fetch("/api/memories", {
            method:"POST",
            headers: {
               "Content-Type": "application/json",
            },
            body:JSON.stringify(newMemory), 
         });
         const data = await res.json();
         set((state) => ({memories: [...state.memories, data.data] }));
         return {success:true, message: "Memory added successfully. "};
      } catch (error) {
         return {success:false, message: "Failed to add memory."};
      }
      // set((state) => ({memories: [...state.memories, data.data] }));
      // return {success:true, message: "Memory added successfully. "};
   },
   
   // create fetchMemories function to send request 
   fetchMemories: async () => {
		const res = await fetch("/api/memories");   // API endpoint appears inside the fetch
		const data = await res.json();
		set({ memories: data.data });
	},

   // create function to delete memories
   // pid refers tro me memory id from the database

   deleteMemory: async (pid) => {
		const res = await fetch(`/api/memories/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ memories: state.memories.filter((memory) => memory._id !== pid) }));
		return { success: true, message: data.message };
	},

   // Create functionto update memories

   updateMemory: async (pid, updatedMemory) => {
		const res = await fetch(`/api/memories/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedMemory),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			memories: state.memories.map((memory) => (memory._id === pid ? data.data : memory)),
		}));

		return { success: true, message: data.message };
	},

}));