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
