<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h-form :model="form" :rules="rules" ref="loginForm">
      <h-form-item label="用户名" prop="username">
        <h-input v-model="form.username" placeholder="请输入用户名"></h-input>
      </h-form-item>
      <h-form-item label="密码" prop="password">
        <h-input v-model="form.password" placeholder="请输入密码"></h-input>
      </h-form-item>
      <h-form-item>
        <button @click="login">登录</button>
      </h-form-item>
    </h-form>
    <!-- 组件通信 -->
    <!-- <Communication></Communication> -->
    <!-- 表单 -->
    <!-- <FormExample></FormExample> -->
    <!-- 插槽 -->
    <!-- <SlotExample></SlotExample> -->
    <!-- 递归 -->
    <!-- <TreeExample></TreeExample> -->
  </div>
</template>

<script>
import Communication from "@/components/communication";
import FormExample from "@/components/form";
import hInput from "@/components/my-self-test/hInput";
import hFormItem from "@/components/my-self-test/hFormItem";
import hForm from "@/components/my-self-test/hForm";
import SlotExample from "@/components/slots";
import TreeExample from "@/components/recursion";
import create from "@/utils/create-test";
import Notice from "./Notice";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Communication,
    FormExample,
    SlotExample,
    TreeExample,
    hInput,
    hFormItem,
    hForm,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((isValid) => {
        console.log(1111111);
        create(Notice, {
          title: "村长喊你来搬砖",
          message: isValid ? "请求登录" : "校验失败",
          duration: 3000,
        }).show();
        // if (isValid) {
        //   console.log("合法");
        // } else {
        //   alert("校验失败");
        // }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
