<template>
  <div>
    <div class="w-100 text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
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
                <th scope="col">Status</th>
                <th scope="col">Origin</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody>
              <router-link
                v-for="(value, i) in cases"
                :key="i"
                :to="'/case/' + value.casenumber"
                tag="tr"
              >
                <td>{{ value.casenumber }}</td>
                <td>{{ value.accountid }}</td>
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
import { Component, Vue } from 'vue-property-decorator'
import CaseModule from '@/store/modules/case'

@Component({})
export default class CaseIndex extends Vue {
  loading = true
  async created() {
    await CaseModule.getAllCases()
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
