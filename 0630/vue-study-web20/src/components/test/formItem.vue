<template>
  <div>
    <!-- 显示一下label标签 -->
    <label v-if="label">{{ label }}</label>
    <!-- 显示内部表单元素 -->
    <slot></slot>
    <!-- 错误提示信息 -->
    <p class="err" v-if="error">{{ error }}</p>
    <p>{{ form.rules[prop] }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: String,
  },
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 当前表单项校验
      // element 使用的是 async-validator
      console.log("do validate");
      // 获取校验规则，和当前数据
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const schema = new Schema({ [this.prop]: rules });
      console.log(rules);
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.err {
  color: red;
}
</style>
