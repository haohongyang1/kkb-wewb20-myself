/**
 * 二叉树
 * LC 100 相同的树
 * 226 翻转的树
 * 144 前序遍历
 * 145 后序遍历
 * 94 中序遍历
 */

// 1、二叉树的遍历 226
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root, arr = []) {
  // 前序遍历大法：根->左->右
  // 方法2 迭代方式
  let result = []; // 结果数组
  let stack = []; // 暂存栈
  let cur = root;
  while (cur || stack.length > 0) {
    while (cur) {
      result.push(cur.val); // 左和右都是通过这里push进去的
      stack.push(cur);
      cur = cur.left;
    }
    stack.pop();
    cur = cur.right;
  }
  // 2。  left入栈，直到left为空
  // 3.节点出栈，右孩子为目标节点
  // 方法 1 递归（缺点：占用内存过多，树越大，占用内存越多） 用 arr 存储最终结果
  // 递归终止条件
  // if (root) {
  //     // 先处理自己，再处理左右
  //     arr.push(root.val)
  //     preorderTraversal(root.left, arr)
  //     preorderTraversal(root.right, arr)
  // }
  // return arr
};

// 1. 二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root, arr = []) {
  // 顺序：左边，自己，右边
  let result = [];
  let stack = [];
  let cur = root;
  while (cur || stack.length > 0) {
    while (cur) {
      stack.push(cur);
      // result.push(cur);
      cur = cur.left;
    }
  }
  // 2. 方法2：递归
  if (root) {
    inorderTraversal(root.left, arr);
    arr.push(root.val);
    inorderTraversal(root.right, arr);
  }
  return arr;
};
