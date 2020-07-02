<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this, // 传递当前组件实例，引入者可以通过form.来访问到当前组件下所有东西
    };
  },
  props: {
    //   数据项model，校验规则rules，校验方法validate()
    model: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    validate(cb) {
      // 全局校验方法，执行所有表单项校验
      //   如何访问子表单项的校验？----------- this.fields 或者通过 广播，boradcast(消耗性能)的方式
      // $children不标准，万一用户去做一个外的块
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => {
          item.validate();
        });

      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
