<template>
  <form class="users-area">
    <InputComponent 
      placeholder="Метки"
      type="text"
      v-model:value="newUser.tags" 
    />
    <DropdownComponent 
      :options='DROPDOWN_VALUES'
      @select='selectNoteType'
      :initialValue="DROPDOWN_VALUES[0]"
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
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import DropdownComponent from '@/components/DropdownComponent.vue'
import { DROPDOWN_VALUES } from '@/config/user'
import type { OptionsDropdown } from '@/types/common'
import type { User } from '@/types/user'

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
</script>

<style lang="scss" scoped>
.users-area{
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  &__button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
