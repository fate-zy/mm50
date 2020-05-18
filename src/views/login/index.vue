<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <!--  :model="loginForm" 
            下面的v-model 双向绑定都写在了 loginForm里面
      -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img @click="getCode" class="captcha" :src="codeURL" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="loginClick" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <!-- 注册子组件 -->
    <register ref="registerRef"></register>
  </div>
</template>

<script>
//导入注册组件
import register from './register'
// 按需导入 设置token令牌
import { setToken } from "@/utils/token";

export default {
  name: "Login",
  //注册子组件 register
  components:{
    register,
  },
  data() {
    return {
      
      //验证码  记得打开PHP  重新运行文件 npm run serve
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      loginForm: {
        // 模型
        phone: "18511111111", // 手机号
        password: "12345678", // 密码
        code: "", // 验证码
        isCheck: false //用户协议选择，必须写里面
      },
      rules: {
        // 校验规则
        phone: [
          // 是个数组，代表这个里面可以写多个校验规则
          // { required: true, message: "必须输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" },

          //自定义 正则 ----自定义必须有 validator:   trigger:
          {
            validator: (rule, value, callback) => {
              if (!value) {
                //return 不是返回值 是用于阻断代码
                // return callback(new Error("手机号不能为空"));
                callback(new Error("手机号不能为空"));
                return ;
              }
              //手机号正则
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "必须输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "必须输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度必须是4位",
            trigger: "blur"
          }
        ],
        isCheck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("必须勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //验证码 点击事件
    // this.codeURL 是固定写法
    getCode() {
      //img  和 url 多次访问同一地址时都有缓存 加入随机数
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Math.random();
    },
    //登入
    loginClick() {
      //.产生了回调地狱 可以用promise 或async await(方便点)
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;

        // 发请求给后台进行登录
        /* 
        this.$axios.post("/login", this.loginForm).then(res => {
          if (res.data.code === 200) {
            // 保存token  
            //.产生了回调地狱 可以用promise 或async await(方便点)
            setToken(res.data.data.token);

            //element ui框架的控件
            this.$message({
              message: "登录成功~",
              type: "success"
            });
            // 跳转到后台管理页面
          this.$router.push('/layout')
          } else {
            this.$message.error(res.data.message);
            //刷新验证码
            //img  和 url 多次访问同一地址时都有缓存
            // （有多个方法） 加入(new Date() - 0)
            this.codeURL =
              process.env.VUE_APP_BASEURL +
              "/captcha?type=login&t=" +
              (new Date() - 0);
          }
        });
         */

        //await
        const res = await this.$axios.post("/login", this.loginForm);

        if (res.data.code === 200) {
          // 提示
          this.$message({
            message: "登录成功~",
            type: "success"
          });

          // 保存token
          setToken(res.data.data.token);

          // 跳转到后台管理页面
          this.$router.push("/layout");
        } else {
          this.$message.error(res.data.message);

          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&t=" +
            (new Date() - 0);
        }
      });
    },
    //注册组件 点击事件
    register(){
      this.$refs.registerRef.dialogVisible=true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>