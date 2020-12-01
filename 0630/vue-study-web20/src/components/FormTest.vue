<template>
  <div>
    <!-- 把model放在form上，是为了传递一次所有下面子集都可以使用，统一管理 -->
    <m-form :model="model" :rules="rules" ref="loginForm">
      <m-form-item label="用户名" prop="name">
        <m-input v-model="model.name" placeholder="请输入用户名"></m-input>
      </m-form-item>
      <m-form-item label="密码" prop="password">
        <m-input v-model="model.password" placeholder="请输入密码"></m-input>
      </m-form-item>
      <m-form-item>
        <button @click="submit">提交</button>
      </m-form-item>
    </m-form>
  </div>
</template>

<script>
import MInput from "@/components/test/input";
import MForm from "@/components/test/form";
import MFormItem from "@/components/test/formItem";

export default {
  components: { MForm, MFormItem, MInput },
  data() {
    return {
      // name: "我的名字",
      model: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
      },
    };
  },
  methods: {
    submit() {
      console.log("validate");
      this.$refs.loginForm.validate((isValid) => {
        console.log("--", isValid);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
