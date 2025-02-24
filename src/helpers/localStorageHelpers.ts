import type { User } from '@/types/user'

export const saveUsersListToLocalStorage = (usersList: User[]) => {
  localStorage.setItem('usersList', JSON.stringify(usersList))
}

export const getUsersListFromLocalStorage = (): User[] => {
  const usersList = localStorage.getItem('usersList');
  return usersList ? JSON.parse(usersList) as User[] : [];
}