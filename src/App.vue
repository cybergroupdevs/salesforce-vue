<template>
  <div class="container">
    <h1 class="text-center">Cyber Group Salesforce Prototype</h1>
    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
