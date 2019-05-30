import ajax from '@/utils/ajax'
import EnvironmentModule from '@/store/modules/environment'

const sfApiUrl = EnvironmentModule.sfApiUrl

export async function getAllAccountsFromApi() {
  return await ajax.json(`${sfApiUrl}/api/accounts`, { method: 'GET' })
}

export async function getAccountFromApi(sfid: string) {
  return await ajax.json(`${sfApiUrl}/api/account/${sfid}`, {
    method: 'GET',
  })
}

export async function getAllAccountContactsFromApi(accountid: string) {
  return await ajax.json(`${sfApiUrl}/api/account/${accountid}/contacts`, {
    method: 'GET',
  })
}
