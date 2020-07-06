// 实现Observer
function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      //   console.log(key, "被读取");
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        console.log(val, "被修改---", newVal);
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || !obj) {
    return;
  }
  //   开始注册响应式对象data
  console.log("开始注册响应式对象data");
  new Observer(obj);
}
class Observer {
  constructor(dataVal) {
    this.value = dataVal;
    this.walk(this.value);
  }
  walk(obj) {
    Object.keys(obj).forEach((keyItem) => {
      defineReactive(obj, keyItem, obj[keyItem]);
    });
  }
}

// export default Observer;
