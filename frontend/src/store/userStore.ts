import { create } from 'zustand'

const mockUser = {
  name: "Jan Kowalski",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jan",
  isLoggedIn: true,
  savedHotels: [2, 5] as number[]
}


export const useUser = create(() => ({
  ...mockUser
}))