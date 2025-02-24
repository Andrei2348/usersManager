import type { User } from '@/types/user'

export const findUserWithMaxId = (users: User[]): User | null => {
  if (users.length === 0) return null

  return users.reduce((maxUser, currentUser) => {
    return (currentUser.id !== undefined && currentUser.id > (maxUser.id ?? -Infinity)) ? currentUser : maxUser
  }, users[0])
}