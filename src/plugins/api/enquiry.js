import http from './http'

/**
 * 询盘表单分页数据
 */
export const enquiryFormPaging = params => http.post('/buckyshop/member/enquiry/form/paging', params)

/**
 * 询盘表单详情
 */
export const enquiryFormDetail = params => http.post('/buckyshop/member/enquiry/form/detail', params)

/**
 * 更新询盘表单
 */
export const enquiryFormUpdate = params => http.post('/buckyshop/member/enquiry/form/save', params)

/**
 * 删除询盘表单
 */
export const enquiryFormDelete = params => http.post('/buckyshop/member/enquiry/form/delete', params)

/**
 * 询盘邮件
 */
export const enquiryEmail = params => http.post('/buckyshop/member/enquiry/receiver/list', params)

/**
 * 询盘邮件更新
 */
export const enquiryEmailUpdate = params => http.post('/buckyshop/member/enquiry/receiver/save-batch', params)

/**
 * 询盘分页
 */
export const inboxPaging = params => http.post('/buckyshop/member/enquiry/record/paging', params)

/**
 * 询盘详情
 */
export const enquiryTimeline = params => http.post('/buckyshop/member/enquiry/timeline/list', params)

/**
 * 查询询盘追踪记录列表
 */
export const enquiryDetail = params => http.post('/buckyshop/member/enquiry/record/detail', params)

/**
 * 更新询盘信息
 */
export const enquiryUpdate = params => http.post('/buckyshop/member/enquiry/timeline/save', params)
