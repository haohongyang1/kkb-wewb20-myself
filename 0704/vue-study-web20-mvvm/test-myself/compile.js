class Compile {
  constructor(el, vm) {
    this._el = el;
    this._vm = vm;

    // console.log(el);
    console.log(vm);
    this.compile(this._el);
  }
  // compile区----
  //   冬瓜冬瓜我是西瓜
  compile(el) {
    el.childNodes.forEach((itemNode) => {
      if (itemNode.nodeType === 1) {
        if (this.isDynamicNode(itemNode)) {
          //   标签中含有动态赋值节点
          this.compileText(itemNode);
        }
        this.attrMapCompile(itemNode);
      }
    });
  }
  attrMapCompile(node) {
    Array.from(node.attributes).forEach((itemAttr) => {
      let attrName = itemAttr.name;
      const exp = itemAttr.value;
      if (this.isEventAttr(attrName)) {
        const dir = attrName.substring(1);
        this.eventCompile(node, this._vm, exp, dir);
      }
      if (this.isDirection(attrName)) {
        const dir = RegExp.$1;
        this[dir] && this[dir](node, exp);
      }
    });
  }
  eventCompile(node, vm, exp, dir) {
    let args = [];
    let expName = exp;
    if (/(.\w*)\((.*)\)/.test(exp)) {
      expName = RegExp.$1;
      args = RegExp.$2.split(",");
    }
    let fn = vm.$methods && vm.$methods[expName];
    if (exp && fn) {
      node.addEventListener(dir, fn.bind(vm, ...args));
    }
  }
  // update区----
  text(node, exp) {
    this.update(node, exp, "text");
  }
  html(node, exp) {
    this.update(node, exp, "html");
  }
  model(node, exp) {
    this.update(node, exp, "model");
    node.addEventListener("input", (e) => {
      this._vm[exp] = e.target.value;
    });
  }
  compileText(node) {
    this.text(node, RegExp.$1);
  }
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this._vm[exp]);
    // ?? 为什么要给这里拆成函数
    console.log("初始化Watcher===");
    new Watcher(this._vm, exp, (val) => {
      fn && fn(node, val);
    });
  }

  textUpdater(node, val) {
    node.textContent = val;
  }
  htmlUpdater(node, val) {
    console.log("htmlupdater===", val);
    node.innerHTML = val;
  }
  modelUpdater(node, val) {
    node.value = val;
  }
  // 判断区----

  //   TODO 实现 h-model
  isEventAttr(name) {
    return /\@/.test(name);
  }
  //   判断是否是动态节点
  isDirection(name) {
    return /\k-(.*)/.test(name);
  }
  isDynamicNode(node) {
    return /\{\{(.*)\}\}/.test(node.textContent);
  }
}
function compile(el, vm) {
  new Compile(el, vm);
}
