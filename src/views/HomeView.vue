<template>
  <MainLayout>
    <div class="container">
      <div class="users-page">
        <HeaderComponent />
        <UsersListComponent />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import UsersListComponent from '@/components/UsersListComponent.vue'
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import { getUsersListFromLocalStorage } from '@/helpers/localStorageHelpers'

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.setUsersList(getUsersListFromLocalStorage())
})
</script>

<style lang="scss" scoped>
.users-page {
  display: flex;
  flex-direction: column;
}
</style>
