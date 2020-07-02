<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    {{ value }}
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
      this.$emit("input", e.target.value);
      //   触发校验
      //   this.$emit() 不行，因为slot不能加事件
      //   event bus 不行，因为event bus会强迫用户使用需监听该事件
      //   dispatch 源码中的最佳实践
      //   我们今天先用这个parent
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
