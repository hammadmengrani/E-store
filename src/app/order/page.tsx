import CartDetail from '@/components/common/CartDetail'
import Order from '@/components/common/Order'
import React from 'react'

const page = () => {
  return (
    <div className='container mx-auto flex md:flex-row justify-center items-center flex-col-reverse px-5 py-5'>
        <Order/>
        <CartDetail order={true}/>
    </div>
  )
}

export default page