import type { User } from '@/types/user';  

export const setUserId = (users: User[]) => {  
  if (users.length === 0) {  
    return 1  
  }  

  const maxId = users.reduce((max, user) => {  
    if (user.id !== undefined) {  
      return user.id > max ? user.id : max
    }  
    return max
  }, -Infinity) 

  return maxId === -Infinity ? null : maxId
}