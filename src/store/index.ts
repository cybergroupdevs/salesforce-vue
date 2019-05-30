import Vue from 'vue'
import Vuex from 'vuex'
import { IEnvironmentState } from './modules/environment'
import { ICaseState } from './modules/case'

Vue.use(Vuex)

export interface IRootState {
  environment: IEnvironmentState
  case: ICaseState
}

export default new Vuex.Store<IRootState>({})
