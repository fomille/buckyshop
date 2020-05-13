import http from './http'

/**
 * 询盘表单分页数据
 */
export const enquiryFormPaging = params => http.post('/merchant/api/enquiry/form/paging', params)

/**
 * 询盘表单详情
 */
export const enquiryFormDetail = params => http.post('/merchant/api/enquiry/form/detail', params)

/**
 * 更新询盘表单
 */
export const enquiryFormUpdate = params => http.post('/merchant/api/enquiry/form/save', params)

/**
 * 删除询盘表单
 */
export const enquiryFormDelete = params => http.post('/merchant/api/enquiry/form/delete', params)

/**
 * 询盘邮件
 */
export const enquiryEmail = params => http.post('/merchant/api/enquiry/receiver/list', params)

/**
 * 询盘邮件更新
 */
export const enquiryEmailUpdate = params => http.post('/merchant/api/enquiry/receiver/save-batch', params)

/**
 * 询盘分页
 */
export const inboxPaging = params => http.post('merchant/api/enquiry/record/paging', params)
