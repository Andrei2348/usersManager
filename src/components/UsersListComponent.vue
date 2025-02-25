<template>
  <div class="users-list">
    <div class="users-list__container" v-if="userStore.getUsersList.length > 0">
      <div class="users-list__header">
        <p class="users-list__header--content">Метки</p>
        <p class="users-list__header--content">Тип записи</p>
        <p class="users-list__header--content">Логин</p>
        <p class="users-list__header--content">Пароль</p>
      </div>
      <UserAreaComponent   
        v-for="(user, index) in userStore.getUsersList"   
        :key="user.id"   
        :user="user" 
        :index="index"
        @deleteUser="deleteUser"  
      />  
    </div>
    <div class="users-list__empty" v-if="userStore.getUsersList.length === 0">
      Список пользователей пока пуст!
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAreaComponent from '@/components/UserAreaComponent.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const deleteUser = (id: number) => {
  userStore.deleteUserfromList(id)
}
</script>

<style lang="scss" scoped>
  .users-list{
    margin-top: 40px;
    overflow-y: auto;
    min-height: calc(100vh - 200px);
    &__container{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__empty{
      @include textMedium(22);
      margin-bottom: 20px;
      &--area{
        margin-top: 10px;
      }
    }
    &__header{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 50px;
      gap: 10px;
      &--content{
        @include textRegular(16px);
        color: $darkGray;
      }
    }
  }
</style>
