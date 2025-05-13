import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Sidebar/>
      <main className='md:pl-8'>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout
