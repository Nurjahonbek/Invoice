import { create } from 'zustand'

 export const useAppStore = create((set) => {
    return {
        filter: '',
        invoices: [],
        themes: ["default", "rose", "blue", "green", 'violet', "orange", 'yellow'],
        items: [],
        sheetOpen: false,
        editedData: null,

        setEditedData(editedData) {
            return set(() => {
                return {editedData}
            })
          },
        setSheetOpen() {
            return set((state) => ({ sheetOpen: !state.sheetOpen }))
          },

        updateInvoice(newData) {
            return set((state) =>{
            const mapped = state.invoices.map((el) => {
                if(el.id === newData.id){
                    return newData
                }
                else{
                    return el
                }
            })
         return {invoices: mapped }
    })
    },
    setInvoices(invoices) {
        return set(() => ({ invoices }))
      },

        setFilter(value) {
            return set(() =>{
         return {filter: value }
    })
    },
        setitems(items) {
            return set(() =>{
         return {items }
    })
    }
}
})
