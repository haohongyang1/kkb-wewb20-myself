import Vue from "vue";
import Vuex from "./kvuex";
// debugger;
Vue.use(Vuex);
// debugger;
export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++;
    },
  },
  actions: {
    // 参数怎么来的？
    add({ commit }) {
      // 业务逻辑组合或者异步
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  getters: {
    doubleCounter: (state) => {
      console.log("state===", state);
      return state.counter * 2;
    },
  },
  modules: {},
});
