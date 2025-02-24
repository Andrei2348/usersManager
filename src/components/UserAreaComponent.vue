<template>
  <div class="users-area">
    <InputComponent 
      placeholder="Метки"
      name="tags"
    />
    <DropdownComponent />
    <InputComponent 
      placeholder="Логин"
      name="login"
    />
    <InputComponent 
      placeholder="Пароль"
      name="password"
    />
    <button class="users-area__button">
      <SvgIcon icon="trash" class="users-area__button--icon" /></button>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import DropdownComponent from '@/components/DropdownComponent.vue'



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
