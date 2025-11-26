import React, { useState, useRef} from 'react'
import { OTPAtom, phonenumber, CurrentStatus } from '../store/atoms/main'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Rendering the Components and Card based on the currentstatus
export default function OTPLogin() {
    const currentStatusAtom = useRecoilValue(CurrentStatus)
    return (
        <div className='w-full flex justify-center items-center h-[100vh]'>
            {currentStatusAtom == "Phone_Card" && <PhoneCard />}
            {currentStatusAtom == "OTP_Card" && <OTPCard />}
            {currentStatusAtom == "Logged_In" && <Home /> }
        </div>
    )
}

// Phone Number enter and generating the OTP for that Phone Number.
function PhoneCard() {
    const [phoneNumber, setPhoneNumber] = useRecoilState(phonenumber)
    const setcurrentState = useSetRecoilState(CurrentStatus)
    const setOTP = useSetRecoilState(OTPAtom)

    // Generating the OTP when 'Send OTP' button clicked. 
    function handleOPT() {
        if (!phoneNumber) {
            console.log("Enter a phone number");
            return;
        }
        // create an opt taking random number and return the four digits OTP
        const newOTP = Math.floor(Math.random() * 10000)
        setOTP(newOTP)
        setcurrentState("OTP_Card")
        console.log(` OPT Generated for ${phoneNumber} : ${newOTP}`);
        alert(`Your OTP is ${newOTP}`)
    }


    return <div className="w-[25%] rounded-2xl 
  bg-[linear-gradient(315deg,#d9d9d9,#f8f8f8)]
  shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff]
  p-6 text-center flex justify-center items-center flex-col gap-2">
        {/* Title of the Card */}
        <h1 className='text-3xl font-medium'>Login Via OTP</h1>
        {/* Input to enter the Phone Number */}
        <input type="tel" placeholder='Phone Number' className='mt-5 border-[1px] border-black rounded-[4px] px-7 py-2 w-[75%]'
            onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {/* Button to create the OTP and send the OPT through alert */}
        <button className='border-[1px] border-black rounded-[4px] px-7 py-2 cursor-pointer hover:bg-black hover:text-white'
            onClick={handleOPT}
        >Send OTP</button>

    </div>
}

// Question 6 : OTP Number Insert
function OTPCard() {
    const setcurrentState = useSetRecoilState(CurrentStatus)
    const OTP = useRecoilValue(OTPAtom)
    const [otp_list, setOTP] = useState(["", "", "", ""])
    const inputs = useRef([])

    function handleChange(e, index) {
        const value = e.target.value
        if (/^\d?$/.test(value)) {
            const newOTP = [...otp_list]
            newOTP[index] = value
            setOTP(newOTP)

            if (value && index < 3) {
                inputs.current[index + 1].focus()
            }
        }

    }


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp_list[index] && index > 0) {
            inputs.current[index - 1].focus();
        }

    }

    // function to check wheather the OTP entered is correct or not and rendering `Home` component if correct.
    function CheckingOTP(){
        // convert the entered opt into number and joining the array
        const enteredOTP = parseInt(otp_list.join(""))
        if (enteredOTP === OTP){
            setcurrentState("Logged_In")
        }else {
            alert("Enter the Correct OPT code.")
            return;
        }
        console.log(enteredOTP);
        
    }


    return <div className="w-[25%] rounded-2xl 
  bg-[linear-gradient(315deg,#d9d9d9,#f8f8f8)]
  shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff]
  p-6 text-center flex justify-center items-center flex-col gap-2">
        {/* Onclick the Current status will be 'Phone_Card' where the Phone card will render */}
        <button className='border-black border-1 p-2 rounded-xl absolute top-2 left-2 cursor-pointer'
            onClick={() => {
                setcurrentState("Phone_Card")
            }}
        >Return</button>
        {/* Title of the Card */}
        <h1 className='text-3xl font-medium'>Login Via OTP</h1>

        {/* OTP Number Insertion */}
        <div className='flex justify-center items-center gap-2 mt-3'>
            {otp_list.map((digit, idx) => {
                return <input
                // save the each input box into ref array
                ref={(el) => (inputs.current[idx] = el) }
                    key={idx}
                    type="text"
                    // max length
                    maxLength={1}
                    value={digit}
                    // calling a function to move forward whenever a digit is inserted 
                    onChange={(e) => handleChange(e, idx)}
                    // calling the function to backspace, whenever the 'key:backspace' is clicked in keyboard 
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className='w-14 h-14 border border-gray-300 rounded-xl text-center text-xl font-semibold focus:outline-none focus:border-blue-500'
                />
            })}
        </div>
        {/* button to check to submit the entered OTP and check wheather the entered OTP matches the generated OTP  */}
        <button onClick={CheckingOTP}>Submit</button>


    </div>
}

// Render if the entered OTP code is correct and submitted.
function Home(){
    return <div>
        <h1 className='text-2xl text-gray-500'>You are logged In successfully.</h1>
    </div>
}