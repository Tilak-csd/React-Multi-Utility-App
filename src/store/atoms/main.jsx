
import { useEffect } from 'react'
import { atom, selector } from 'recoil' 
export const NumWords = atom({
    key : "NumWords",
    default : 0
})

export const phonenumber = atom({
    key : "phonenumber",
    default : 0
})

export const OTPQuery = selector({
    key : "OTPQuery",
    get  : ({get}) =>{
        const phoneNumber = get(phonenumber)
        const OTPNumber = Math.floor(Math.random() * 10000)
        if (!phoneNumber) return null;
        return OTPNumber 
    }
})