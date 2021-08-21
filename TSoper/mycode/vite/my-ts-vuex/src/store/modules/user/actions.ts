import {ActionContext} from 'vuex';
import { GET_DATA } from './constant';
import { userState } from './store';

export default {
  [GET_DATA]({ commit }: ActionContext<userState, unknown>): void {
    console.log('action 执行成功');
    setTimeout(() => {
      const payload = true;
      commit(GET_DATA, payload);
    }, 2000)
  }
};
