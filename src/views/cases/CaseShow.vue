<template>
  <div>
    <div class="w-100 text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="row" v-if="errorMessage || showSuccess || showNewSuccess">
      <div class="col-12">
        <div class="alert alert-danger" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div id="link-success" class="alert alert-success" v-if="showSuccess">
          Case updated successfully!
        </div>
        <div
          id="link-success"
          class="alert alert-success"
          v-if="showNewSuccess"
        >
          Case created successfully!
        </div>
      </div>
    </div>
    <div class="card md-0" v-if="!loading">
      <div class="card-header" v-if="casenumber">
        <b>Case #{{ casenumber }}</b>
      </div>
      <div class="card-header" v-if="!casenumber">
        <b><span class="badge badge-warning">Pending Case Number</span></b>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <label>Account ID</label>
            <input class="form-control" :disabled="true" v-model="accountid" />
          </div>
          <div class="col-3">
            <label>Status</label>
            <select class="form-control" v-model="status">
              <option>On Hold</option>
              <option>Escalated</option>
              <option>New</option>
            </select>
          </div>
          <div class="col-3">
            <label>Origin</label>
            <select class="form-control" v-model="origin">
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
            <label>Subject</label>
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
        <hr />
        <div class="row" v-if="account || contact">
          <div class="col-6" v-if="account">
            <h3>Account Info</h3>
            <div class="row">
              <div class="col-12">
                <label>Name</label>
                <input class="form-control" :value="account.name" disabled />
              </div>
              <div class="col-6">
                <label>Type</label>
                <input class="form-control" :value="account.type" disabled />
              </div>
              <div class="col-6">
                <label>Industry</label>
                <input
                  class="form-control"
                  :value="account.industry"
                  disabled
                />
              </div>
              <div class="col-12">
                <label>Phone #</label>
                <input class="form-control" :value="account.phone" disabled />
              </div>
            </div>
          </div>
          <div class="col-6" v-if="contact">
            <h3>Contact Info</h3>
            <div class="row">
              <div class="col-12">
                <label>Name</label>
                <input class="form-control" :value="contact.name" disabled />
              </div>
              <div class="col-12">
                <label>Phone #</label>
                <input class="form-control" :value="contact.phone" disabled />
              </div>
              <div class="col-12">
                <label>Email</label>
                <input class="form-control" :value="contact.email" disabled />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <button type="submit" class="btn btn-primary" @click="updateCase">
          Save
        </button>
        &nbsp;
        <router-link class="btn btn-warning" to="/" tag="button">
          Back
        </router-link>
        &nbsp;
        <button class="btn btn-danger" @click="deleteCase">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import CaseModule from '@/store/modules/case'
import AccountModule from '@/store/modules/account'
import ContactModule from '@/store/modules/contact'

@Component({})
export default class CaseShow extends Vue {
  @Prop([Number, String]) id
  @Prop({ default: false, type: Boolean }) newCase
  accountid = ''
  status = ''
  origin = ''
  description = ''
  subject = ''
  contactid = ''
  type = ''
  reason = ''
  prority = ''
  account = null
  contact = null
  loading = true
  errorMessage = null
  showSuccess = false
  showNewSuccess = false
  async created() {
    try {
      await CaseModule.getCase(this.id)
      await this.setData()
      await this.setRelationData()
      this.loading = false
      if (this.newCase) {
        this.showNewSuccess = true
      }
    } catch (e) {
      alert(e)
    }
  }

  setData() {
    this.casenumber = CaseModule.casenumber
    this.accountid = CaseModule.accountid
    this.status = CaseModule.status
    this.origin = CaseModule.origin
    this.description = CaseModule.description
    this.subject = CaseModule.subject
    this.contactid = CaseModule.contactid
    this.type = CaseModule.type
    this.reason = CaseModule.reason
    this.priority = CaseModule.priority
  }

  async setRelationData() {
    if (this.accountid != '' && this.accountid != null) {
      await AccountModule.getAccount(this.accountid)
      this.account = {
        sfid: AccountModule.sfid,
        name: AccountModule.name,
        phone: AccountModule.phone,
        type: AccountModule.type,
        industry: AccountModule.industry,
      }
    }

    if (this.contactid != '' && this.contactid != null) {
      await ContactModule.getContact(this.contactid)
      this.contact = {
        sfid: ContactModule.sfid,
        name: ContactModule.name,
        phone: ContactModule.phone,
        email: ContactModule.email,
      }
    }
  }

  async updateCase() {
    const caseData = {
      accountid: this.accountid,
      status: this.status,
      origin: this.origin,
      description: this.description,
      subject: this.subject,
      type: this.type,
      reason: this.reason,
      prority: this.prority,
    }
    try {
      await CaseModule.updateCase(caseData)
      this.setData()
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 5000)
    } catch (e) {
      this.errorMessage = e
    }
  }

  async deleteCase() {
    if (window.confirm('Are you sure you want to delete this case?')) {
      await CaseModule.deleteCase(this.id)
      this.$router.push({
        name: 'CaseIndex',
        params: { deletedCase: true },
      })
    } else {
      return
    }
  }
}
</script>
