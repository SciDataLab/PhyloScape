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
            <p class="title">PhyloScape Reset Password</p>
            <p class="subtitle">An interactive platform for visualizing phylogenetic trees</p>
            <el-form v-if="showinput" :model="resetForm" :rules="resetRule">
              <el-form-item class="formitem">
                <el-image :src="user" />
                <el-input v-model="resetForm.email" placeholder="Email" />
              </el-form-item>
              <el-form-item class="formitem">
                <el-image :src="code" />
                <el-input v-model="resetForm.captcha" placeholder="Code" />
                <el-image :src="codeimg" style="width:80px;" />
              </el-form-item>
              <el-form-item>
                <div class="tline">
                  <div class="tlineleft">
                  </div>
                  <div class="tlineright">
                    <el-button style="color:#42bec3" link @click="goLogin">Login</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <p class="loginbtn">
                  <el-button color="#42bec3" style="color:white;" @click="goNext">
                    Confirm
                  </el-button>
                </p>
              </el-form-item>
            </el-form>
            <div v-else class="resettext">
              <span>
                <!-- 我们向您的邮箱里发送了密码重置链接，请按链接中的指示重置密码。如果没收到相关邮件，请确认您在上一步所填写的邮箱是否是您注册时使用的邮箱。 -->
                We have sent a password reset link to your email inbox. Please follow the instructions in the link to reset your password. If you do not receive the related email, please confirm whether the email address you filled in the previous step is the same one used during registration.
              </span>
            </div>
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
    usersendmail
  } from '@/api/accounts'

  import user from '@/assets/user.png'
  import code from '@/assets/code.png'
  import {
    useRouter
  } from "vue-router";
import { ElMessage } from 'element-plus'
  const router = useRouter();

  let resetForm = reactive({
    email: '',
    captcha: '',
  })
  let resetRule = reactive({
    email:[
      {
        required:true,
        message:'Please input email',
        trigger:'blur'
      }
    ],
    captcha:[
      {
        required:true,
        message: 'Please input code',
        trigger: 'blur',
      }
    ]
  })
  let showinput = ref(true)
  const codeimg = ref(null)


  const goLogin = () => {
    router.push({
      path: `/accounts/login`,
    });
  };
  const goNext = () =>{
    usersendmail(resetForm).then(res=>{
      if(res.code == 0){
        ElMessage({
          message: res.msg,
          type: 'success',
        })
        showinput.value = false
      }else{
        ElMessage.error(res.msg)
        getCode()
      }
    })
  }
  const getCode = () => {
    usercaptcha().then(res => {
      codeimg.value = res.img
      resetForm.id = res.id
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
            font-size: 30px;
          }

          .subtitle {
            font-size:12px;
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