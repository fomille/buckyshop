'use strict'
import http from 'axios'
import router from '../../router'
import passport from '../passport'
import i18n from '../../plugins/i18n/base'
import { Message } from 'element-ui'

http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.timeout = 1000 * 60
http.defaults.baseURL = 'https://api.fomille.com'
/**
 * 请求拦截器
 */
http.interceptors.request.use(
  function (config) {
    config.headers.token = passport.token()
    config.headers.app = 'fomille'
    config.headers.version = '0.1.0'
    config.headers.timestamp = new Date().getTime()
    config.headers.sign = ''
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  function (response) {
    if (response.data.code === 13010000) {
      passport.logout()
      router.replace({
        path: 'passport',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response.data
  },
  function (error) {
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
