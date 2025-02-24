<template>
  <div class="users-list">
    <div class="users-list__header" v-if="userStore.getEmptyAreaVisible">
      <p class="users-list__header--content">Метки</p>
      <p class="users-list__header--content">Тип записи</p>
      <p class="users-list__header--content">Логин</p>
      <p class="users-list__header--content">Пароль</p>
    </div>
    <div class="users-list__container" v-if="userStore.getUsersList.length > 0">
      <UserAreaComponent   
      v-for="user in userStore.getUsersList"   
      :key="user.id"   
      :user="user" 
      @deleteExistingUser="deleteExistingUser"  
      />  
    </div>
    <div class="users-list__empty" v-if="userStore.getUsersList.length === 0 && !userStore.getEmptyAreaVisible">
      Список пользователей пока пуст!
    </div>
    <UserAreaComponent 
      class="users-list__empty--area"
      v-if="userStore.getEmptyAreaVisible"
      :user="EMPTY_USER" 
      @deleteUser="hideEmtyUserArea" />
  </div>
</template>

<script setup lang="ts">
import UserAreaComponent from '@/components/UserAreaComponent.vue'
import { useUserStore } from '@/stores/user'
import { EMPTY_USER } from '@/config/user'
const userStore = useUserStore()

const hideEmtyUserArea = () => {
  userStore.setEmptyAreaVisible(false)
}

const deleteExistingUser = (id: number) => {
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
