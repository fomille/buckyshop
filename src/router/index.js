import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../components/layout/content.vue'
import i18n from '../plugins/i18n/base'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:shopCode',
    component: layout,
    meta: {
      title: i18n.t('passport.login.title'),
      requireAuth: false,
      hideCrumb: false,
      fullScreen: false
    },
    children: [
      {
        path: 'canvas/:templateCode',
        name: 'design',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: true
        },
        component: () => import('../views/store/design/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER_BASE,
  routes
})

router.onError((error) => {
  console.log('router error', error)
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

export default router
