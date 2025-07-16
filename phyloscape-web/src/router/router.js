import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
  {
    path: '/',
    component:Layout,
    redirect: '/home',
    children:[
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          jumpPath: 'home'
        }
      },
      {
        path: 'docs',
        name: 'Docs',
        component: () => import('@/views/Docs/index.vue'),
        meta: {
          title: 'Docs',
          jumpPath: 'docs'
        }
      },
      // {
      //   path: 'docs/application',
      //   name: 'Docs',
      //   component: () => import('@/views/Docs/application.vue'),
      //   meta: {
      //     title: 'Docs',
      //     jumpPath: 'docs'
      //   }
      // },
      {
        path: 'docs/webapp',
        name: 'DocsApplication',
        component: () => import('@/views/Docs/application.vue'),
        meta: {
          title: 'Docs',
          jumpPath: 'docs/library'
        }
      },
      {
        path: 'docs/library',
        name: 'DocsLibrary',
        component: () => import('@/views/Docs/library.vue'),
        meta: {
          title: 'Docs',
          jumpPath: 'docs/library'
        }
      },
      {
        path: 'api',
        name: 'API',
        component: () => import('@/views/API/index.vue'),
        meta: {
          title: 'API',
          jumpPath: 'api'
        }
      },
      {
        path: 'application',
        name: 'Application',
        component: () => import('@/views/Application/index.vue'),
        meta: {
          title: 'Application',
          jumpPath: 'application'
        }
      },
      {
        path: 'applicationone',
        name: 'ApplicationOne',
        component: () => import('@/views/Application/one.vue'),
        meta: {
          title: 'ApplicationOne',
          jumpPath: 'application'
        }
      },
      {
        path: 'applicationtwo',
        name: 'ApplicationTwo',
        component: () => import('@/views/Application/two.vue'),
        meta: {
          title: 'ApplicationTwo',
          jumpPath: 'application'
        }
      },
      {
        path: 'plugins',
        name: 'Plugins',
        component: () => import('@/views/Plugins/index.vue'),
        meta: {
          title: 'Plugins',
          jumpPath: 'plugins'
        }
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: () => import('@/views/Gallery/index.vue'),
        meta: {
          title: 'Gallery',
          jumpPath: 'gallery'
        }
      },
      {
        path: 'gallerydetail',
        name: 'GalleryDetail',
        component: () => import('@/views/Gallery/detail.vue'),
        meta: {
          title: 'GalleryDetail',
          jumpPath: 'gallery'
        }
      },
      {
        path: 'gallerypersonal',
        name: 'GalleryPersonal',
        component: () => import('@/views/Gallery/personal.vue'),
        meta: {
          title: 'GalleryPersonal',
          jumpPath: 'gallery'
        }
      },
      {
        path: 'demos',
        name: 'Demos',
        component: () => import('@/views/Demos/index.vue'),
        meta: {
          title: 'Demos',
          jumpPath: 'demos'
        }
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/Contact/index.vue'),
        meta: {
          title: 'Contact',
          jumpPath: 'contact'
        }
      },
      {
        path: 'personal',
        name: 'Personal',
        component: () => import('@/views/Personal/index.vue'),
        meta: {
          title: 'Personal',
          jumpPath: 'personal'
        },
        children:[
          {
            path:'data/list',
            name:'',
            component: () => import('@/views/Personal/Data/list.vue'),
            meta:{
              title: 'Personal',
              jumpPath: 'personal'
            }
          },
          {
            path:'share/list',
            name:'',
            component: () => import('@/views/Personal/Share/list.vue'),
            meta:{
              title: 'Personal',
              jumpPath: 'personal'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/iframetree',
    name: 'Iframetree',
    component: () => import('@/views/Iframetree/index.vue'),
    meta: {
      title: 'Iframetree',
      jumpPath: 'application'
    }
  },
  {
    path:'/accounts',
    name:'Accounts',
    children:[
      {
        path:'login',
        name: 'Login',
        component: () => import('@/views/Accounts/login.vue'),
        meta: {
          title: '登录',
          jumpPath: 'login'
        }
      },
      {
        path:'register',
        name: 'Register',
        component: () => import('@/views/Accounts/register.vue'),
        meta: {
          title: '登录',
          jumpPath: 'register'
        }
      },
      {
        path:'resetpassword',
        name: 'Resetpassword',
        component: () => import('@/views/Accounts/resetpassword.vue'),
        meta: {
          title: '登录',
          jumpPath: 'resetpassword'
        }
      },
      {
        path:'confirmpassword',
        name: 'Confirmpassword',
        component: () => import('@/views/Accounts/confirmpassword.vue'),
        meta: {
          title: '登录',
          jumpPath: 'confirmpassword'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  // history:createWebHistory(),/
  routes,
})
export default router