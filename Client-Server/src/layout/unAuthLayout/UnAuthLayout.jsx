import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/Navbar/Navbar'

const UnAuthLayout = () => {
  return (
    <>
      
       <div className="flex flex-col h-screen ">

      <div >
      <Navbar />
      </div>
      

      
      <div className='min-h-[80vh]'>
      <Outlet  />
      </div>

        
     
      </div>
    </>
  )
}

export default UnAuthLayout
