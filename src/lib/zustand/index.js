import { create } from 'zustand'

 export const useAppStore = create((set) => {
    return {
        filter: '',
        themes: ["default", "rose", "blue", "green", 'violet', "orange", 'yellow'],
        setFilter(value) {
            return set(() =>{
         return {filter: value }
    })
}
}
})
