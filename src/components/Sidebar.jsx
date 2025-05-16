import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from 'react'
import logo from '../../public/logo.svg'
import { Button } from './ui/button'
import { useAppStore } from '../lib/zustand'
import ThemesToggle from './ThemesToggle'
import oval from '../../public/oval.svg'
import  Form  from "./Form"

function Sidebar() {
  const {setSheetOpen, sheetOpen, editedData} = useAppStore()

  return (
    <div className='bg-[#373B53] flex md:flex-col md:h-full md:z-[999] md:fixed md:left-0 md:top-0 md:w-[90px] md:bottom-0 items-center justify-between '>
        <img className="h-[90px] w-[90px] " src={logo} />
      <div className='mr-6 max-sm:mr-0 md:flex-col max-sm:py-2 max-sm:flex-col md:mr-0 flex  items-center md:mb-5'>
        <ThemesToggle/>
      <Avatar className='max-sm:ml-40 max-sm:mt-2'>
      <AvatarImage src={oval} />
      <AvatarFallback>CN</AvatarFallback>
     </Avatar>
      </div>
      <Sheet open={sheetOpen} onOpenChange = {setSheetOpen} >
        <SheetContent className="ml-[72px] max-md:ml-0 max-md:max-w-[100%-90px] max-sm:ml-0 max-sm:min-w-[100%] min-w-[calc(70%-12px)] min-sm:overflow-x-hidden min-h-[calc(100%-56px)] overflow-y-scroll"  side="left">
          <SheetHeader className='sticky top-0 w-full bg-white border-b'>
            <SheetTitle className='text-[#0C0E16] text-2xl font-bold ml-7'>New Invoice</SheetTitle>
            <Form setSheetOpen = {setSheetOpen} info={editedData}/>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      </div>
  )
}

export default Sidebar
