/**
 * 页面基类
 */
import passport from '../passport'
import router from '../../router'

export default {
  data () {
    return {
      id: '',
      /**
       * 按钮事件状态
       */
      loading: false,
      /**
       * 页面加载状态(true 显示loading加载图片，隐藏页面内容)
       */
      pageLoading: true,
      /**
       * 页面校验状态
       * 页面异步数据加载失败，显示页面加载失败信息
       */
      pageIsValid: false,
      /**
       * 操作类型
       */
      actionType: {
        delete: 97,
        addition: 98,
        update: 99
      },
      /**
       * 店铺code
       */
      shopCode: 'e51f946c0916fa97f621984e0c91ac78',
      /**
       * 多语言代码
       */
      langCode: 'en',
      shopTemplateCode: ''
    }
  },
  computed: {
    /**
     * 语言
     * @returns {*|string}
     */
    language () {
      return this.utility.getLanguage()
    },
    /**
     * 用户代码
     */
    accountCode () {
      const user = passport.getUser()
      return user.accountCode
    }
  },
  methods: {
    /**
     * 重置表单初并移除校验结果
     * @param formName
     */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 移除该表单项的校验结果
     * @param formName
     */
    clearValidate (formName) {
      this.$refs[formName].clearValidate()
    },
    /**
     * 网络错误提示
     */
    networkMistake (error) {
      // this.unsaved = false
      this.loading = false
      console.log(error)
    },
    /**
     * 页面通过
     */
    pageValid () {
      if (this.dataTable) {
        this.dataTable.tableOptions.loading = false
      }
      this.pageIsValid = false
      this.pageLoading = false
      this.unsaved = false
      this.loading = false
    },
    /**
     * 页面未通过校验
     * @param error
     */
    pageInvalid (error) {
      if (this.dataTable) {
        this.dataTable.tableOptions.loading = false
      }
      this.pageIsValid = true
      this.pageLoading = false
      this.unsaved = false
      this.loading = false
      console.log(error)
    },
    /**
     * 操作结果消息通知
     * @param result
     * @param func 回调方法
     */
    resultMessage (result, func) {
      if (result.code === -1) {
        if (process.env.NODE_ENV === 'development') {
          router.replace({
            path: '/en/passport',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        } else {
          this.utility.login()
        }
        return false
      }

      result.options = result.options || {
        action: 0,
        error: '',
        success: ''
      }

      result.options = {
        updateId: true,
        ...result.options
      }

      this.unsaved = false
      this.loading = false
      // 错误信息：options > 错误码 > 默认
      let error = result.options.error
      let success = result.options.success
      // 表单清除验证状态
      if (result.options.action === this.actionType.update || result.options.action === this.actionType.addition) {
        if (this.$refs[result.options.formName || 'update']) {
          this.$refs[result.options.formName || 'update'].clearValidate()
        }
      }
      if (result.success) {
        if (this.utility.isEmpty(success)) {
          if (result.options.action === this.actionType.delete) {
            success = this.$t('base.delete.success')
          } else if (result.options.action === this.actionType.addition) {
            success = this.$t('base.addition.success')
          } else if (result.options.action === this.actionType.update) {
            success = this.$t('base.update.success')
          }
        }
        if (result.data && result.data.id && result.options.updateId) {
          this.id = result.data.id
        }
        if (!this.utility.isEmpty(success)) {
          this.$message({
            type: 'success',
            message: success
          })
        }
      } else {
        if (this.utility.isEmpty(error) && !this.utility.isEmpty(result.code)) {
          error = this.$t('errorCode')[result.code] || result.msg
        }
        if (this.utility.isEmpty(error)) {
          if (result.options.action === this.actionType.delete) {
            error = this.$t('base.delete.failed')
          } else if (result.options.action === this.actionType.addition) {
            error = this.$t('base.addition.failed')
          } else if (result.options.action === this.actionType.update) {
            error = this.$t('base.update.failed')
          }
        }
        if (!this.utility.isEmpty(error)) {
          this.$message({
            type: 'error',
            message: error
          })
        }
      }
      if (func && typeof (func) === 'function') {
        func.call(this, result.success)
      }
      if (!this.utility.isEmpty(result.options.url)) {
        this.$router.replace(result.options.url)
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.shopTemplateCode = this.$route.params.templateCode
    if (this.$route.params.shopCode) {
      this.shopCode = this.$route.params.shopCode
      localStorage.setItem('shopCode', this.shopCode)
    }
    this.langCode = this.$route.params.langCode || 'en'
    this.utility.setLanguage(this.langCode)
  }
}
