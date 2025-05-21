<template>
  <div class="gallerydetail">
    <!--  -->
    <div class="iframe">
      <div class="share" @click="setShare">
        <el-image :src="share"></el-image>
      </div>
      <div ref="imageTofile">
        <iframe :src="path"></iframe>
      </div>
    </div>
    <div class="title-icons">
      <el-row>
        <el-col :span="16">
          <div class="title">{{ name }}</div>
        </el-col>
        <el-col :span="8" style="text-align:right;">
          <p class="icons">
            <span>
              <el-image :src="pageviews"></el-image>
              <a>{{gallerydetail.pageviews}}</a>
            </span>
            <span style="cursor: pointer;" @click="clickLikes">
              <el-image v-if="islikes" :src="likes_c"></el-image>
              <el-image v-else :src="likes"></el-image>
              <a>{{gallerydetail.likes}}</a>
            </span>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="info">
      <p class="abs">
        <span class="span2">{{ gallerydetail.abs }}</span>
      </p>
      <p class="topic">
        <span class="span1">所属专题</span>
        <span class="span2">{{ gallerydetail.topic }}</span>
      </p>
      <p class="time">
        <span class="span1">创建时间</span>
        <span class="span2">{{ gallerydetail.time }}</span>
      </p>
      <p class="author">
        <span class="span1">作者</span>
        <span class="span2" @click="goPersonalShare">
          <a>{{ gallerydetail.author }}</a>
        </span>
      </p>
    </div>
  </div>
</template>
<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import pageviews from '@/assets/gallery/pageviews.png'
  import likes from '@/assets/gallery/likes.png'
  import likes_c from '@/assets/gallery/likes_c.png'
  import share from '@/assets/gallery/share.png'
  import {
    useRouter
  } from 'vue-router'
  import {
    ElMessage,
    ElMessageBox
  } from 'element-plus'
  import html2canvas from "html2canvas"
  import {uploadImage} from '@/api/gallery'
  const {
    currentRoute
  } = useRouter()
  const router = useRouter()
  const route = currentRoute.value
  let path = ref(null)
  let name = ref(null)
  const imageTofile = ref(null)
  const islikes = ref(false)
  const gallerydetail = ref({})
  const getGalleryDetail = () => {
    gallerydetail.value = {
      url: '/map/home1',
      title: '进化树与地图传播用例--配色',
      pageviews: '4,000',
      likes: '3,500',
      abs: '进化树与地图传播用例--配色,进化树与地图传播用例--配色,进化树与地图传播用例--配色',
      topic: '进化树与地图传播用例',
      author: '王小花',
      time: '2023-05-28'
    }
  }
  const goPersonalShare = () => {
    router.push({
      path: '/gallerypersonal'
    })
  }
  const clickLikes = () => {
    islikes.value = islikes.value ? false : true;
  }
  const base64ToBlob = (baseUrl) => {
    let arr = baseUrl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
      type: mime
    })
  }
  const base64toFile = (imageURL, filename = 'file') => {
    let arr = imageURL.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let baseStr = atob(arr[1])
    let n = baseStr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = baseStr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
      type: mime
    })
  }
  const upLoadFile = (url) => {
    const result = base64toFile(url);
    let formData = new FormData(); //参数的格式是formData格式的
    formData.append("file", result); //参数
    uploadImage(formData).then(res=>{
      console.log(res,'res')
    })
  }
  const setShare = () => {
    ElMessageBox.confirm(
        '此操作将该页面进行共享，是否继续?',
        'Warning', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        //确定分享 自动截图当前页面的iframe部分 上传图片
        //手动创建一个canvas标签
        const canvas = document.createElement("canvas")
        // 获取父标签,意思是这个标签内的DOM元素生成图片
        let canvasBox = imageTofile.value
        // 获取父级的宽高
        const width = parseInt(window.getComputedStyle(canvasBox).width)
        const height = parseInt(window.getComputedStyle(canvasBox).height)
        // 宽高*2并放大2倍是为了防止图片模糊
        canvas.width = width
        canvas.height = height
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        const options = {
          backgroundColor: null,
          canvas: canvas,
          useCORS: true
        }
        html2canvas(canvasBox, options).then((canvas) => {
          //toDataURL图片格式转成base64
          let dataURL = canvas.toDataURL("image/jpeg")
          upLoadFile(dataURL)
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '共享被取消！',
        })
      })
  }
  onMounted(() => {
    path.value = '/map/home' + route.query.path
    name.value = route.query.name
    getGalleryDetail()
  })
</script>
<style lang="scss" scoped>
  .gallerydetail {
    width: 80%;
    margin: 0 auto;
    height: 100vh;
    padding: 20px;

    .el-row {
      align-items: center;
    }


    .iframe {
      width: 100%;
      height: 400px;
      position: relative;

      .share {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: -15px;

        .el-image {
          display: inline-block;
          width: 20px;
          height: 20px;
          padding: 5px;
          background: linear-gradient(315deg, #6772FF 0, #00F9E5 100%);
          border-radius: 50%;
        }

        a {
          font-size: 12px;
          color: #6772FF;
        }
      }
    }

    iframe {
      width: 100%;
      height: 400px;
    }

    .title-icons {
      .title {
        font-size: 20px;
        padding-top: 20px;
        color: #3eaf7c;
        font-weight: 600;
      }

      .icons {
        text-align: right;

        .el-image {
          width: 20px;
          vertical-align: middle;
        }

        a {
          color: #555555;
          padding-right: 10px;
        }
      }
    }

    .info {


      .abs {
        padding: 10px 0;
      }

      .span1 {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #1d1d1d;
        width: 116px;
        display: inline-block;
      }

      .span2 {
        font-size: 16px;
        color: #555555;
        line-height: 28px;
        text-align: justify;

        a {
          cursor: pointer;
          color: #2071af;
          font-weight: bold;

        }
      }
    }


  }
</style>