// import "./observe.js";
// import "./compile.js";
class KVue {
  constructor(options) {
    this._options = options;
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods;
    this.observe(this.$data); // 响应式
    this.proxy(); // 代理
    this.compile(this.$el);
  }
  observe(data) {
    observe(data); // define in observe.js
  }
  compile(el) {
    let element = document.querySelector(el);
    compile(element, this); // define in compile.js
  }
  proxy() {
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this._options.data[key];
        },
      });
    });
  }
}
