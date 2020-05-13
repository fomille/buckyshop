/**
 * 面基类
 */
import extend from './base'

/**
 * 未保存页面
 */
export default {
  extends: extend,
  data () {
    return {
      siteDomain: '',
      unsaved: false
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  /**
   * 页面离开确认事件
   * @param to
   * @param from
   * @param next
   */
  beforeRouteLeave (to, from, next) {
    if (this.unsaved) {
      this.$confirm(this.$t('base.leaveWithoutSave'), this.$t('base.oops'), {
        confirmButtonText: this.$t('base.leave'),
        cancelButtonText: this.$t('base.cancel')
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  },
  /**
   * 页面更新确认事件
   * @param to
   * @param from
   * @param next
   */
  beforeRouteUpdate (to, from, next) {
    this.id = this.$route.params.id
    this.siteId = this.$route.params.siteId
    if (this.unsaved) {
      this.$confirm(this.$t('base.leaveWithoutSave'), this.$t('base.oops'), {
        confirmButtonText: this.$t('base.leave'),
        cancelButtonText: this.$t('base.cancel')
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  }
}
