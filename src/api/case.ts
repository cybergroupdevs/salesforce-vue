import ajax from '@/utils/ajax'
import EnvironmentModule from '@/store/modules/environment'

const sfApiUrl = EnvironmentModule.sfApiUrl

export async function getAllCasesFromApi() {
  return await ajax.json(`${sfApiUrl}/api/cases`, { method: 'GET' })
}

export async function getCaseFromApi(id: string) {
  return await ajax.json(`${sfApiUrl}/api/case/${id}`, {
    method: 'GET',
  })
}

export async function updateCaseFromApi(id: string, caseData: object) {
  return await ajax.json(`${sfApiUrl}/api/case/${id}`, {
    method: 'PUT',
    body: JSON.stringify(caseData),
  })
}

export async function createCaseFromApi(caseData: object) {
  return await ajax.json(`${sfApiUrl}/api/cases`, {
    method: 'POST',
    body: JSON.stringify(caseData),
  })
}

export async function deleteCaseFromApi(id: string) {
  return await ajax.json(`${sfApiUrl}/api/case/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({}),
  })
}
