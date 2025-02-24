<template>
  <MainLayout>
    <div class="container">
      <div class="users-page">
        <HeaderComponent @addUser="addUserHandler"/>
        <UsersListComponent />
      </div>

    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import UsersListComponent from '@/components/UsersListComponent.vue'

const addUserHandler = () => {
  console.log('add user')
}

</script>

<style lang="scss" scoped>
.users-page {
  display: flex;
  flex-direction: column;
}
</style>
