import { moduleState } from './constant'
type State = typeof moduleState
const mutations = {
  getData: (state: State, payload: State['loading']) => {
    state.loading = payload
  }
}

export default mutations
