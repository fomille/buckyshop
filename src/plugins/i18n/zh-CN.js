export default {
  errorCode: {
    timeOut: '登录超时，请重新登录',
    networkError: '哎呀，服务器开小差了',
    default: {
      failed: '操作成功',
      success: '操作失败'
    }
  },
  enumerate: {
    orderBy: {
      updateTimeASC: '修改时间，旧到新',
      updateTimeDESC: '修改时间，新到旧',
      createTimeASC: '创建时间，旧到新',
      createTimeDESC: '创建时间，新到旧',
      initialASC: '名称，A-Z',
      initialDESC: '名称，Z-A'
    }
  },
  pageAborted: {
    heading: '抱歉，您访问的页面出错了',
    subheading: '可能的原因是：',
    c1: '网站正在进行维护',
    c2: '网站有程序错误',
    attempt: '您可以尝试以下操作：',
    a1: '返回到上一级',
    a2: '重新进入到本页面',
    a3: '稍后再重试'
  },
  base: {
    home: '首页',
    confirm: '确定',
    cancel: '取消',
    discard: '取消',
    save: '保存',
    leave: '离开',
    reset: '重置',
    actionLabel: '操作',
    actionAdd: '添加',
    actionUpdate: '修改',
    actionDelete: '删除',
    actionCopy: '拷贝',
    rename: '重命名',
    preview: '预览',
    publish: '发布',
    duplicate: '复制',
    actionSearch: '请输入关键字',
    language: '语言',
    register: '注册',
    login: '登录',
    more: '更多',
    back: '返回',
    edit: '编辑',
    leaveWithoutSave: '当前页面内容尚未保存，离开将会丢失未保存的内容。是否确认离开？',
    oops: '提示',
    unsaved: '未保存的更改',
    loading: '加载中',
    complete: '完成',
    remove: '移除',
    orderBy: '排序',
    keyword: '请输入关键词',
    inputPlaceholder: '请输入内容',
    selectPlaceholder: '请选择',
    datePlaceholder: '请选择时间',
    view: '查看',
    search: '查找',
    query: '查询',
    addition: {
      button: '添加',
      success: '添加完成',
      failed: '添加失败'
    },
    update: {
      button: '修改',
      success: '更新完成',
      failed: '更新失败'
    },
    delete: {
      button: '删除',
      heading: '提示',
      subheading: '您确认要删除当前记录吗？',
      multiple: '确定要删除 {0} 项吗?',
      success: '删除完成',
      failed: '删除失败'
    },
    select: {
      multiple: '已选中 {0} 个'
    },
    urlAndHandle: 'URL重复啦，请修改',
    formValidation: {
      inadequate: '请完善内容信息'
    },
    publishSite: '发布网站',
    backHome: '返回首页'
  },
  updateBrowser: {
    heading: '您使用的浏览器版本较低',
    content: '这可能会导致您在使用过程中出现异常。请更新您的浏览器，以便您享受完整的体验。推荐使用以下的浏览器：',
    button: '立即更新',
    chrome: 'Google Chrome',
    firefox: 'Mozilla Firefox',
    safari: 'Apple Safari',
    opera: 'Opera'
  },
  /**
   * 组件类
   */
  component: {
    /**
     * youtube
     */
    videoPicker: {
      placeholder: '请输入Youtube或腾讯视频的分享链接'
    },
    /**
     * 数字输入器
     */
    numberOnly: {
      placeholder: '请输入大于0的数字'
    }
  },
  passport: {
    login: {
      pageTitle: '登录',
      title: '登录',
      registerTip: '免费注册',
      forgetTip: '忘记密码 ?',
      button: '登录',
      entity: {
        password: {
          label: '密码',
          placeholder: '密码',
          required: '请输入密码',
          custom: ''
        },
        account: {
          label: '邮箱',
          placeholder: '邮箱',
          required: '请输入邮箱',
          custom: '请输入邮箱',
          exists: '',
          validationFailed: ''
        }
      }
    }
  }
}
