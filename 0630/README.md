# 组件化实践

# event bus

> /root/learn/eventbus.js

# $children 和 $ref 区别

- 前者只能读取子组件，后者可以读取普通元素；
- 使用$chlidren 需要注意，其下标不一定是组件在书写中的顺序， 有一些异步组件和动态添加组件不保证其顺序；

# $attrs/$listeners 的使用

- 使用场景：爷孙通信；
- 通过 v-bind="$attrs"，可以继承调用组件位置的所有继承属性
-
