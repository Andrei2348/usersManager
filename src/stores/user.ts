import { defineStore } from 'pinia'
import { ref } from 'vue'
import { EMPTY_USER } from '@/config/user'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const usersList: User[] = [
    {
      id: 1,
      tags: "tag1",
      noteType: "local",
      login: "user1",
      password: "12345"
    },
    {
      id: 2,
      tags: "tag2",
      noteType: "local",
      login: "user2",
      password: "678901"
    },
  ]

  const newUser = ref<User>({...EMPTY_USER})

  const setNewUserData = (payload: User) => {
    newUser.value = payload
  }
  

  return {
    usersList,
    newUser,
    setNewUserData
  }
})
