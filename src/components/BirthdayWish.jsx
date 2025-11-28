import React from 'react'
import background from '../assets/images/background.jpg'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { birthdayStatus, UserName } from '../store/atoms/main'
export default function BirthdayWish() {
    const currentstatus = useRecoilValue(birthdayStatus)
    return (
        <div className=' w-full h-[100vh] flex justify-center items-center'>
            <div className='w-full h-[100vh] blur-md absolute' style={{ backgroundImage: `url(${background})` }}>
            </div>
            {currentstatus === "Input_Card" && <InputRender />}
            {currentstatus === "Card1" && <Card1 />}
            
        </div>
    )
}

function InputRender(){
    const setName = useSetRecoilState(UserName)
    const setBirthdayStatus = useSetRecoilState(birthdayStatus)
    return <div className='
    z-1 flex justify-center items-center flex-col gap-7 bg-white p-10 px-20 w-[30vw] rounded-2xl opacity-60
    '>
        <h1 className='font-bold text-4xl text-blue-700'>Enter Your Name</h1>
        <input type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Your Name' className='w-full h-10 px-5 outline-0 border-1 rounded-2xl border-blue-700'/>
        <button 
        onClick={()=>{
            setBirthdayStatus("Card1")
        }}
        className='cursor-pointer bg-blue-800 text-white py-3 px-10 rounded-2xl font-bold text-xl hover:bg-blue-950'>Done</button>
    </div>
}

function Card1(){
    
}