import http from './http'

/**
 * 上传
 */
export const upload = params => http.post('/admin/oss/simple-file-upload', params)

/**
 * 资源保存
 */
export const resourceUpdate = params => http.post('/buckyshop/shop/resource/add', params)

/**
 * 网站资源
 */
export const resourcesPaging = params => http.post('/buckyshop/shop/resource/page-list', params)
/**
 * 语言数据字典
 */
export const language = params => http.post('/common/api/dic/lang/list', params)
