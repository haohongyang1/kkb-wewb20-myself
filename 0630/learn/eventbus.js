class EventBus {
  constructor() {
    this.callbacks = {};
  }
  on(name, callback) {
    //   初始化
    this.callbacks[name] = this.callbacks[name] || [];
    //  给值
    this.callbacks[name].push(callback);
  }
  emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}
