import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { Contact } from '../models'
import { getAllContactsFromApi, getContactFromApi } from '@/api/contacts'

export interface ICaseState extends Contact {}

@Module({ name: 'contact', store, dynamic: true, namespaced: true })
class ContactModule extends VuexModule implements ICaseState {
  sfid = ''
  name = ''
  accountid = ''
  phone = ''
  email = ''
  contactList = []

  @Mutation
  LIST_CONTACTS(result: any) {
    if (result) {
      this.contactList = result.data
    }
  }

  @Action({ commit: 'LIST_CONTACTS', rawError: true })
  async getAllContacts() {
    try {
      return await getAllContactsFromApi()
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @Mutation
  UPDATE_CONTACT_ATTRIBUTES(result: any) {
    if (result) {
      this.sfid = result.data.sfid
      this.name = result.data.name
      this.accountid = result.data.accountid
      this.phone = result.data.phone
      this.email = result.data.email
    }
  }

  @Action({ commit: 'UPDATE_CONTACT_ATTRIBUTES', rawError: true })
  async getContact(sfid: string) {
    try {
      return await getContactFromApi(sfid)
    } catch (e) {
      let error
      const errorJson = await e.json()
      error = `Bad Request: ${errorJson.message}`
      throw error
    }
  }

  @MutationAction({
    mutate: ['sfid', 'name', 'accountid', 'phone', 'email'],
  })
  async resetContactData() {
    this.contactList = []
    return {
      sfid: '',
      name: '',
      accountid: '',
      phone: '',
      email: '',
    }
  }
}

export default getModule(ContactModule)
