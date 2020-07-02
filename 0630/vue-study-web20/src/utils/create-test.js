import Vue from "vue";
export default function create(Component, props) {
  console.log("create");
  // 作业：使用extend方式创建组件实例并挂载
  // 村长喊你来搬砖
  const Profile = Vue.extend(Component);
  const comp = new Profile({ propsData: props }).$mount();
  document.body.appendChild(comp.$el);
  comp.remove = () => {
    document.body.removeChild(comp.$el);
  };
  return comp;
}
