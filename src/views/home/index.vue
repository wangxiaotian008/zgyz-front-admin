<template>
    <!-- <div class="wrap">
         <div class="container">-->
    <!--&lt;!&ndash;    登陆模块中间的图标&ndash;&gt;
    <div class="login_box">
        <div class="avatar_box">
            &lt;!&ndash;<img  src="../assets/logo.png" alt="">&ndash;&gt;
        </div>
        &lt;!&ndash;     登陆表单区域&ndash;&gt;
        <el-form ref="loginformref" :model="loginForm"  label-width="0px" class="login_form">

            <el-form-item prop="name">
                <el-input v-model="loginForm.name"  placeholder="请输入用户名"
                          prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>

            &lt;!&ndash;        prop="password"为了重置成功  表单域 model 字段，
            在使用 validate、resetFields 方法的情况下，该属性是必填的
            https://www.cnblogs.com/chr506029589/p/11290161.html &ndash;&gt;
            <el-form-item  prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码"
                          prefix-icon="el-icon-lock"  type="password"></el-input>
            </el-form-item>

            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item >

        </el-form>
        &lt;!&ndash;      button&ndash;&gt;
-->

    <div class="box">
        <h2>云平台工作记录管理系统</h2>
        <el-form ref="loginForm">
            <div class="inputBox">
                <input type="text" v-model="username" ref="usernameInput" @focus="usernameValiteFocus" @blur="usernameValiteBlur" required="">
                <label ref="username" v-text="usernameMessage" v-bind:class="{isRed:isRed, isWhite:isWhite}">用户名</label>
            </div>
            <div class="inputBox">
                <input type="password" v-model="password" ref="passwordInput" @focus="passwordValiteFocus" @blur="passwordValiteBlur" required="">
                <label ref="password" v-text="passwordMessage" v-on:keyup.enter="login" v-bind:class="{isRed:isPwdRed, isWhite:isPwdWhite}">密码</label>
            </div>
            <el-form-item style="text-align: right">
                <el-button type="primary" :loading="loading" @click="login" round :disabled="buttonDisabled">登录</el-button>
                <el-button @click="resetForm" round type="info">重置</el-button>
            </el-form-item>
        </el-form>
<!--        <el-form :model="loginForm" ref="loginForm">-->
<!--            <div class="inputBox">-->
<!--                <el-input v-model="loginForm.username" class="input"></el-input>-->
<!--                <label>用户名</label>-->
<!--            </div>-->
<!--            <div class="inputBox">-->
<!--                <el-input v-model="loginForm.password"></el-input>-->
<!--                <label>密码</label>-->
<!--            </div>-->
<!--            <el-form-item>-->
<!--                <el-button type="primary" @click="">查询</el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
    </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      //这是登录表单的数据绑定对象
      usernameMessage: '用户名',
      passwordMessage: '密码',
      isRed: false,
      isWhite: true,
      isPwdRed: false,
      isPwdWhite: true,
      username: '',
      password: '',
      loading: false,
      buttonDisabled: false,
      directUrl:''
    }
  },
  methods:{
    usernameValiteBlur: function (event) {
      if (event.target.value === ''|| event.target.value == null){
        this.usernameMessage = '用户名不能为空';
        this.$refs.username.value=this.usernameMessage;
        this.isRed = true;
        this.isWhite = false;
        this.buttonDisabled = true;
      }
    },
    usernameValiteFocus: function (event) {
      this.usernameMessage = '用户名';
      this.$refs.username.value=this.usernameMessage;
      this.isRed = false;
      this.isWhite = true;
      this.buttonDisabled = false;
    },
    passwordValiteBlur: function (event) {
      if (event.target.value === ''|| event.target.value == null){
        this.passwordMessage = '密码不能为空';
        this.$refs.username.value=this.passwordMessage;
        this.isPwdRed = true;
        this.isPwdWhite = false;
        this.buttonDisabled = true;
      }
    },
    passwordValiteFocus: function (event) {
      this.passwordMessage = '密码';
      this.$refs.username.value=this.passwordMessage;
      this.isPwdRed = false;
      this.isPwdWhite = true;
      this.buttonDisabled = false;
    },
    resetForm() {
      this.$refs.usernameInput.value=''
      this.$refs.passwordInput.value=''
    },
    login(){
      this.loading=true;
      this.$store.dispatch('user/login', {'username': this.username, 'password': this.password}).then(res=>{
        // 需要测试。
        this.$router.push(this.directUrl)
        console.log("登录成功")
      }).catch(error=>{
        console.log(error)

      })
      this.loading=false
    }

  },
  watch:{
    $route: function (route) {
        this.directUrl = route.path
    }
  }


}
</script>

<style type="text/css">
    .isRed {
        color: red
    }
    .isWhite{
        color: white;
    }
    body{
        margin:0;
        padding: 0;
        font-family: sans-serif;
        background: url("../../assets/img/login.jpg");
        background-size: cover;
    }
    .box
    {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:450px;
        padding: 40px;
        /*background:rgba(190,190,190,0.5);*/
        opacity: inherit;
        box-sizing:border-box;
        box-shadow:0 15px 25px rgba(0,0,0,.5);
        border-radius: 10px;/*登录窗口边角圆滑*/
    }
    .box h2
    {
        margin:0 0 30px;
        padding:0;
        color:#fff;
        text-align:center;
    }
    .box .inputBox
    {
        position:relative;
    }
    .box .inputBox input
    {
        width: 100%;
        padding: 10px 0;
        font-side:16px;
        color: #fff;
        letter-spacing: 1px;
        margin-bottom:30px;/*输入框设置*/
        border:none;
        border-bottom:1px solid #fff;
        outline:none;
        background:transparent;
    }
    .box .inputBox label
    {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        /*color: #fff;*/
        pointer-events: none;
        transition: .5s;
    }
    .box .inputBox input:focus ~ label,
    .box .inputBox input:valid ~ label
    {
        top: -18px;
        left: 0;
        color: #03a9f4;
        font-size: 12px;
    }
    .box  input[type="submit"]
    {
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        background: #03a9f4;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 5px;
    }

</style>