import ajax from '@/utils/ajax'
import EnvironmentModule from '@/store/modules/environment'

const sfApiUrl = EnvironmentModule.sfApiUrl

export async function getAllCasesFromApi() {
  return await ajax.json(`${sfApiUrl}/api/cases`, { method: 'GET' })
}

export async function getCaseFromApi(casenumber: string) {
  return await ajax.json(`${sfApiUrl}/api/case/${casenumber}`, {
    method: 'GET',
  })
}

export async function updateCaseFromApi(casenumber: string, caseData: object) {
  return await ajax.json(`${sfApiUrl}/api/case/${casenumber}`, {
    method: 'PUT',
    body: JSON.stringify(caseData),
  })
}
