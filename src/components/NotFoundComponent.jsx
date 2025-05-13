import React from 'react'
import empty from '../../public/empty.svg'
function NotFoundComponent() {
  return (
    <div className='flex flex-col items-center text-card '>
        <img src={empty} width={241} height={200} />
      <h1 className=' text-[#0C0E16] font-bold text-xl '>There is nothing here</h1>
      <p className='text-xs text-center mt-6 text-[#888EB0] font-bold'>  Create an invoice by clicking the <br /> New Invoice button and get started</p>

    </div>
  )
}

export default NotFoundComponent
