// 使用注解方式，还有一种实现方式：
import * as Koa from "koa";
import { get, post } from "../framework/route-decors";
const users = [{ name: "tom" }];

export default class User {
  // 定义两个接口
  //   实现两个注解，自动完成路由注册
  @get("/users")
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      data: users,
    };
  }
  @post("/users")
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = {
      ok: 1,
    };
  }
}
