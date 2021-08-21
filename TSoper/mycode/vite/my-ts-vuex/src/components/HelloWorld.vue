<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { State } from '../store';
import {Getters} from '../store/utils';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  setup(props) {
    const store = useStore<State>();
    const { state, getters } = store;
    console.log("🍊", state.user.loading);
    console.log("🏮", getters["user/isLogin"]);
    return {};
  }
}
</script>
