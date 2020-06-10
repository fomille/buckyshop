import http from './http'
/**
 * 页面
 */
export const pages = params => http.post('/buckyshop/template/shop-page/new-all', params)

/**
 * 店铺列表
 */
export const shops = params => http.post('/buckydrop/portal/external-shop/customer-shop/list-bs', params)

/**
 * 预览
 */
export const preview = params => http.post('/site/api/preview', params)

/**
 * 店铺主题
 */
export const shopTemplate = params => http.post('/buckyshop/template/shop-template/list', params)

/**
 * 主题更新
 */
export const templateUpdate = params => http.post('/buckyshop/template/shop-template/update', params)
/**
 * 页面信息 & Section
 */
export const pageDetail = params => http.post('/buckyshop/template/shop-page/new-detail', params)

/**
 * 店铺配置
 */
export const shopConfig = params => http.post('/buckyshop/template/shop-template-resource/new-config-section', params)

/**
 * 商品集合
 */
export const goodsCollection = params => http.post('/buckyshop/goods/collection/page-list', params)

/**
 * 预览
 */
export const resourcePreview = params => http.post('/buckyshop/site/resource/preview', params)
