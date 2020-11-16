/**
 * 二叉树
 * LC 100
 * 226
 * 144
 * 45
 * 94
 */

// 1、二叉树的遍历
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
  let result = []; // 存储结果数组
  let stack = []; // 将自己存储起来，等待下次使用
  let cur = root;
  while (cur || stack.length > 0) {
    // 处理左边
    while (cur) {
      // 自己
      result.push(cur.val);
      // 左边
      stack.push(cur);
      // 继续while循环
      cur = cur.left;
    }
    // 处理右边
    cur = stack.pop();
    // 继续while循环
    cur = cur.right;
  }
  return result;
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
