<template>
  <div>
    <div class="card md-0">
      <div class="card-header">
        <b>New Case</b>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6" v-if="accounts.length > 0">
            <label>Account</label>
            <select
              class="form-control"
              v-model="accountid"
              @change="getContacts()"
            >
              <option
                v-for="account in accounts"
                v-bind:key="account.sfid"
                v-bind:value="account.sfid"
              >
                {{ account.name }}
              </option>
            </select>
          </div>
          <div class="col-6" v-if="contacts.length > 0">
            <label>Contact</label>
            <select class="form-control" v-model="contactid">
              <option
                v-for="contact in contacts"
                v-bind:key="contact.sfid"
                v-bind:value="contact.sfid"
              >
                {{ contact.name }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="contactid">
          <div class="row">
            <div class="col-3">
              <label>Status</label>
              <select class="form-control" v-model="status" required>
                <option>On Hold</option>
                <option>Escalated</option>
                <option>New</option>
              </select>
            </div>
            <div class="col-3">
              <label>Origin</label>
              <select class="form-control" v-model="origin" required>
                <option>Email</option>
                <option>Phone</option>
                <option>Web</option>
              </select>
            </div>
            <div class="col-3">
              <label>Type</label>
              <select class="form-control" v-model="type" required>
                <option>Problem</option>
                <option>Feature Request</option>
                <option>Question</option>
              </select>
            </div>
            <div class="col-3">
              <label>Case Reason</label>
              <select class="form-control" v-model="reason" required>
                <option>User didn't attend training</option>
                <option>Complex functionality</option>
                <option>Existing problem</option>
                <option>Instructions not clear</option>
                <option>New problem</option>
              </select>
            </div>
            <div class="col-3">
              <label>Priority</label>
              <select class="form-control" v-model="priority" required>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label for="exampleInputEmail1">Subject</label>
              <input type="text-area" class="form-control" v-model="subject" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label for="exampleInputEmail1">Description</label>
              <textarea
                class="form-control"
                rows="4"
                cols="50"
                v-model="description"
              />
            </div>
          </div>
        </div>
        <div class="w-100 text-center" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <hr />
        <button type="submit" class="btn btn-primary" @click="createCase">
          Create Case
        </button>
        &nbsp;
        <router-link class="btn btn-danger" to="/" tag="button">
          Back
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CaseModule from '@/store/modules/case'
import AccountModule from '@/store/modules/account'
import ContactModule from '@/store/modules/contact'

@Component({})
export default class CaseNew extends Vue {
  accounts = []
  contacts = []
  accountid = ''
  status = ''
  origin = ''
  description = ''
  subject = ''
  contactid = ''
  type = ''
  reason = ''
  priority = ''
  loading = false

  async created() {
    this.loading = true
    await AccountModule.getAllAccounts()
    this.accounts = AccountModule.accountList
    this.loading = false
  }

  async getContacts() {
    this.loading = true
    this.contacts = []
    this.contactid = ''
    await AccountModule.getAllAccountContacts(this.accountid)
    this.contacts = AccountModule.contactList
    this.loading = false
  }

  async createCase() {
    this.loading = true
    const caseData = {
      accountid: this.accountid,
      contactid: this.contactid,
      status: this.status,
      origin: this.origin,
      description: this.description,
      subject: this.subject,
      type: this.type,
      reason: this.reason,
      priority: this.priority,
      externalid__c:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
    }
    await CaseModule.createCase(caseData)
    this.$router.push({
      path: '/case/' + CaseModule.casenumber,
      params: { newCase: 'true' },
    })
  }
}
</script>
