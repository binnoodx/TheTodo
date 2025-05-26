import React from 'react'
import { useRef, useState } from 'react'
import "./Navbar.css"

const Navbar = () => {
  

  return (
    <div className='mainContainer h-[10vh]  bg-slate-500 gap-5 flex flex-row justify-evenly items-center text-2xl text-white '>
      <div className='title max-sm:text-[20px]'>TheTodo - Manage Your Work</div>
      <div className='button flex gap-2 items-center mt-2'>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm max-sm:px-2 max-sm: px-5 py-2.5 text-center me-2 mb-2"><a className="text" target='_blank' href='https://www.instagram.com/the_binodd/'>Creator</a></button>
    
      </div>
      
    </div>
    
  )
}

export default Navbar