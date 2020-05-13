/**
 * 基类
 */
import extend from './base'

/**
 * 分页
 */
export default {
  extends: extend,
  data () {
    return {
      /**
       * 数据集
       */
      dataset: [],
      /**
       * 缓存键值
       */
      cacheKey: {
        paging: '',
        search: ''
      },
      /**
       * 分页条件
       */
      dataTable: {
        /**
         * 搜索条件
         */
        searchConditions: {
          /**
           * 搜索框焦点时，清空关键词按钮
           */
          clearVisible: false,
          /**
           * 搜索关键词
           */
          keyword: '',
          /**
           * 排序
           */
          orderBy: 'createTime-DESC'
        },
        /**
         * 分页数据
         */
        tableOptions: {
          multiSelect: true,
          index: false,
          loading: true,
          initTable: true,
          stripe: false
        },
        /**
         * 分页条件
         */
        pagingOptions: {
          pageIndex: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 100],
          layout: 'total, sizes, prev, pager, next, jumper',
          recordCount: 0,
          firstLoad: false,
          visible: true
        }
      }
    }
  },
  watch: {
    /**
     * 分页条件缓存
     */
    dataTable: {
      deep: true,
      handler (newVal) {
        // if (!this.utility.isEmpty(this.cacheKey)) {
        //   localStorage.setItem(this.cacheKey, JSON.stringify(newVal))
        // }
      }
    }
  },
  methods: {
    /**
     * 搜索焦点
     */
    searchConditionChange (value) {
      this.dataTable.searchConditions.clearVisible = !this.utility.isEmpty(value)
    },
    /**
     * 本地缓存加载
     * @param cacheKey 缓存key
     * @param func 回调涵数
     */
    initCache (cacheKey, func) {
      const first = true
      this.cacheKey.search = `search${this.$route.name}`
      this.cacheKey.paging = `paging${this.$route.name}`
      // if (!this.utility.isEmpty(this.cacheKey)) {
      //   const dt = localStorage.getItem(cacheKey)
      //   if (dt) {
      //     this.dataTable = JSON.parse(dt)
      //   }
      //   first = !dt
      // }
      if (func && typeof (func)) {
        func.call(this, first)
      }
    }
  }
}
