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
 * 主题删除
 */
export const templateDelete = params => http.post('/buckyshop/template/shop-template/delete', params)

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

/**
 * Style
 */
export const styleList = params => http.post('/buckyshop/template/tpl/style/page-list', params)

/**
 * Style tags
 */
export const styleRTagList = params => http.post('/buckyshop/template/tpl/style-tag/page-list', params)

/**
 * Add shop template
 */
export const templateAdd = params => http.post('/buckyshop/template/shop-template/add', params)

/**
 * 页面更新
 */
export const builderUpdate = params => http.post('/buckyshop/template/shop-page/new-save', params)

/**
 * URL搜索
 */
export const urlSearch = params => http.post('/buckyshop/template/url/search', params)

/**
 * 添加自定义页
 */
export const createPage = params => http.post('/buckyshop/template/custom-page/create-data', params)
