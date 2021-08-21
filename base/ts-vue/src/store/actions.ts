import { ActionContext } from 'vuex'
import { moduleState } from './constant'

const moduleGetters = {}
type State = typeof moduleState
// type Getters = typeof moduleGetters;
type ReturnGetters<T extends {[key: string]: (...args: any) => any}> = {
  [P in keyof T]: ReturnType<T[P]>
}
type Getters = ReturnGetters<typeof moduleGetters>
export default {
  getData: ({ commit }: ActionContext<State, Getters>) => {
    commit('getData', false)
  }
}
