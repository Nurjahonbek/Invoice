import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import React from 'react'
import logo from '../../public/logo.svg'
import { Button } from './ui/button'
import { useAppStore } from '../lib/zustand'
import ThemesToggle from './ThemesToggle'
import oval from '../../public/oval.svg'

function Sidebar() {

  return (
    <div className='bg-[#373B53] flex md:flex-col md:h-full md:z-[999] md:fixed md:left-0 md:top-0 md:w-[90px] md:bottom-0 items-center justify-between '>
        <img className="h-[90px] w-[90px] " src={logo} />
      <div className='mr-6 md:flex-col md:mr-0 flex items-center md:mb-5'>
        <ThemesToggle/>
      <Avatar>
      <AvatarImage src={oval} />
      <AvatarFallback>CN</AvatarFallback>
     </Avatar>
      </div>
    </div>
  )
}

export default Sidebar
