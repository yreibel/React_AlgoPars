import { create } from 'zustand'

export const useVariablesValueStore = create((set) => ({
  list_variables_value: [],
  setVariablesValue: (list_variables_value) => {

    set((state) => ({ list_variables_value : list_variables_value}));

  },

}))