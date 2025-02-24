import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { EMPTY_USER } from '@/config/user'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const usersList = ref<User[]>([
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
  ])

  const newUser = ref<User>({...EMPTY_USER})
  const emptyAreaVisible = ref(false)

  const setEmptyAreaVisible = (payload: boolean): void => {
    emptyAreaVisible.value = payload
  }

  const getEmptyAreaVisible = computed(() => {
    return emptyAreaVisible.value
  })

  const deleteUserfromList = (id: number) => {
    usersList.value = usersList.value.filter(user => user.id !== id);  
  }

  const setNewUserData = (payload: User) => {
    newUser.value = payload
  }
  

  return {
    usersList,
    newUser,
    setNewUserData,
    setEmptyAreaVisible,
    getEmptyAreaVisible,
    deleteUserfromList
  }
})
