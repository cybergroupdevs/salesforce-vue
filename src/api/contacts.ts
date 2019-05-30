import ajax from '@/utils/ajax'
import EnvironmentModule from '@/store/modules/environment'

const sfApiUrl = EnvironmentModule.sfApiUrl

export async function getAllContactsFromApi() {
  return await ajax.json(`${sfApiUrl}/api/contacts`, { method: 'GET' })
}

export async function getContactFromApi(sfid: string) {
  return await ajax.json(`${sfApiUrl}/api/contact/${sfid}`, {
    method: 'GET',
  })
}
