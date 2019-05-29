import { Module, VuexModule, getModule } from 'vuex-module-decorators'
import { Environment } from '../models'
import store from '@/store'

export interface IEnvironmentState extends Environment {}

@Module({ name: 'environment', store, dynamic: true, namespaced: true })
class EnvironmentModule extends VuexModule implements IEnvironmentState {
  sfApiUrl = process.env.VUE_APP_SF_API_URL
}

export default getModule(EnvironmentModule)
