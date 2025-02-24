import type { User } from '@/types/user'
import type { OptionsDropdown } from '@/types/common'

export const EMPTY_USER: User = {
	"tags": "",
	"noteType": "local",
	"login": "",
	"password": null,
	
}

export const DROPDOWN_VALUES: OptionsDropdown[] = [
	{
		id: 1,
		name: 'local',
		label: 'Локальная'
	},
	{
		id: 2,
		name: 'LDAP',
		label: 'LDAP'
	}
]