<template>
  <div class="users-area">
    <InputComponent 
      placeholder="Метки"
      name="tags"
      v-model:value="newUser.tags" 
    />
    <DropdownComponent 
      :options='DROPDOWN_VALUES'
      @select='selectNoteType'
      :initialValue="DROPDOWN_VALUES[0]"
    />
    <InputComponent 
      placeholder="Логин"
      name="login"
      v-model:value="newUser.login"
    />
    <InputComponent v-if="selectedOption === 'local'"
      placeholder="Пароль"
      name="password"
      v-model="newUser.password"
    />
    <button class="users-area__button">
      <SvgIcon icon="trash" class="users-area__button--icon" /></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import DropdownComponent from '@/components/DropdownComponent.vue'
import { DROPDOWN_VALUES } from '@/config/user'
import { EMPTY_USER } from '@/config/user'
import type { OptionsDropdown } from '@/types/common'
import type { User } from '@/types/user'

const selectedOption = ref<string>('local')
const newUser = ref<User>({...EMPTY_USER})

const selectNoteType = (option: OptionsDropdown | null) => {
  if(option){
    selectedOption.value = option.name
  }
}

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
