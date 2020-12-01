<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
// 1.props：model（如何跨层级传递参数），rules
// 2。validate()
export default {
  provide() {
    return {
      form: this, // 这里传递的是表单实例本身
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  methods: {
    validate(cb) {
      // 拿到所有的task，转换为Promise，然后进行promise.all
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
