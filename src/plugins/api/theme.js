import http from './http'

/**
 * 预览
 */
export const preview = params => http.post('/site/api/preview', params)

/**
 * 主题分页
 */
export const templatePaging = params => http.post('/admin/api/tmpl/template/paging', params)

/**
 * 主题详情
 */
export const templateDetail = params => http.post('/admin/api/tmpl/template/detail', params)

/**
 * 主题更新
 */
export const templateUpdate = params => http.post('/admin/api/tmpl/template/save', params)

/**
 * 模板模块列表详情
 */
export const templateModuleDetail = params => http.post('/admin/api/tmpl/template-module/detail', params)

/**
 * 添加 & 修改模板模块列表
 */
export const templateModuleUpdate = params => http.post('/admin/api/tmpl/template-module/save', params)

/**
 * 模板模块列表分页数据
 */
export const templateModulePaging = params => http.post('/admin/api/tmpl/template-module/paging', params)

/**
 * 删除模板模块列表
 */
export const templateModuleDelete = params => http.post('/admin/api/tmpl/template-module/delete', params)

/**
 * 模板页面详情
 */
export const pageDetail = params => http.post('/admin/api/tmpl/page/detail', params)

/**
 * 添加 & 修改模板页面
 */
export const pageUpdate = params => http.post('/admin/api/tmpl/page/save', params)

/**
 * 模板页面分页数据
 */
export const pagePaging = params => http.post('/admin/api/tmpl/page/paging', params)

/**
 * 删除模板页面
 */
export const pageDelete = params => http.post('/admin/api/tmpl/page/delete', params)

/**
 * 页面组件
 */
export const pageModulePaging = params => http.post('/admin/api/tmpl/page-module/paging', params)

/**
 * 页面组件保存
 */
export const pageModuleUpdate = params => http.post('/admin/api/tmpl/page-module/save-batch', params)

/**
 * 组件推送
 */
export const syncModule = params => http.post('/admin/api/tmpl/template-module/sync', params)
