import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/passport/login.vue'
import layout from '../components/layout/content.vue'
import i18n from '../plugins/i18n/base'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/passport',
    name: 'Home',
    component: Home
  },
  {
    path: '/passport',
    component: layout,
    meta: {
      title: i18n.t('passport.login.title'),
      requireAuth: false,
      hideCrumb: true,
      fullScreen: true
    },
    children: [
      {
        path: '',
        name: 'passport-login',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: true,
          fullScreen: true
        },
        component: () => import('../views/passport/login.vue')
      }
    ]
  },
  {
    path: '/settings',
    component: layout,
    children: [
      {
        path: '',
        name: 'settings-language',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/settings/language')
      }
    ]
  },
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
      },
      {
        path: 'themes',
        name: 'themes',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/themes/index.vue')
      },
      {
        path: 'enquiry/form',
        name: 'enquiry-form',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/form/index')
      },
      {
        path: 'enquiry/form/add',
        name: 'enquiry-form-add',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/form/update')
      },
      {
        path: 'enquiry/form/update/:id',
        name: 'enquiry-form-update',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/form/update')
      },
      {
        path: 'enquiry/email',
        name: 'enquiry-email',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/email/index')
      },
      {
        path: 'enquiry/inbox',
        name: 'enquiry-inbox',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/inbox/index')
      },
      {
        path: 'enquiry/inbox/update/:id',
        name: 'enquiry-inbox-update',
        meta: {
          title: i18n.t('passport.login.title'),
          requireAuth: false,
          hideCrumb: false,
          fullScreen: false
        },
        component: () => import('../views/store/enquiry/inbox/update')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/store/pages/lost.vue')
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
