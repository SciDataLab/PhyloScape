<template>
  <div class="loginwrap">
    <div class="main">
      <el-row>
        <el-col class="left" :span="12">
          <div class="loginbg">
            <el-image :src="loginimg" />
          </div>
        </el-col>
        <el-col class="right" :span="12">
          <div class="logincon">
            <p class="title">PhyloScape Login</p>
            <p class="subtitle">An interactive platform for visualizing phylogenetic trees</p>
            <el-form :model="loginForm" :rules="loginRule">
              <el-form-item class="formitem" prop="email">
                <el-image :src="user" />
                <el-input v-model="loginForm.email" placeholder="Email" />
              </el-form-item>
              <el-form-item class="formitem" prop="password">
                <el-image v-model="loginForm.pass" :src="pass" />
                <el-input type="password" v-model="loginForm.password" placeholder="Password" />
              </el-form-item>
              <el-form-item class="formitem" prop="captcha">
                <el-image :src="code" />
                <el-input v-model="loginForm.captcha" placeholder="Code" />
                <el-image :src="codeimg" style="width:80px;" />
              </el-form-item>
              <el-form-item>
                <div class="tline">
                  <div class="tlineleft">
                    <!-- <el-checkbox v-model="loginForm.checked" label="记住用户名" /> -->
                  </div>
                  <div class="tlineright">
                    <el-button color="#42bec3" style="color:#42bec3" link @click="goRegister">Register?</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <p class="loginbtn">
                  <el-button color="#42bec3" @click="login" style="color:white;">
                    Login
                  </el-button>
                </p>
              </el-form-item>
              <el-form-item style="margin-bottom:0;">
                <p>
                  <el-button color="#42bec3" style="color:#42bec3" link @click="goReset">
                    Forget Password?
                  </el-button>
                </p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    onMounted
  } from 'vue'
  import loginimg from '@/assets/login.png'
  import {
    ElMessage
  } from 'element-plus'
  import {
    userinfo,
    usercaptcha,
    userauthtoken
  } from '@/api/accounts'
  import {
    JSEncrypt
  } from 'jsencrypt'
  import user from '@/assets/user.png'
  import pass from '@/assets/pass.png'
  import code from '@/assets/code.png'
  import {
    useRouter
  } from "vue-router";
  import {
    useUserInfo
  } from '@/store/userinfo.js'
  const router = useRouter();
  const guserinfo = useUserInfo()

  let loginForm = reactive({
    email:'',
    password:'',
    checked: false,
    captcha: '',
    id: ''
  })
  let loginCallback = ref({
    iscaptcha: false
  })
  let loginRule = reactive({
    email: [{
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    }],
    password: [{
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    }],
    captcha: [{
      required: true,
      message: 'Please input captcha',
      trigger: 'blur',
    }],
  })
  const codeimg = ref(null)

  function hasUserCodeOrPassword() {
    if (localStorage.getItem('email')) {
      loginForm.email = localStorage.getItem('email')
    } else {
      localStorage.removeItem('email')
    }
  }
  async function login() {
    const encrypt = new JSEncrypt(); // 创建实例
    const pubKey =
      `-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAMzlcSSxTuCm18LnmkO7LFI4viOkDR8k74vwG9LqRdtrjNQmSX3tYs97
EEKplI/sPYNYLNtDtcUm2IuqhEyAtogbviTEWP9z4cO6nXWB6w9nKcLI3FU0nGMS
wpp0nZF9+Y1zz3gtarbJ1MYb7LQ4qLDQ0Rzd1KkrAUlVk33nHJVVAgMBAAE=
-----END RSA PUBLIC KEY-----`

    encrypt.setPublicKey(pubKey);
    let cpassword = encrypt.encrypt(loginForm.password);

    let params = {
      email: loginForm.email,
      password: cpassword,
      captcha: loginForm.captcha,
      id: loginForm.id
    }
    userauthtoken(params).then(res => {
      if (res.code == 0) {
        localStorage.setItem('token',res.access_token)
        ElMessage.success('Login succeeded!')
        getUserInfo()
        // 登录成功，判断是否点击记住用户名
        rememberMe()
        goHome()
      }else{
        getCode()
      }
    }).catch((error)=>{
      getCode()
    })
    // let isChecked = loginForm.checked
    // //判断是否点击记住密码
    // if (isChecked) {
    //   localStorage.setItem('username', loginForm.username)
    //   localStorage.setItem('pass', Base64.encode(loginForm.pass))
    // }
 
  }  const getUserInfo = () => {
    userinfo().then(res => {
      localStorage.setItem('username', res.username)
      localStorage.setItem('email', res.email)
      guserinfo.$patch({
        email: res.email,
        username: res.username
      })
    })
  }
  const rememberMe = () =>{
    if(loginForm.checked){
      localStorage.setItem('email',loginForm.email)
    }
  }
  const goHome = () =>{
    router.push({
      path: `/home`,
    });
  }
  const goRegister = () => {
    router.push({
      path: `/accounts/register`,
    });
  };

  const goReset = () => {
    router.push({
      path: `/accounts/resetpassword`,
    });
  }
  const getCode = () => {
    usercaptcha().then(res => {
      codeimg.value = res.img
      loginForm.id = res.id
    })
  }
  onMounted(() => {
    hasUserCodeOrPassword()
    getCode()
  })
</script>
<style lang="scss">
  .loginwrap {
    width: 100%;
    min-width: 1230px;
    height: 100vh;
    background: linear-gradient(to right, #2f2f9f, #42f7d3);
    display: flex;
    align-items: center;
    justify-content: center;

    .main {
      width: 70%;
      min-height: 70%;
      // border:1px solid red;
      box-shadow: -5px 5px 10px -4px #2f2f9f, 5px -5px 10px -4px #42f7d3;
      border-radius: 10px;
      background: white;
      display: flex;
      align-items: center;
    }

    .el-row {
      height: 100%;

      .left {
        display: flex;
        align-items: center;

        .el-image {}
      }

      .right {
        display: flex;
        align-items: center;
        width: 100%;

        .logincon {
          width: 80%;

          .title {
            font-size: 40px;
          }

          .subtitle {
            font-size: 12px;
            color: #555;
            margin-bottom: 20px;
          }

          .el-form {
            .formitem {
              display: flex;

              .el-form-item__content {
                box-shadow: none;
                border-bottom: 2px solid #ccc;
                padding-bottom: 10px;
              }
            }

            .el-checkbox {
              .el-chekbox__inner {
                width: 18px;
                height: 18px;
                border: 3px solid #1296db;
              }
            }

            .el-image {
              width: 8%;
            }

            .el-input {
              border: 0;
              width: 60%;

              .el-input__wrapper {
                box-shadow: none;
              }
            }
          }

          .tline {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .tlineleft {
              text-align: left
            }

            .tlineright {
              text-align: right;
            }
          }

          .resbtn {
            text-align: right;
          }

          .loginbtn {
            width: 100%;

            .el-button {
              width: 100%;
              height: 50px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
</style>