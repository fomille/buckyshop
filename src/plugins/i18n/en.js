export default {
  errorCode: {
    timeOut: '登录超时，请重新登录',
    networkError: '哎呀，服务器开小差了',
    default: {
      failed: '操作成功',
      success: '操作失败'
    }
  },
  pageAborted: {
    heading: 'Sorry, there\'s something wrong with the page you\'re visiting',
    subheading: 'The possible reasons are:',
    c1: 'Website maintenance in progress',
    c2: 'Program error in website',
    attempt: 'You can try the following:',
    a1: 'Go back to the previous level',
    a2: 'Go back to this page',
    a3: 'Try again later'
  },
  enumerate: {
    orderBy: {
      updateTimeASC: 'Update time，old to new',
      updateTimeDESC: 'Update time，new to old',
      createTimeASC: 'Create time，old to new',
      createTimeDESC: 'Create time，new to old',
      initialASC: 'Name，A-Z',
      initialDESC: 'Name，Z-A'
    }
  },
  base: {
    home: '首页',
    confirm: '确定',
    cancel: 'Cancel',
    discard: '取消',
    save: 'Save',
    leave: '离开',
    reset: '重置',
    actionLabel: '操作',
    actionCopy: '拷贝',
    rename: 'Rename',
    preview: 'Preview',
    publish: 'Publish',
    duplicate: 'Duplicate',
    actionSearch: '请输入关键字',
    language: '语言',
    register: '注册',
    login: '登录',
    more: 'More',
    back: '返回',
    edit: '编辑',
    leaveWithoutSave: '当前页面内容尚未保存，离开将会丢失未保存的内容。是否确认离开？',
    oops: '提示',
    unsaved: 'Unsaved changes',
    loading: 'loading',
    complete: '完成',
    remove: '移除',
    orderBy: 'Order by',
    keyword: 'Please input keywords',
    inputPlaceholder: '请输入内容',
    selectPlaceholder: '请选择',
    date: {
      placeholder: 'Please select a time',
      start: 'Start time',
      deadline: 'Deadline'
    },
    view: '查看',
    search: {
      all: 'All',
      button: 'Search'
    },
    query: '查询',
    addition: {
      button: 'Add',
      success: 'Add complete',
      failed: 'Add failed'
    },
    update: {
      button: 'Update',
      success: 'Update success',
      failed: 'Update failed'
    },
    delete: {
      button: 'Delete',
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
  /**
   * 登录
   */
  passport: {
    login: {
      pageTitle: 'Sign In',
      title: 'Sign In',
      registerTip: 'Create an account',
      forgetTip: 'Forgot password ?',
      button: 'Sign In',
      entity: {
        password: {
          label: 'Password',
          placeholder: 'Password',
          required: 'Please enter password',
          custom: ''
        },
        account: {
          label: 'Email',
          placeholder: 'Email',
          required: 'Please enter email',
          custom: 'Please enter email',
          exists: '',
          validationFailed: ''
        }
      }
    }
  },
  /**
   * 询盘
   */
  enquiry: {
    aside: 'Inquiry form',
    form: {
      paging: {
        pageTitle: 'Inquiry form',
        heading: '',
        subheading: '',
        tableHeader: {
          remark: 'Remark',
          title: 'Form name',
          createTime: 'Create time'
        },
        empty: {
          content: '添加到网站中的表单会被列举在这里。您可以在这里管理所有表单，例如编辑修改。',
          buttonLabel: '添加表单'
        }
      },
      update: {
        pageTitle: '编辑询盘表单',
        addTitle: 'Add enquiry form',
        updateTitle: 'Update enquiry form',
        content: 'Form content',
        fieldList: 'The form must contain mail or phone fields and be required',
        add: {
          button: 'Add filed',
          normal: 'General filed',
          custom: 'Custom filed',
          option: 'Add option'
        },
        option: {
          label: 'Label',
          value: 'Value',
          item: 'Option',
          default: 'Checked'
        },
        field: {
          required: 'Required',
          title: 'Title',
          placeholder: 'Placeholder'
        },
        fieldType: {
          email: {
            label: 'Email',
            fieldLabel: 'Email',
            placeholder: 'Please enter email',
            required: true,
            filedType: 'email',
            quantity: 1,
            preset: true,
            custom: true
          },
          phone: {
            label: 'Phone',
            fieldLabel: 'Phone',
            placeholder: 'Please enter phone number',
            required: true,
            filedType: 'tel',
            quantity: 1,
            preset: true,
            custom: true
          },
          // phoneCode: {
          //   label: '电话-国家码',
          //   fieldLabel: 'phoneCode',
          //   placeholder: 'Please enter phone number',
          //   required: true,
          //   filedType: 'tel',
          //   quantity: 1,
          //   preset: true,
          //   custom: true
          // },
          lastName: {
            label: 'Last name',
            fieldLabel: 'Last name',
            placeholder: 'Please enter last name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          firstName: {
            label: 'First name',
            fieldLabel: 'First name',
            placeholder: 'Please enter first name',
            required: false,
            filedType: 'text',
            quantity: 1,
            preset: true,
            custom: true
          },
          company: {
            label: 'Company',
            fieldLabel: 'Company',
            placeholder: 'Please enter company name',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          position: {
            label: 'Position',
            fieldLabel: 'Position',
            placeholder: 'Please enter position',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          message: {
            label: 'Message',
            fieldLabel: 'Message',
            placeholder: 'Please tell us the message',
            required: true,
            filedType: 'textarea',
            preset: true
          },
          address: {
            label: 'Address',
            fieldLabel: 'Address',
            placeholder: 'Please enter address',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          facebook: {
            label: 'Facebook',
            fieldLabel: 'Facebook',
            placeholder: 'Please enter Facebook ID',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          instagram: {
            label: 'Instagram',
            fieldLabel: 'Instagram',
            placeholder: 'Please enter Instagram ID',
            required: false,
            filedType: 'text',
            quantity: 0,
            preset: true
          },
          attachment: {
            label: 'Attachment',
            fieldLabel: 'Attachment',
            placeholder: 'Upload file',
            required: false,
            filedType: 'file',
            tips: {
              fileType: '附件类型：rar/zip/jpg/png',
              quantity: '附件数量：1',
              size: '附件最大容量：10MB',
              notice: '注意：访客提交的附件会占用您的文件空间'
            },
            quantity: 1,
            preset: true,
            custom: true
          },
          // number: {
          //   label: '数字',
          //   fieldLabel: 'Number',
          //   placeholder: '',
          //   required: false,
          //   filedType: 'number',
          //   quantity: 0,
          //   custom: true
          // },
          select: {
            label: 'Select',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'select',
            quantity: 0,
            custom: true,
            options: []
          },
          checkbox: {
            label: 'Checkbox',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'checkbox',
            quantity: 0,
            custom: true,
            options: []
          },
          radio: {
            label: 'Radio',
            fieldLabel: '',
            placeholder: 'Please select',
            required: false,
            filedType: 'radio',
            quantity: 0,
            custom: true,
            options: []
          },
          text: {
            label: 'Text',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'text',
            quantity: 0,
            custom: true
          },
          textarea: {
            label: 'Textarea',
            fieldLabel: '',
            placeholder: '',
            required: false,
            filedType: 'textarea',
            quantity: 0,
            custom: true
          }
        },
        entity: {
          remark: {
            label: 'Form describe',
            tips: '',
            placeholder: 'Form describe',
            required: 'Please input form describe',
            custom: ''
          },
          title: {
            label: 'Form name',
            tips: '',
            placeholder: 'Form name',
            required: 'Please input form name',
            custom: ''
          },
          buttonLabel: {
            label: 'Submit button label',
            tips: '',
            placeholder: 'Submit button label',
            required: 'Please input submit button label',
            custom: ''
          }
        }
      }
    },
    email: {
      pageTitle: 'Inquiry email',
      addOne: 'Add an item',
      entity: {
        email: {
          label: 'Email',
          tips: '',
          placeholder: 'Email',
          required: 'Please input email',
          custom: 'Email format error',
          exists: 'Duplicate email'
        },
        userName: {
          label: 'User name',
          tips: '',
          placeholder: 'User name',
          required: 'Please input user name',
          custom: ''
        }
      }
    },
    inbox: {
      paging: {
        pageTitle: 'Inquiry record',
        tableHeader: {
          id: 'ID',
          country: 'Country',
          createTime: 'Submit time',
          clientName: 'Customer',
          formName: 'Form name',
          device: 'Terminal',
          state: 'State'
        },
        state: {
          new: 'Pending',
          processing: 'Processing',
          processed: 'Processed',
          voided: 'Voided',
          holdOn: 'Pending'
        },
        orderBy: {
          createTimeASC: 'Create time，old to new',
          createTimeDESC: 'Create time，new to old',
          updateTimeASC: 'Update time，old to new',
          updateTimeDESC: 'Update time，new to old',
          clientASC: 'Customer，A-Z',
          clientDESC: 'Customer，Z-A',
          formTitleASC: 'Form name，A-Z',
          formTitleDESC: 'Form name，Z-A'
        },
        searchType: {
          id: 'id',
          client: 'Customer',
          formTitle: 'Form'
        },
        clearAllFilter: 'Clear all filter'
      },
      update: {
        pageTitle: '询盘详情'
      }
    }
  },
  settings: {
    language: {
      pageTitle: 'Preferred language',
      desc: 'When you\'re logged in to BuckyShop, this is the language you will see. It doesn\'t affect the language your customers see on your online store.'
    }
  },
  /**
   * 店铺相关
   */
  store: {
    theme: {
      pageTitle: 'Themes',
      customize: '编辑',
      editWeb: 'Design',
      previewWeb: 'View website',
      getFreeThemes: 'Add theme',
      freeTheme: 'Free theme',
      setDefaultTheme: 'Set as default theme',
      changed: {
        heading: '当前主题内容已发生变更，请重新发布',
        button: '立即发布'
      },
      visitDemo: '查看demo网站',
      current: {
        heading: 'Current theme',
        subheading: 'This is the theme customers see when they visit your store.'
      },
      owned: {
        heading: 'Theme library',
        subheading: 'Manage your store\'s themes. Add and publish themes to change your online store\'s appearance.'
      },
      publish: {
        title: 'Publish theme',
        content: 'Are you sure you want to publish theme? This will replace your current theme.'
      },
      delete: {
        title: 'OPPS',
        content: 'Are you sure you want to delete this theme?'
      },
      rename: {
        title: '重命名',
        content: '修改此主题的名称。您的访客不会看到这部分内容。',
        placeholder: '请输入主题名称',
        error: '主题名称长度在32位以内'
      },
      duplicate: {
        title: '复制主题',
        content: '复制此主题的内容，并以此创建一个新的主题'
      },
      tableHeader: {
        title: 'Name',
        updateTime: 'Update date',
        styleName: 'Style'
      }
    }
  },
  /**
   * 店铺装修
   */
  design: {
    home: {
      pageTitle: 'Design website',
      addPage: 'Add custom page'
    }
  }
}
