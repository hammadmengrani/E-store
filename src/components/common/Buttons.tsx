import React from 'react'



const Buttons = () => {
  return (
    <div className='bottom-20 bg-[#059DDE] right-5 fixed  rounded-full z-10 p-5 flex items-center justify-center'>
        <div className='flex flex-row gap-2 items-center'>
        <a href={"/chat"}>
              <img src="/chat.svg" alt="" width={40} height={40} className='filter invert' />
            </a>
        </div>
    </div>
  )
}

export default Buttons