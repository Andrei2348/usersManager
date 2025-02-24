<template>
  <div class="users-list">
    <div class="users-list__empty">
      Список пользователей пока пуст!
    </div>
    <div class="users-list__container">
      
      <UserAreaComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAreaComponent from '@/components/UserAreaComponent.vue';



</script>

<style lang="scss" scoped>
  .users-list{
    &__container{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
