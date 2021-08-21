
import mutations from './mutations';
import { createStore } from './store';
import getters from './getters';
import actions from './actions';

const state = createStore();
export default {
  namespaced: true,
  mutations,
  state,
  getters,
  actions,
}

//namespaced:
// state.user.loading
// getters['user/loading']