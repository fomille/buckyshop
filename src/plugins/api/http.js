'use strict'
import http from 'axios'
import passport from '../passport'
import i18n from '../../plugins/i18n/base'
import { Message } from 'element-ui'
import router from '../../router'

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
    if (process.env.NODE_ENV === 'development') {
      config.headers.common.Authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiMTI1NjA4MzYwMkBxcS5jb20iLCJzdGFyaXQtYnVja3lkcm9wIiwiMTU5MzU4Mjg0NDIzMiIsIjE1OTM1ODI4NDQyMzIiXX0.G0s4fRKNyg2CgjqeFiKaE9ydu8GHPenP-BFXDupjxMo'
    }
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
    if (response.code === -1) {
      passport.logout()
      if (process.env.NODE_ENV === 'development') {
        router.replace({
          path: '/en/passport',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      } else {
        this.utility.login()
      }
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
