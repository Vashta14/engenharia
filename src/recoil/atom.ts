import { atom } from 'recoil'

export const userSection = atom({
  key: "userSection",
  default: {
    userName: ""
  }
})
