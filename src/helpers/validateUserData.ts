import type { User } from '@/types/user'

export const validateUserData = (user: User) => {
  const loginRegex = /^[a-zA-Zа-яА-Я0-9]{2,100}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const maxTagsLength = 50
  const maxFieldLength = 100

  const isLoginValid = loginRegex.test(user.login) && user.login.length <= maxFieldLength
  let isPasswordValid = (user.password === null || passwordRegex.test(user.password)) && (user.password === null || user.password.length <= maxFieldLength)
  const isTagsValid = user.tags === undefined || user.tags.length <= maxTagsLength

  if (user.noteType === 'local') {
    isPasswordValid = user.password !== null && user.password !== '' && passwordRegex.test(user.password) && user.password.length <= maxFieldLength
  }
  return isLoginValid && isPasswordValid && isTagsValid
}

export const validateAllFlags = (flags: boolean[]) => {
  return flags.every((flag: boolean) => flag === true)
}