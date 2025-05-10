import React from 'react'
import logo from '../../public/logo.svg'
import { Button } from './ui/button'
import { useAppStore } from '../lib/zustand'
import ThemesToggle from './ThemesToggle'

function Sidebar() {

  return (
    <div className='bg-[#373B53] '>
        <img src={logo} />
      <div>
        <ThemesToggle/>
      </div>
    </div>
  )
}

export default Sidebar
