import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getsetPage } from '../store/atomstore'
import { memo } from 'react'
import purple from '../assets/images/purple.png'
import red from '../assets/images/red.png'
import green from '../assets/images/green.png'
import blue from '../assets/images/blue.png'

const Sidebar=memo(function Sidebar() {
    const setCurrent=useSetRecoilState(getsetPage)
    console.log("current " )
    const changePage=(page)=>{
        setCurrent(page)
    }
  return (
    <div className='  p-1 h-full w-44  '>
        <div className='  flex flex-col gap-12  text-center h-full'>
          <div onClick={()=>{changePage(0)}} className= 'shadow-sm flex items-center  mt-8 bg-blue-50 hover:bg-blue-200 cursor-pointer p-2 rounded-md'>
            <img className='w-10 mr-2' src={purple} alt="purple" /> <span>work</span>
          </div>
          

          <div onClick={()=>{changePage(1)}} className='flex shadow-sm bg-blue-50 items-center hover:bg-blue-200 cursor-pointer p-2 rounded-md' >
          <img className='w-10 mr-2' src={red} alt="red" /> <span>study</span>
          </div>

          <div onClick={()=>{changePage(2)}} className='shadow-sm flex  bg-blue-50 items-center hover:bg-blue-200 cursor-pointer p-2 rounded-md'>
          <img className='w-10 mr-2' src={green} alt="green" /> <span>self</span>
          </div>

          <div onClick={()=>{changePage(3)}} className='shadow-sm flex bg-blue-50 items-center hover:bg-blue-200 cursor-pointer p-2 rounded-md'>
          <img className='w-10 mr-2' src={blue} alt="blue" /> <span>other</span>
          </div>
          
        </div >
       

    </div>
     

   
  )
})

export default Sidebar