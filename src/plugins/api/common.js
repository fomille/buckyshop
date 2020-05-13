import http from './http'

/**
 * 上传
 */
export const upload = params => http.post('/common/api/oss/upload', params)

/**
 * 语言数据字典
 */
export const language = params => http.post('/common/api/dic/lang/list', params)
