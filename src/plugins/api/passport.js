import http from './http'

/**
 * 登录
 */
export const login = params => http.post('/platform/api/member/member/login', params)
/**
 * 检查邮件
 */
export const checkEmail = params => http.post('/agent/api/agent/agent/check-exists-email', params)
