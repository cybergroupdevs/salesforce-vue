import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { Case } from '../models'
import {
  getAllCasesFromApi,
  getCaseFromApi,
  updateCaseFromApi,
} from '@/api/case'

export interface ICaseState extends Case {}

@Module({ name: 'case', store, dynamic: true, namespaced: true })
class CaseModule extends VuexModule implements ICaseState {
  accountid = ''
  status = ''
  origin = ''
  description = ''
  subject = ''
  casenumber = ''
  contactid = ''
  caseList = []

  @Mutation
  LIST_CASES(result: any) {
    if (result) {
      this.caseList = result.data
    }
  }

  @Action({ commit: 'LIST_CASES', rawError: true })
  async getAllCases() {
    try {
      return await getAllCasesFromApi()
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @Mutation
  UPDATE_CASE_ATTRIBUTES(result: any) {
    if (result) {
      this.accountid = result.data.accountid
      this.status = result.data.status
      this.origin = result.data.origin
      this.description = result.data.description
      this.subject = result.data.subject
      this.casenumber = result.data.casenumber
      this.contactid = result.data.contactid
    }
  }

  @Action({ commit: 'UPDATE_CASE_ATTRIBUTES', rawError: true })
  async getCase(casenumber: string) {
    try {
      return await getCaseFromApi(casenumber)
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @Action({ commit: 'UPDATE_CASE_ATTRIBUTES', rawError: true })
  async updateCase(caseData: object) {
    try {
      return await updateCaseFromApi(this.casenumber, caseData)
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @MutationAction({
    mutate: [
      'accountid',
      'status',
      'origin',
      'description',
      'subject',
      'casenumber',
      'contactid',
    ],
  })
  async resetCaseData() {
    return {
      accountid: '',
      status: '',
      origin: '',
      description: '',
      subject: '',
      casenumber: '',
      contactid: '',
    }
  }
}

export default getModule(CaseModule)
