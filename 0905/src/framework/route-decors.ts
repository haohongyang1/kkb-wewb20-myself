import * as Koa from "koa";
import * as KoaRouter from "koa-router";

// 定义装饰器工厂, 实现两个注解，自动完成路由注册
const router = new KoaRouter();

export const decorate = (router: KoaRouter) => (
  method: "get" | "post" | "delete" | "put"
) => (path: string) => {
  // target 代表 "/users" property 代表 list方法
  return (target, property) => {
    //   由于这里代码是重复的，解决方式是 升阶
    // 不符合 引用透明：router 变量是通过作用域引用进来，所以再升阶
    router[method](path, target[property]);
  };
};
const method = decorate(router);
// export const get = (path: string) => {
//   // target 代表 "/users" property 代表 list方法
//   return (target, property) => {
//     //   由于这里代码是重复的，解决方式是 升阶
//     router.get(path, target[property]);
//   };
// };
// export const post = (path: string) => {
//   return (target, property) => {
//     router.post(path, target[property]);
//   };
// };
export const get = method("get");

export const post = method("post");
