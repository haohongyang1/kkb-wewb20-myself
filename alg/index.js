/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 经典栈操作
  let map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  let stack = [];
  let arr = s.split("");
  for (let i = 0; i < arr.length; i++) {
    console.log(11);
    // 是前括号就入栈
    console.log(map[arr[i]]);
    console.log(stack[stack.length - 1]);
    if (arr[i] === "(" || arr[i] === "{" || arr[i] === "[") {
      stack.push(arr[i]);
    }

    // 判断后括号和栈顶是否是一对，如果是一对就pop
    else if (map[arr[i]] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(-1);
    }
  }
  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
};
// console.log(isValid("]"));

/**
 * 模拟链表操作
 *
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkNodeList {
  constructor() {
    // 链表
    // 链表相关操作
    // 链表第一个元素
    this.head = null;
    this.length = 0;
  }
  // 增删改查
  append(element) {
    let node = new Node(element);
    let cur;
    //两种情况 链表为空、不为空
    if (this.head === null) {
      this.head = node; // head 第一个信息入库
    } else {
      //遍历链表
      //current初始化，记录当前head位置
      cur = this.head;
      //一直找到最后一个位置
      while (cur.next) {
        cur = cur.next;
      }
      //把新的node添加在最后的位置
      cur.next = node;
    }
    this.length += 1;
  }
  removeAt(index) {
    // 1越界处理
    // 数组长度小于0
    // 数组长度超过100
    // 2 存储当前current
    let cur = this.head; // 入口节点
    let prev; // 将上一个节点指向下一个节点，把自己的下一个节点指向取消
    let i = 0; // 记录当前到第几个了
    if (index === 0) {
      // 删除第一项
      this.head = cur.next;
    } else {
      // 3 遍历 找到要删除节点的位置
      while (i < index) {
        // 找到了要删除节点的位置后，保存 上一个和当前
        prev = cur;
        cur = cur.next;
        i++;
      }
      // 更改指向
      prev.next = cur.next;
      cur.next = null; // 释放内存
    }
    this.length -= 1;
    return cur.element;
  }
  print() {
    let cur = this.head; // current
    let ret = []; // result
    while (cur) {
      ret.push(cur.element);
      cur = cur.next;
    }
    return ret.join("==>");
  }
}

let linkNode = new LinkNodeList();
linkNode.append("哈喽");
linkNode.append("嘿嘿");
linkNode.append("哈哈");
linkNode.append("哈哈1");
console.log(linkNode.print());
linkNode.removeAt(2);

console.log(linkNode.print());
// LC 203 链表 206 链表反转 141 环状链表 141 环状链表
