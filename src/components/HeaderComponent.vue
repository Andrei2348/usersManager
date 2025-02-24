<template>
  <div class="users-page__header">
    <h1 class="users-page__title">Учетные записи</h1>
    <button 
      class="users-page__button" 
      @click="addUserHandler" 
      :disabled="!userStore.getUserValidateFlag">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const emit = defineEmits(['addUser'])

const addUserHandler = () => {
  userStore.saveNewUser()
  emit('addUser') 
}
</script>

<style lang="scss" scoped>
.users-page{
  &__header{
    display: flex;
    margin-top: 70px;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }
  &__title{
    @include heading(18px);
    color: $black;
  }
  &__button{
    @include addUserButton;
    font-size: 30px;
    color: $black;
  }
}
</style>
