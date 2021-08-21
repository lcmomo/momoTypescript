import Vue from 'vue'
import Vuex from 'vuex'
import { moduleState } from './constant'
import actions from './actions'
import mutations from './mutations'
interface State {
  loading: typeof moduleState.loading;
}

Vue.use(Vuex)

export default new Vuex.Store<State>({
  state: moduleState,
  mutations,
  actions,
  modules: {
  }
})
