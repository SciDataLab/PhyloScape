<template>
  <div class="contactwrap">
    <el-row>
      <el-col class="left" :span="12">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <div class="someimg">
          <el-image class="emailimg" :src="email"/>
          <el-image class="addrimg" :src="addr"/>
          <el-image class="messageimg" :src="message"/>
        </div>
        <div class="text">
          CONTACT US
        </div>
      </el-col>
      <el-col class="right" :span="12">
        <div class="someinfo">
          <p>
            <el-image class="emailimg" :src="email"/>
            <span style="padding-right:10px">{{ $t('contact.email') }}</span>
            <span>bioinf@cnic.cn</span>
          </p>
          <p>
            <el-image class="addrimg" :src="addr"/>
            <span style="padding-right:10px">{{$t('contact.address')}}</span>
            <span>{{ $t('contact.addressinfo') }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import email from '@/assets/contact/email.png'
import addr from '@/assets/contact/addr.png'
import message from '@/assets/contact/message.png'


</script>
<style lang="scss" scoped>
.contactwrap{
    min-height:calc(100vh - 160px);
   .left{
    position:relative;

    .bg1{
      width:100%;
      height:calc(100vh - 160px);
      background: linear-gradient(to right, #2f2f9f, #42f7d3);
      // border-top-right-radius: 50%;
      border-bottom-right-radius:50%;
      // border-radius:50%;
    }
    // .bg2{
    //   width:calc(100vh - 260px);
    //   height:calc(100vh - 260px);
    //   background: linear-gradient(to right, #13135d, #42f7d3);
    //   position:absolute;
    //   top:-50%;
    //   left:-160px;
    //   border-radius:50%;

    // }
    .someimg{
      .el-image{
        position:absolute;
        top:50%;
      }
      .emailimg{
        width:70px;
        left:8%;
        opacity:0.7;
      }
      .addrimg{
        width:70px;
        opacity:0.5;
        left:40%;
        top:55%;
      }
      .messageimg{
        width:70px;
        right:11%;
      }
    }

    .text{
      position:absolute;
      top:35%;
      left:8%;
      font-size:60px;
      color:white;
      font-weight:bold;
    }
   }
   .right{
     display:flex;
     align-items: center;
     justify-content: center;
     .someinfo{
       height:60px;
       line-height:60px;
       p{
        display:flex;
        align-items:baseline;
        .el-image{
          width:60px;
        }
       }
       .el-image{
         width:60px;
         vertical-align: middle;
       }
       span:first-of-type{
        width:100px;
         font-size:24px;
       }
       span:last-of-type{
        flex:1;
         font-size:20px;
         color:#555;
       }
     }
   }
}
</style>