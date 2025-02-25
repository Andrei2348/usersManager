export interface User{
  id?: number
  tags: Tag[]
  noteType: Notes
  login: string
  password: string | null
}

interface Tag{
  text: string
}

export type Notes = 'local' | 'LDAP'