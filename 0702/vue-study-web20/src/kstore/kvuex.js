let Vue;

// 声明Store类
class Store {
  constructor(options) {
    // 保存mutations
    this._mutations = options.mutations;
    this._actions = options.actions;

    // 锁死commit,dispatch函数this指向
    const store = this;
    const { commit, dispatch } = store;
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload);
    };
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload);
    };

    this._getters = options.getters;
    this._makeLocalGetterCache = {}; // 利用computed做一下缓存
    console.log(this._getters);
    let computed = {};
    // 思路：实现Vuex中的 getter
    this._wrapperGetters = {}; // 定义存储变量，作为代理对象，拦截get，返回最新函数运行结果
    if (this._getters && Object.keys(this._getters).length > 0) {
      Object.keys(this._getters).forEach((getterItem) => {
        this._wrapperGetters[getterItem] = options.getters[getterItem];
        Object.defineProperty(this._wrapperGetters, getterItem, {
          get: () => {
            return options.getters[getterItem](this._vm._data.$$state);
          },
        });
      });
    }

    // 如何利用computed做缓存？
    this._vm = new Vue({
      // data中的值都会做响应化处理
      data: {
        $$state: options.state,
        computed,
      },
    });
  }
  // 每次通过$store.getter都会触发该代理
  get getters() {
    return this._wrapperGetters;
  }
  set getters(value) {
    console.error("Please do not assign values directly");
  }

  // 存取器使之成为只读
  get state() {
    return this._vm._data.$$state;
  }
  set state(v) {
    console.error("please use replaceState to reset state");
  }
  // commit，修改状态
  commit(type, payload) {
    // 1.获取mutation
    const entry = this._mutations[type];

    if (!entry) {
      console.error("大兄弟，没有这个mutation");
      return;
    }

    entry(this.state, payload);
  }

  // dispatch，执行异步任务或复杂逻辑
  dispatch(type, payload) {
    // 1.获取action
    const entry = this._actions[type];

    if (!entry) {
      console.error("大兄弟，没有这个action");
      return;
    }

    entry(this, payload);
  }
}

// install方法
function install(_Vue) {
  Vue = _Vue;
  // debugger;
  Vue.mixin({
    // 尽早执行
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}
// function resetStoreVM(store, state) {
//   store.getters = {};
//   const wrappedGetters = store.getters;
//   const computed = {};
//   forEachValue(wrappedGetters, (fn, key) => {
//     computed[key] = partial(fn, store);
//     Object.defineProperty(store.getters, key, {
//       get: () => store._vm[key],
//       enumerable: true,
//     });
//   });
//   store._vm = new Vue({
//     data: {
//       $$state: state,
//     },
//     computed,
//   });
// }
// function forEachValue(obj, fn) {
//   Object.keys(obj).forEach((key) => fn(obj[key], key));
// }
// function partial(fn, arg) {
//   return function() {
//     return fn(arg);
//   };
// }
// 导出一个对象，作为Vuex
export default { Store, install };
