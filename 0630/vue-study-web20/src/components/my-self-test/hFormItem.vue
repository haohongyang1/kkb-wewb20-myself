<template>
  <div class="item-container">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p class="err-info" v-if="err">{{ err }}</p>
    {{ form.model }}
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
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      err: "",
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      console.log("dododo");
      //   获取校验规则和数据
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const schema = new Schema({ [this.prop]: rules });
      //   返回promise，
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.err = errors[0].message;
        } else {
          // 校验通过
          this.err = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.err-info {
  font-size: 12px;
  color: red;
}
</style>
