import Vue from 'vue'
import Router from 'vue-router'
import CaseIndex from './views/cases/CaseIndex.vue'
import CaseShow from './views/cases/CaseShow.vue'
import CaseNew from './views/cases/CaseNew.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'CaseIndex',
      component: CaseIndex,
      props: true,
    },
    {
      path: '/case/:caseNumber',
      name: 'CaseShow',
      component: CaseShow,
      props: true,
    },
    {
      path: '/new_case',
      name: 'CaseNew',
      component: CaseNew,
    },
  ],
})
