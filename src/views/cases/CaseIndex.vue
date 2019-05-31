<template>
  <div>
    <router-link tag="button" :to="'/new_case'" class="btn btn-success">
      Create New Case
    </router-link>
    <hr />
    <div class="w-100 text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="row" v-if="showDeleteSuccess">
      <div class="col-12">
        <div
          id="link-success"
          class="alert alert-success"
          v-if="showDeleteSuccess"
        >
          Case deleted successfully!
        </div>
      </div>
    </div>
    <div class="card md-0" v-if="!loading">
      <div class="card-header">
        <b>Current Cases</b>
      </div>
      <div class="card-body">
        <div class="row">
          <table class="table table-hover" v-if="cases.length">
            <thead>
              <tr>
                <th scope="col">Case Number</th>
                <th scope="col">Account #</th>
                <th scope="col">Prority</th>
                <th scope="col">Status</th>
                <th scope="col">Origin</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody>
              <router-link
                v-for="(value, i) in cases"
                :key="i"
                :to="'/case/' + value.id"
                tag="tr"
              >
                <td>{{ value.casenumber || 'pending' }}</td>
                <td>{{ value.accountid }}</td>
                <td>{{ value.priority }}</td>
                <td>{{ value.status }}</td>
                <td>{{ value.origin }}</td>
                <td>{{ value.subject }}</td>
              </router-link>
            </tbody>
          </table>
          <div v-if="!cases.length" class="col">
            <span>There are no current cases!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import CaseModule from '@/store/modules/case'

@Component({})
export default class CaseIndex extends Vue {
  @Prop({ default: false, type: Boolean }) deletedCase
  loading = true
  showDeleteSuccess = false
  async created() {
    await CaseModule.getAllCases()
    if (this.deletedCase) {
      this.showDeleteSuccess = true
      setTimeout(() => {
          this.showDeleteSuccess = false
        }, 5000)
    }
    this.loading = false
  }

  get cases() {
    try {
      return CaseModule.caseList
    } catch (e) {
      alert(e)
      return []
    }
  }
}
</script>
