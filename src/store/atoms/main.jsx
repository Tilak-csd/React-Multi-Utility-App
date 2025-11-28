import { atom, selector } from 'recoil' 
export const NumWords = atom({
    key : "NumWords",
    default : 0
})

export const phonenumber = atom({
    key : "phonenumber",
    default : null
})

export const OTPAtom = atom({
    key : "OTPAtom",
    default : null
})

export const CurrentStatus = atom({
    key : "CurrentStatus",
    default : "Phone_Card"
})

export const UserName = atom({
    key : "UserName",
    default : null
})

export const birthdayStatus = atom({
    key : "birthdayStatus",
    default : "Input_Card"
})