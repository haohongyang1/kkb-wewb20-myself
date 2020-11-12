console.log("暗号：今天天气真不错");

// LC1
function towSum(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let num1 = nums[i];
    let num2 = target - num1;
    if (map.has(num2)) {
      return [map.get(num2), i];
    } else map.st(num1, i);
  }
}

// LC141
function hasCycle(head) {
  let low = (fast = head);
  while (low && fast && fast.next) {
    low = low.next;
    fast = fast.next.next;
    if (low === fast) {
      return true;
    }
  }
  return false;
}

// LC104
function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right) + 1);
}

// LC 79
function exist(board, word) {
  if (board.length === 0) {
    return false;
  }
  if (word.length === 0) {
    return true;
  }
  let row = board.length;
  let col = board[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const ret = find(i, j, 0);
      if (ret) return true;
    }
  }
  return false;
  function find(i, j, cur) {
    if (i >= row || i < 0) return false;
    if (j >= col || j < 0) return false;
    let leter = board[i][j];
    if (letter !== word[cur]) return false;
    if (cur === word.length - 1) return false;
    board[i][j] = null;
    const ret =
      find(i + 1, j, cur + 1) ||
      find(i - 1, j, cur + 1) ||
      find(i, j + 1, cur + 1) ||
      find(i, j - 1, cur + 1);
    board[i][j] = letter;
    return ret;
  }
}
