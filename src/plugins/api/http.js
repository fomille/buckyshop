'use strict'
import http from 'axios'
import router from '../../router'
import passport from '../passport'
import i18n from '../../plugins/i18n/base'
import { Message } from 'element-ui'

http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.timeout = 1000 * 60
http.defaults.withCredentials = true
// http.defaults.baseURL = 'http://202.105.98.154:6030'
http.defaults.baseURL = '/api'
// http.defaults.baseURL = 'https://new-dev.buckydrop.com/api'
/**
 * 请求拦截器
 */
http.interceptors.request.use(
  config => {
    config.headers.timestamp = new Date().getTime()
    config.headers.shopCode = localStorage.getItem('shopCode') || ''

    // config.headers['Access-Control-Allow-Credentials'] = true
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  response => {
    if (response.data.code === -1) {
      passport.logout()
      router.replace({
        path: '/en/passport',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response.data
  },
  error => {
    Message({
      type: 'error',
      message: i18n.t('errorCode.networkError')
    })
    return Promise.reject(error)
  }
)
/*
  merge request
  http.all([
      agent.agentModel({
        domain: location.hostname
      })
    ])
      .then(http.spread((result) => {
        console.log(result)
      }))
      .catch(error => {
        console.log(error)
      })
  }
 */
export default http
