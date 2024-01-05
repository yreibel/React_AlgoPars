import { create } from 'zustand'

export const useVariablesStore = create((set) => ({
  list_variables: [],
  setTrackVariables: (list_variables) => {

    set((state) => ({ list_variables : list_variables}));

  },

}))