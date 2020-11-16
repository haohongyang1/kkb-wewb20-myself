/**
 * 模拟链表操作
 *
 */
// class Node {
//   constructor(element) {
//     this.element = element;
//     this.next = null;
//   }
// }
// class LinkNodeList {
//   constructor() {
//     // 链表
//     // 链表相关操作
//     // 链表第一个元素
//     this.head = null;
//     this.length = 0;
//   }
//   // 增删改查
//   append(element) {
//     let node = new Node(element);
//     let cur;
//     //两种情况 链表为空、不为空
//     if (this.head === null) {
//       this.head = node; // head 第一个信息入库
//     } else {
//       //遍历链表
//       //current初始化，记录当前head位置
//       cur = this.head;
//       //一直找到最后一个位置
//       while (cur.next) {
//         cur = cur.next;
//       }
//       //把新的node添加在最后的位置
//       cur.next = node;
//     }
//     this.length += 1;
//   }
//   removeAt(index) {
//     // 1越界处理
//     // 数组长度小于0
//     // 数组长度超过100
//     // 2 存储当前current
//     let cur = this.head; // 入口节点
//     let prev; // 将上一个节点指向下一个节点，把自己的下一个节点指向取消
//     let i = 0; // 记录当前到第几个了
//     if (index === 0) {
//       // 删除第一项
//       this.head = cur.next;
//     } else {
//       // 3 遍历 找到要删除节点的位置
//       while (i < index) {
//         // 找到了要删除节点的位置后，保存 上一个和当前
//         prev = cur;
//         cur = cur.next;
//         i++;
//       }
//       // 更改指向
//       prev.next = cur.next;
//       cur.next = null; // 释放内存
//     }
//     this.length -= 1;
//     return cur.element;
//   }
//   print() {
//     let cur = this.head; // current
//     let ret = []; // result
//     while (cur) {
//       ret.push(cur.element);
//       cur = cur.next;
//     }
//     return ret.join("==>");
//   }
// }

// let linkNode = new LinkNodeList();
// linkNode.append("哈喽");
// linkNode.append("嘿嘿");
// linkNode.append("哈哈");
// linkNode.append("哈哈1");
// console.log(linkNode.print());
// linkNode.removeAt(2);

// console.log(linkNode.print());
// LC 203 链表 206 链表反转 141 环状链表 141 环状链表

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class NodeList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  // 新增元素
  append(element) {
    let node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
      this.length = 1;
    } else {
      // 1. 先找到当前的尾部current
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 2. 向尾部append一个新的元素
      current.next = node;
      this.length++;
    }
  }
  // 初始化链表 输入格式为： 1->2->6->3->4->5->6
  init(list) {
    let listArr = list.split("->");
    for (let i = 0; i < listArr.length; i++) {
      this.append(listArr[i]);
    }

    return this.head;
  }
  // 移除元素
  removeNode(item) {
    // 定义虚拟头节点--避免删除第一个元素导致的问题
    let dummyHead = new Node(-1);
    dummyHead.next = this.head;
    let prev = dummyHead;
    while (prev.next) {
      if (prev.next.element == item) {
        prev.next = prev.next.next;
      } else {
        prev = prev.next;
      }
    }
    return dummyHead.next; // 可以直接return 虚拟节点后面的
  }
  // 输出链表
  print() {
    let ret = [];
    let cur = this.head;
    while (cur) {
      ret.push(cur);
      cur = cur.next;
    }
    return ret.join("->");
  }
  // 链表反转 TODO 如何在反转的情况下，不改变原来的链表
  revert() {
    let pre = null; // 上一个元素，每次循环时候需要更新该值
    let cur = this.head; // 当前循环元素，每次循环末尾需要更新为cur.next
    while (cur) {
      console.log("pre---", JSON.stringify(pre));
      console.log("cur---", JSON.stringify(cur));
      // 方法1
      [cur.next, pre, cur] = [pre, cur, cur.next]; // 上一个元素给cur.next（真正执行反转的位置），更新上一个元素，更新当前元素
      // 方法2
      // let tmp = cur.next; // 临时存储当前指针后续内容
      // cur.next = pre; // 反转
      // pre = cur; // 接受反转结果
      // cur = tmp; // 接回临时存储后续内容

      // pre.next = cur;
      // cur = cur.next;
    }
    console.log("prev--", JSON.stringify(pre));
    return pre;
  }
  // 是否是环形链表
  hasCycle() {
    // 方法1 流氓式遍历
    // let count = 1;
    // while (this.head) {
    //   if (count > 10000) {
    //     return true;
    //   }
    //   count += 1;
    //   this.head = head.next;
    // }
    // return false;
    // 方法2
    // let cache = new Set(); // 记录
    // while (head) {
    //   if (cache.has(head)) {
    //     return true;
    //   } else {
    //     cache.add(head);
    //   }
    //   head = head.next;
    // }
    // return false;
    // 方法3 操场跑圈，只要是个圈，就一定会有跑的快的追上跑的慢的，所以可以用快慢指针来解题
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        return true;
      }
    }
    return false;
  }
}
// var removeElements = function (head, val) {
//   let nodeList = new NodeList();
//   nodeList.init(head);
//   nodeList.removeNode(val);
//   console.log("revert--", JSON.stringify(nodeList.revert()));
//   console.log("nodeList--", JSON.stringify(nodeList));
//   return nodeList.print();
// };

// removeElements("1->2->6->3->4->5->6", 6);
