import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { EMPTY_USER } from '@/config/user'
import _ from 'lodash'
import { saveUsersListToLocalStorage } from '@/helpers/localStorageHelpers'
import { setUserId } from '@/helpers/setIdForUser'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const usersList = ref<User[]>([])

  const userForEdit = ref<User>(_.cloneDeep(EMPTY_USER))

  const validateFlags = ref<boolean[]>([])

  const setValidateFlags = (index: number, payload: boolean) => {
    validateFlags.value[index] = payload
  }

  const addValidateFlag = (payload: boolean) => {
    validateFlags.value.push(payload)
    console.log(validateFlags.value)
  }

  const removeValidateFlagByIndex = (index: number) => {
    validateFlags.value.splice(index, 1)
  }

  const getValidateFlags = computed(() => {
    return  validateFlags.value
  })

  const addNewUser = () => {  
    usersList.value.push(_.cloneDeep(EMPTY_USER))
    const newUserId = setUserId(usersList.value) 
    if(newUserId){
      usersList.value[usersList.value.length - 1].id = newUserId + 1  
    } else {
      usersList.value[usersList.value.length - 1].id = 1
    } 
  }

  const setUsersList = (payload: User[]) => {
    usersList.value = payload
  }

  const getUsersList = computed(() => {
    return usersList.value
  })

  const saveNewUser = _.debounce(() => {  
    console.log('save') 
    const existingUserIndex = usersList.value.findIndex(user => user.id === userForEdit.value.id)  
    if(existingUserIndex !== -1) {  
      usersList.value[existingUserIndex] = _.cloneDeep(userForEdit.value)  
      saveUsersListToLocalStorage(usersList.value)   
    }  
  }, 300)
  
  const setUserForEdit = (payload: User) => {
    userForEdit.value = payload
  }

  const getUserForEdit = computed(() => {
    return userForEdit.value
  })

  const deleteUserfromList = (id: number) => {
    usersList.value = usersList.value.filter(user => user.id !== id)
    saveUsersListToLocalStorage(usersList.value)
  }

  return {
    addNewUser,
    usersList,
    userForEdit,
    deleteUserfromList,
    saveNewUser,
    setUserForEdit,
    getUserForEdit,
    setUsersList,
    getUsersList,
    setValidateFlags,
    addValidateFlag,
    getValidateFlags,
    removeValidateFlagByIndex
  }
})
