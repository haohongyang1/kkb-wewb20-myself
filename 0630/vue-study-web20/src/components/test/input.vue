<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <!-- 通过v-bind="$attrs" -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      console.log(e.target.value);
      // 在这里触发校验
      this.$emit("input", e.target.value);
      this.$parent.$emit("validate")
    },
  },
};
</script>

<style lang="scss" scoped></style>
