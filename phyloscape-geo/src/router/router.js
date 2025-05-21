import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
const routes = [{
    path: '/',
    redirect: '/nodata',
    children:[
      {
        path: 'nodata',
        name: 'nodata',
        component: () => import('@/views/nodata/index.vue'),
        meta: {
          title: 'Nodata',
          jumpPath: '/nodata'
        }
      },
      {
        path: 'mapcolor',
        name: 'mapcolor',
        component: () => import('@/views/mapcolor/index.vue'),
        meta: {
          title: 'MapColor',
          jumpPath: '/mapcolor'
        }
      },
      {
        path: 'maptransmission',
        name: 'maptransmission',
        component: () => import('@/views/maptransmission/index.vue'),
        meta: {
          title: 'MapTransmission',
          jumpPath: '/maptransmission'
        }
      },
      {
        path: 'mapdensity',
        name: 'mapdensity',
        component: () => import('@/views/mapdensity/index.vue'),
        meta: {
          title: 'MapDensity',
          jumpPath: '/mapdensity'
        }
      },
      {
        path: 'pienetwork',
        name: 'pienetwork',
        component: () => import('@/views/mpienetwork/index.vue'),
        meta: {
          title: 'PieNetwork',
          jumpPath: '/pienetwork'
        }
      },
      {
        path: 'freqstack',
        name: 'freqstack',
        component: () => import('@/views/mfreqstack/index.vue'),
        meta: {
          title: 'FreqStack',
          jumpPath: '/freqstack'
        }
      },
      {
        path: 'heatmap',
        name: 'heatmap',
        component: () => import('@/views/mheatmap/index.vue'),
        meta: {
          title: 'Heatmap',
          jumpPath: '/heatmap'
        }
      },
      {
        path: 'groupbar',
        name: 'groupbar',
        component: () => import('@/views/mgroupbar/index.vue'),
        meta: {
          title: 'GroupBar',
          jumpPath: '/groupbar'
        }
      },
      {
        path: 'acmap',
        name: 'acmap',
        component: () => import('@/views/macmap/index.vue'),
        meta: {
          title: 'ACMap',
          jumpPath: '/acmap'
        }
      },
      {
        path: 'pdb',
        name: 'pdb',
        component: () => import('@/views/pdb/index.vue'),
        meta: {
          title: 'ACMap',
          jumpPath: '/pdb'
        }
      },
    ]
  },
  
]
const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes,
})
export default router