class Dep {
  constructor() {
    this._depList = [];
  }
  addDep(dep) {
    this._depList.push(dep);
  }
  notify() {
    this._depList.forEach((dep) => {
      dep.update();
    });
  }
}
