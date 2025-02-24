export interface User{
  id?: number
  tags: string
  noteType: Notes
  login: string
  password: string | null
  
}


export type Notes = 'local' | 'LDAP'