import { create } from 'zustand';

export const useAppStore = create((set) => ({
  filter: '',
  invoices: [],
  themes: ["default", "rose", "blue", "green", "violet", "orange", "yellow"],
  items: [],
  sheetOpen: false,
  editedData: null,
  totalAmountDue: 0,
  total: 0,


  setEditedData: (editedData) => set({ editedData }),

  setTotalAmountDue: (amount) => set({ totalAmountDue: amount }),

  setSheetOpen: () => set((state) => ({ sheetOpen: !state.sheetOpen })),

  updateInvoice: (newData) =>
    set((state) => ({
      invoices: state.invoices.map((el) =>
        el.id === newData.id ? newData : el
      ),
    })),

  setInvoices: (invoices) => set({ invoices }),

  setFilter: (value) => set({ filter: value }),

  setItems: (items) => set({ items }),
}));
