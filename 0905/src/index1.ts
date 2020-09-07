/**
 * 目标：
 * 1 写一个简单的装饰器模式的demo
 * 2 会使用 ES6 装饰器
 * 3 掌握 @装饰器 的实现
 * 4 理解 装饰器和装饰器工厂的区别
 * 5 理解 高阶函数和高阶函数工厂
 *  */

// 定义一个Log类
class Log {
  @decorate // @语法糖：能不能在语言级支持一下装饰器，不用每次都自己去定义
  print(msg) {
    console.log(msg);
  }
}

// 注解模式的实现：
function decorate(target, property, descriptor) {
  var oldValue = descriptor.value;
  descriptor.value = (msg) => {
    msg = `[${msg}]`;
    return oldValue.apply(null, [msg]);
  };
  return descriptor;
}
// 注解模式实现：仿真语法实现，即不能实现@这种语法解析，但是可以把原理解释清楚
const anotation = (target, property, decorate) => {
  const decriptor = decorate(
    target.prototype,
    property,
    Object.getOwnPropertyDescriptor(target.prototype, property)
  );
  Object.defineProperty(target.prototype, property, decriptor);
};

anotation(Log, "print", decorate);

// 原始模式：
// const dec = (name) => (target, property) => {
//   const old = target.prototype[property];
//   target.prototype[property] = (msg) => {
//     msg = `{${msg}}`;
//     old(msg);
//   };
// };

// 需要修饰Log类中的print方法
// dec("Teacher Li")(Log, "print");

const log = new Log();
log.print("hello");
