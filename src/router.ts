import Vue from 'vue'
import Router from 'vue-router'
import CaseIndex from './views/cases/CaseIndex.vue'
import CaseShow from './views/cases/CaseShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'CaseIndex',
      component: CaseIndex,
    },
    {
      path: '/case/:caseNumber',
      name: 'CaseShow',
      component: CaseShow,
      props: true,
    },
  ],
})
