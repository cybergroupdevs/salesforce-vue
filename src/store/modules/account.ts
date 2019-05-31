import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { Account } from '../models'
import {
  getAccountFromApi,
  getAllAccountsFromApi,
  getAllAccountContactsFromApi,
} from '@/api/accounts'

export interface ICaseState extends Account {}

@Module({ name: 'account', store, dynamic: true, namespaced: true })
class AccountModule extends VuexModule implements ICaseState {
  sfid = ''
  name = ''
  phone = ''
  type = ''
  industry = ''
  accountList = []
  contactList = []

  @Mutation
  LIST_ACCOUNTS(result: any) {
    if (result) {
      this.accountList = result.data
    }
  }

  @Action({ commit: 'LIST_ACCOUNTS', rawError: true })
  async getAllAccounts() {
    try {
      return await getAllAccountsFromApi()
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @Mutation
  LIST_CONTACTS(result: any) {
    if (result) {
      this.contactList = result.data
    }
  }

  @Action({ commit: 'LIST_CONTACTS', rawError: true })
  async getAllAccountContacts(accountid: string) {
    try {
      return await getAllAccountContactsFromApi(accountid)
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @Mutation
  UPDATE_ACCOUNT_ATTRIBUTES(result: any) {
    if (result) {
      this.sfid = result.data.sfid
      this.name = result.data.name
      this.phone = result.data.phone
      this.type = result.data.type
      this.industry = result.data.industry
    }
  }

  @Action({ commit: 'UPDATE_ACCOUNT_ATTRIBUTES', rawError: true })
  async getAccount(sfid: string) {
    try {
      return await getAccountFromApi(sfid)
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @MutationAction({
    mutate: ['sfid', 'name', 'phone', 'type', 'industry'],
  })
  async resetAccountData() {
    this.accountList = []
    this.contactList = []
    return {
      sfid: '',
      name: '',
      phone: '',
      type: '',
      industry: '',
    }
  }
}

export default getModule(AccountModule)
