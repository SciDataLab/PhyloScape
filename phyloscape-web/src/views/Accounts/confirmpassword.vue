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
            <p class="title">PhyloScape Retrieve Password</p>
            <p class="subtitle">An interactive platform for visualizing phylogenetic trees</p>
            <el-form :model="resetForm" :rules="resetRule">
              <el-form-item class="formitem" prop="password">
                <el-image :src="pass" />
                <el-input type="password" v-model="resetForm.password" placeholder="New Password" />
              </el-form-item>
              <el-form-item class="formitem" prop="confpwd">
                <el-image v-model="resetForm.cpass" :src="cpass" />
                <el-input type="password" v-model="resetForm.confpwd" placeholder="Confirm New Password" />
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
                  <el-button color="#42bec3" style="color:white;" @click="confirmPassword">
                    Confirm
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
  import pass from '@/assets/pass.png'
  import cpass from '@/assets/cpass.png'
  import {
    useRouter
  } from "vue-router";
  import {
    userpasswd
  } from '@/api/accounts'
import {rsapassword} from '@/utils/utils'
import { ElMessage } from 'element-plus';

  const router = useRouter();
  const { currentRoute } = useRouter();
  let resetForm = reactive({
    password: '',
    cpass: '',
  })
  let uid = ref(null)
  let resetRule =  reactive({
    password:[
      {
        required:true,
        message:'Please input password',
        trigger:'blur'
      }
    ],
    confpwd:[
      {
        required:true,
        message: 'Please input confpwd',
        trigger: 'blur',
      }
    ]
  })
  const goLogin = () => {
    router.push({
      path: `/accounts/login`,
    });
  };
  const confirmPassword = () => {
    let params = {
      password:rsapassword(resetForm.password),
      confpwd:rsapassword(resetForm.confpwd),
    }
    userpasswd(params,uid.value).then(res=>{
      if(res.code == 0){
        ElMessage.success('修改密码成功！')
        router.push({
          path:'/accounts/login'
        })
      }else{
        ElMessage.error(res.msg)
      }
    })

  }
  onMounted(() => {
    uid.value = currentRoute.value.query.uid
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
              width: 80%;

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