class Compile {
  constructor(el, vm) {
    this._el = el;
    this._vm = vm;

    // console.log(el);
    console.log(vm);
    this.compile(this._el);
  }
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
  //   TODO 实现 k-model
  isEventAttr(name) {
    return /\@/.test(name);
  }
  //   判断是否是动态节点
  compileText(node) {
    node.textContent = this._vm[RegExp.$1];
  }
  isDynamicNode(node) {
    return /\{\{(.*)\}\}/.test(node.textContent);
  }
}
function compile(el, vm) {
  new Compile(el, vm);
}
