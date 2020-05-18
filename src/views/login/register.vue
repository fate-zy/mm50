<template>
  <div>
    <!-- title="提示" 原本是写入el-dialog  标签的 -->
    <el-dialog :visible.sync="dialogVisible"  width="600px">
      <!-- 用插槽写 title  这样可以更改样式  slot-->
      <div slot="title" class="title">注册</div>
      <el-form :model="resgisterForm" label-width="100px">
        <el-form-item label="昵称">
          <el-input v-model="resgisterForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="resgisterForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="resgisterForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="resgisterForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码">
          <el-row >
            <el-col :span="17">
              <el-input  placeholder="输入图形码"></el-input>             
            </el-col>
            <el-col style="margin-left:10px" :span="6">
               <img
                class="captcha"
                src="http://47.106.148.205/heimamm/public/captcha?type=sendsms&t=1589773089302"
                alt=""
              />
            </el-col>
          </el-row>
          </el-form-item>
        <el-form-item label="验证码">
          <el-row>
            <el-col :span="17">
              <el-input v-model="resgisterForm.rcode"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  //   props: ["isShow"],
  data() {
    return {
      //   dialogVisible: this.isShow,
      dialogVisible: false,
      resgisterForm: {
        // 这里面的数据，将来是要提交给服务器
        username: "", // 用户名
        phone: "", // 手机号
        email: "", // 邮箱
        avatar: "", // 头像地址
        password: "", // 密码
        rcode: "", // 验证码
      },
    };
  },
};
</script>

<style lang="less">
 .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
</style>