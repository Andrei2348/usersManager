<template>
  <div class="users-list">
    <div class="users-list__container" v-if="userStore.usersList.length > 0">
      <UserAreaComponent   
      v-for="user in userStore.usersList"   
      :key="user.id"   
      :user="user" 
      @deleteExistingUser="deleteExistingUser"  
      />  
    </div>
    <div class="users-list__empty" v-else>
      Список пользователей пока пуст!
    </div>
    <UserAreaComponent 
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
    &__container{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
