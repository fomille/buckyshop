/*
 * @Description: 数据字典
 * @Author: Henry Chen (陈红立)
 * @Email: henrychen@sraritgp.com
 * @Date: 2019-07-09 14:40
 */

import i18n from './i18n/base'

// 询盘状态
const enquiryState = [
  {
    label: i18n.t('enquiry.inbox.paging.state.new'),
    value: 1,
    type: 'success'
  },
  {
    label: i18n.t('enquiry.inbox.paging.state.processing'),
    value: 2,
    type: 'warning'
  },
  {
    label: i18n.t('enquiry.inbox.paging.state.processed'),
    value: 3,
    type: 'info'
  },
  {
    label: i18n.t('enquiry.inbox.paging.state.voided'),
    value: 4,
    type: 'danger'
  },
  {
    label: i18n.t('enquiry.inbox.paging.state.holdOn'),
    value: 5,
    type: 'hold'
  }
]

const deviceType = [
  {
    label: 'All devices',
    icon: 'fo-all_devices',
    value: ''
  },
  {
    label: 'Mobile',
    icon: 'el-icon-mobile-phone',
    value: 1
  },
  {
    label: 'Desktop',
    icon: 'el-icon-message',
    value: 2
  }
]

const enquiryOrderBy = [
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.createTimeDESC'),
    value: 'createTime-DESC'
  },
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.createTimeASC'),
    value: 'createTime-ASC'
  },
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.clientASC'),
    value: 'clientName-ASC'
  },
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.clientDESC'),
    value: 'clientName-DESC'
  },
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.formTitleASC'),
    value: 'formName-ASC'
  },
  {
    label: i18n.t('enquiry.inbox.paging.orderBy.formTitleDESC'),
    value: 'formName-DESC'
  }
]

const enquirySearchType = [
  {
    label: i18n.t('enquiry.inbox.paging.searchType.id'),
    value: 1
  },
  {
    label: i18n.t('enquiry.inbox.paging.searchType.client'),
    value: 2
  },
  {
    label: i18n.t('enquiry.inbox.paging.searchType.formTitle'),
    value: 3
  }
]

const sex = [
  {
    label: i18n.t('sex.woman'),
    value: 0
  },
  {
    label: i18n.t('sex.man'),
    value: 1
  }
]

const top = [
  {
    label: 'TOP 10',
    value: 10
  },
  {
    label: 'TOP 20',
    value: 20
  },
  {
    label: 'TOP 50',
    value: 50
  }
]

const gaChannel = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '自然',
    value: 1
  },
  {
    label: '付费',
    value: 2
  },
  {
    label: '直接',
    value: 3
  },
  {
    label: '引荐',
    value: 4
  }
]

const gaAreaFilter = [
  {
    label: 'PV最高',
    value: 0
  },
  {
    label: '停留时间最高',
    value: 1
  },
  {
    label: '占比最高',
    value: 2
  }
]

const gaLpFilter = [
  {
    label: 'UV最高',
    value: 0
  },
  {
    label: '停留时间最高',
    value: 1
  },
  {
    label: '跳出率最高',
    value: 2
  }
]

export default {
  enquiryState,
  deviceType,
  enquiryOrderBy,
  enquirySearchType,
  sex,
  top,
  gaChannel,
  gaAreaFilter,
  gaLpFilter
}
