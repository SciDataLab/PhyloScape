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
            <p class="title">PhyloScape Register</p>
            <div class="tline">
              <div class="tlineleft">
                <p class="subtitle">An interactive platform for visualizing phylogenetic trees</p>
              </div>
              <div class="tlineright">
                <el-button style="color:#42bec3" link @click="goLogin">Existing account? Log in now</el-button>
              </div>
            </div>
            <el-form :model="registerForm" :rules="registerRule">
              <el-form-item class="formitem" prop="username">
                <el-image :src="user" />
                <el-input v-model="registerForm.username" placeholder="Username" />
              </el-form-item>
              <el-form-item class="formitem" prop="email">
                <el-image :src="email" />
                <el-input v-model="registerForm.email" placeholder="Email" />
              </el-form-item>
              <el-form-item class="formitem">
                <el-image v-model="registerForm.pass" :src="pass" />
                <el-input type="password" v-model="registerForm.password" placeholder="Password" />
              </el-form-item>
              <el-form-item class="formitem" prop="captcha">
                <el-image :src="code" />
                <el-input v-model="registerForm.captcha" placeholder="Code" />
                <el-image :src="codeimg" style="width:80px;" />
              </el-form-item>

              <el-form-item>
                <p class="loginbtn">
                  <el-button color="#42bec3" @click="register" style="color:white;">
                    Register
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
    usercaptcha,
    userregister
  } from '@/api/accounts'
  import user from '@/assets/user.png'
  import email from '@/assets/email.png'
  import pass from '@/assets/pass.png'
  import code from '@/assets/code.png'
  import {
    useRouter
  } from "vue-router";
  import {rsapassword} from '@/utils/utils'
  import {
    ElMessage
  } from 'element-plus'
  const router = useRouter();
  let registerForm = reactive({
    username: '',
    email: '',
    captcha: '',
    password: '',
    is_active: '',
    id: ''
  })
  const registerRule = reactive({
    username: [{
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    }],

    email: [{
        required: true,
        message: 'Please input email address',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change'],
      },
    ],
    password: [{
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    }],
    captcha: [{
      required: true,
      message: 'Please input code',
      trigger: 'blur',

    }]
  })
  const codeimg = ref(null)

  function register() {
    let usrparams = {
      username: registerForm.username,
      email: registerForm.email,
      password: rsapassword(registerForm.password)
    }
    let params = {
      usr: usrparams,
      captcha: registerForm.captcha,
      id: registerForm.id
    }
    userregister(params).then(res => {
      if (res.code == 0) {
        ElMessage.success('注册成功！')
        goLogin()
      } else {
        getCode()
        ElMessage.error(res.msg)
      }
    })
  }

  function goLogin() {
    router.push({
      path: `/accounts/login`,
    });
  }
  const getCode = () => {
    usercaptcha().then(res => {
      codeimg.value = res.img
      registerForm.id = res.id
    })
  }
  onMounted(() => {
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
      height: 70%;
      // border:1px solid red;
      box-shadow: -5px 5px 10px -4px #2f2f9f, 5px -5px 10px -4px #42f7d3;
      border-radius: 10px;
      background: white;
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
            // align-items: center;
            font-size: 12px;

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