import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { EMPTY_USER } from '@/config/user'
import { saveUsersListToLocalStorage } from '@/helpers/localStorageHelpers'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const usersList = ref<User[]>([])

  const newUser = ref<User>({...EMPTY_USER})
  const emptyAreaVisible = ref(false)
  const userValidateFlag = ref(true)

  const setUsersList = (payload: User[]) => {
    usersList.value = payload
  }

  const getUsersList = computed(() => {
    return usersList.value
  })

  const setEmptyAreaVisible = (payload: boolean): void => {
    emptyAreaVisible.value = payload
    if(emptyAreaVisible.value){
      userValidateFlag.value = false
    } else {
      userValidateFlag.value = true
    }
  }

  const saveNewUser = () => {
    if (newUser.value.id) {
      const existingUserIndex = usersList.value.findIndex(user => user.id === newUser.value.id)
      if (existingUserIndex !== -1) {
        usersList.value[existingUserIndex] = newUser.value
      } else {
        usersList.value = [...usersList.value, newUser.value]
      }
      saveUsersListToLocalStorage(usersList.value)
    }
    newUser.value = { ...EMPTY_USER }
  }
  
  const setNewUser = (payload: User) => {
    newUser.value = payload
  }

  const setUserValidateFlag = (payload: boolean): void => {
    userValidateFlag.value = payload
  }

  const getEmptyAreaVisible = computed(() => {
    return emptyAreaVisible.value
  })

  const getUserValidateFlag = computed(() => {
    return userValidateFlag.value
  })

  const deleteUserfromList = (id: number) => {
    usersList.value = usersList.value.filter(user => user.id !== id)
    saveUsersListToLocalStorage(usersList.value)
  }

  return {
    usersList,
    newUser,
    setEmptyAreaVisible,
    getEmptyAreaVisible,
    deleteUserfromList,
    setUserValidateFlag,
    getUserValidateFlag,
    saveNewUser,
    setNewUser,
    setUsersList,
    getUsersList
  }
})
