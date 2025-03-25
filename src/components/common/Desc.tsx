import React from 'react'

export interface myDesc{
    desc:string
}

const Desc = (props:myDesc) => {
  return (
    <div className='flex flex-col md:mx-12 p-5 gap-5'>
        <h3>DESCRIPTION</h3>
        <span>{props.desc}</span>
    </div>
  )
}

export default Desc