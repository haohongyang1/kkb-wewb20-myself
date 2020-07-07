// 观察者对象
class Watcher {
  constructor(vm, key, updateFn) {
    this._vm = vm;
    this._key = key;
    this._updateFn = updateFn;

    Dep.target = this;
    console.log("Dep.target====");
    this._vm[this._key];
    Dep.targe = null;
  }
  update() {
    this._updateFn.call(this._vm, this._vm[this._key]);
  }
}
