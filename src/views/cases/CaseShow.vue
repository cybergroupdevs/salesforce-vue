<template>
  <div>
    <div class="w-100 text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="row" v-if="errorMessage || showSuccess">
      <div class="col-12">
        <div class="alert alert-danger" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div id="link-success" class="alert alert-success" v-if="showSuccess">
          Case updated successfully!
        </div>
      </div>
    </div>
    <div class="card md-0" v-if="!loading">
      <div class="card-header">
        <b>Case #{{ caseNumber }}</b>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <label for="exampleInputEmail1">Account ID</label>
            <input class="form-control" :disabled="true" v-model="accountid" />
          </div>
          <div class="col-3">
            <label for="exampleInputEmail1">Status</label>
            <select class="form-control" v-model="status">
              <option>On Hold</option>
              <option>Escalated</option>
              <option>New</option>
            </select>
          </div>
          <div class="col-3">
            <label for="exampleInputEmail1">Origin</label>
            <select class="form-control" v-model="origin">
              <option>Email</option>
              <option>Phone</option>
              <option>Web</option>
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
        <hr />
        <button type="submit" class="btn btn-primary" @click="updateCase">
          Save
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import CaseModule from '@/store/modules/case'

@Component({})
export default class CaseShow extends Vue {
  @Prop(String) caseNumber
  accountid = ''
  status = ''
  origin = ''
  description = ''
  subject = ''
  loading = true
  errorMessage = null
  showSuccess = false
  async created() {
    try {
      await CaseModule.getCase(this.caseNumber)
      this.setData()
      this.loading = false
    } catch (e) {
      alert(e)
    }
  }

  setData() {
    this.accountid = CaseModule.accountid
    this.status = CaseModule.status
    this.origin = CaseModule.origin
    this.description = CaseModule.description
    this.subject = CaseModule.subject
  }

  async updateCase() {
    const caseData = {
      accountid: this.accountid,
      status: this.status,
      origin: this.origin,
      description: this.description,
      subject: this.subject,
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
}
</script>
