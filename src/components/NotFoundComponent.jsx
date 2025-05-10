import React from 'react'
import empty from '../../public/empty.svg'
function NotFoundComponent() {
  return (
    <div className='flex flex-col items-center text-card '>
        <img src={empty} width={241} height={200} />
      <h1 className='mb-10 text'>There is nothing here</h1>
      <p>  Create an invoice by clicking the New Invoice button and get started</p>

    </div>
  )
}

export default NotFoundComponent
