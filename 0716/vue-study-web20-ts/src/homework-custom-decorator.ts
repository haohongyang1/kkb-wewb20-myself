let str = "a";
str = "b";
// console.log(str);
// 写一个泛型：
interface test<T> {
  id: number;
  name: string;
  data: T;
}
// 第一个T：告诉函数T的取值类型，第二个T：传进参数的类型，第三个T：返回值类型中接口定义的T需要传回
function res<T>(data: T): test<T> {
  return { id: 12, name: "test", data: data };
}
res<string>("aaa");

// 暗号：you can you up
interface tree {
  height: number;
}
function treeFactory(obj: tree) {
  return function tree(constructor: any) {
    constructor.prototype.height = obj.height;
    constructor.prototype.treeFeature = function () {
      console.log(`变成一颗${constructor.prototype.height}cm高的树`);
    };
  };
}

@treeFactory({ height: 100 })
class monkeyKing {
  constructor(mName = "sunwukong") {}
}
let monkey1: any = new monkeyKing();
monkey1.treeFeature();
//变成一颗100cm高的树
