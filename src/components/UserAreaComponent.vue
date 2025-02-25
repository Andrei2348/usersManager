<template>
  <div class="users-area" :class="{ldap: newUser.noteType !== 'local'}">
    <InputComponent 
      placeholder="Метки"
      type="text"
      v-model:value="tagInput" 
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <DropdownComponent 
      :options='DROPDOWN_VALUES'
      @select='selectNoteType'
      :initialValue="getInitialDropdownValue()"
      @focus="handleFocus"
    />
    <InputComponent 
      placeholder="Логин"
      type="text"
      v-model:value="newUser.login"
      :required="true"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <InputComponent v-if="newUser.noteType === 'local'"
      placeholder="Пароль"
      type="password"
      v-model:value="passwordValue" 
      autocomplete='new-password'
      :required="selectedOption === 'local'"
      @focus="handleFocus"
      @blur="handleBlur"
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
import { validateUserData, validateAllFlags } from '@/helpers/validateUserData'
import { useUserStore } from '@/stores/user'
import type { OptionsDropdown } from '@/types/common'
import type { User, Notes } from '@/types/user'

const props = defineProps<{  
  user: User,
  index: number
}>() 

const emit = defineEmits(['deleteUser'])

const userStore = useUserStore()
const selectedOption = ref<string>('local')
const newUser = reactive<User>({ ...props.user })

const passwordValue = computed({
  get() {
    return newUser.password ?? ''
  },
  set(value: string) {
    newUser.password = value || null
  }
})

const selectNoteType = (option: OptionsDropdown | null) => {
  if(option){
    selectedOption.value = option.name
    newUser.noteType = selectedOption.value as Notes
  }
}

const handleFocus = () => {
  userStore.setUserForEdit(newUser)
}

const handleBlur = () => {
  saveUser(newUser)
}

const deleteUserHandler = () => {
  userStore.removeValidateFlagByIndex(props.index)
  emit('deleteUser', props.user.id)
}

const getInitialDropdownValue = () => { 
  const dropdownValue = DROPDOWN_VALUES.find(option => option.name === newUser.noteType) 
  return dropdownValue ? dropdownValue : DROPDOWN_VALUES[0] 
}  

const tagInput = computed({  
  get: () => newUser.tags.map(tag => tag.text).join('; '), 
  set: (value: string) => {   
    newUser.tags = value.split(';').map(tag => ({ text: tag.trim() })).filter(tag => tag.text !== "")  
  }  
})

const saveUser = (user: User) => {
  startValidate(user)
  const allValid = validateAllFlags(userStore.getValidateFlags)
  if (allValid) {  
    userStore.saveNewUser() 
  } 
}

const startValidate = (user: User) => {
  const validateFlag = validateUserData(user)
  userStore.setValidateFlags(props.index, validateFlag) 
}

watch(() => newUser, (newValue) => {
  startValidate(newValue)
}, { deep: true })

watch(() => selectedOption.value, (newValue) => {  
  if (newValue === 'LDAP') {  
    newUser.password = null 
  } else {
    newUser.password = ''
  }
  startValidate(newUser)
  saveUser(newUser)
}, {deep: true})  

onBeforeMount(() => {
  const validateFlag = validateUserData(props.user)
  userStore.addValidateFlag(validateFlag)
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
.ldap{
  grid-template-columns: 1fr 1fr 2fr 50px;
}
</style>
