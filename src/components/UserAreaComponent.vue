<template>
  <div class="users-area">
    <InputComponent 
      placeholder="Метки"
      type="text"
      v-model:value="tagInput" 
    />
    <DropdownComponent 
      :options='DROPDOWN_VALUES'
      @select='selectNoteType'
      :initialValue="getInitialDropdownValue()"
    />
    <InputComponent 
      placeholder="Логин"
      type="text"
      v-model:value="newUser.login"
      :required="true"
    />
    <InputComponent v-if="selectedOption === 'local' && newUser.password !== null"
      placeholder="Пароль"
      type="password"
      v-model:value="newUser.password"
      autocomplete='new-password'
      :required="selectedOption === 'local'"
    />
    <button class="users-area__button" @click="deleteUserHandler">
      <SvgIcon icon="trash" class="users-area__button--icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import DropdownComponent from '@/components/DropdownComponent.vue'
import { DROPDOWN_VALUES } from '@/config/user'
import { validateUserData } from '@/helpers/validateUserData'
import { useUserStore } from '@/stores/user'
import { findUserWithMaxId } from '@/helpers/setIdForUser'
import type { OptionsDropdown } from '@/types/common'
import type { User } from '@/types/user'


const userStore = useUserStore()

const props = defineProps<{  
  user: User
}>() 

const emit = defineEmits(['deleteUser', 'deleteExistingUser'])

const selectedOption = ref<string>('local')
const newUser = reactive<User>({ ...props.user })

const selectNoteType = (option: OptionsDropdown | null) => {
  if(option){
    selectedOption.value = option.name
  }
}

const deleteUserHandler = () => {
  if(props.user.id){
    emit('deleteExistingUser', props.user.id)
  } else {
    emit('deleteUser')
  }
}

const getInitialDropdownValue = () => {  
  const dropdownValue = DROPDOWN_VALUES.find(option => option.name === newUser.noteType) 
  return dropdownValue ? dropdownValue : DROPDOWN_VALUES[0] 
}  

const tagInput = computed({  
  get: () => newUser.tags.join('; '), 
  set: (value: string) => {   
    newUser.tags = value.split(';').map(tag => tag.trim()).filter(tag => tag !== "")  
  }  
})  

const saveUser = (user: User) => {
  const validateFlag = validateUserData(user)
  userStore.setUserValidateFlag(validateFlag)
  if(validateFlag){
    userStore.setNewUser(newUser)
  }
}

watch(newUser, saveUser, { deep: true })

watch(() => props.user, (newVal) => {  
  console.log('watch', newVal);  
  Object.assign(newUser, newVal);  
});

watch(selectedOption, (newValue) => {  
  if (newValue === 'LDAP') {  
    newUser.password = null  
  } else {
    newUser.password = ''
  }
})  

onBeforeMount(() => {
  const newId = findUserWithMaxId(userStore.usersList)?.id || 0
  if (!newUser.id) {
    newUser.id = newId + 1
  }
})

</script>

<style lang="scss" scoped>
.users-area{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 50px;
  gap: 10px;
  &__button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
