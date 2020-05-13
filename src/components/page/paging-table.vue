<template>
  <div class="page-block">
    <el-card
      shadow="never"
      v-if="dataset.length === 0 && empty && empty.content && pagination.firstLoad"
    >
      <p>
        {{ empty.content }}
      </p>
      <p class="mt-5">
        <el-button
          type="primary"
          size="small"
          @click="emptyEvent"
        >
          {{ empty.buttonLabel }}
        </el-button>
      </p>
    </el-card>
    <template
      v-else
    >
      <h4 class="page-block-title" v-if="heading">
        {{ heading }}
      </h4>
      <p v-if="subheading" class="page-block-subheading">
        {{ subheading }}
      </p>
      <el-card
        shadow="never"
      >
        <template v-if="$slots.header">
          <div class="page-block-header">
            <slot name="header"></slot>
          </div>
        </template>
        <el-table
          ref="multipleTable"
          v-loading="options.loading"
          :data="dataset"
          :stripe="options.stripe"
          :row-class-name="tableRowClassName"
          @selection-change="multiSelect"
          @row-click="rowClick"
          :row-style="rowClass"
          style="width: 100%"
        >
          <el-table-column
            v-if="options.multiSelect"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column v-if="options.index" :label="$t('base.sn')" type="index" width="50" align="center"></el-table-column>
          <template v-for="(column, index) in columns">
            <el-table-column
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :align="column.align || 'left'"
              :width="column.width"
              :sortable="column.sortable"
              :fixed="column.fixed">
              <template slot-scope="scope">
                <template v-if="column.switch">
                  <el-switch
                    v-model="scope.row[column.prop]"
                    :active-value="column.switchActive"
                    :inactive-value="column.switchInactive"
                    active-color="#13ce66"
                    @click.native="columnEvent($event, scope.row, column.onClick)"
                  >
                  </el-switch>
                </template>
                <template v-else-if="column.image">
                  <el-image style="width: 50px" fit="contain" :src="scope.row[column.prop] || column.placeholder"></el-image>
                </template>
                <template v-else-if="!column.render">
                  <template v-if="column.dataType === 'date'">
                    {{ utility.timestampToDate(scope.row[column.prop]) }}
                  </template>
                  <template v-else-if="column.dataType === 'datetime'">
                    {{ utility.timestampToDatetime(scope.row[column.prop], column.dataFormat) }}
                  </template>
                  <template v-else>
                    <div class="text-truncate">
                      {{scope.row[column.prop]}}
                    </div>
                  </template>
                </template>

                <!-- render -->
                <template v-else>
                  <render-dom :row="scope.row" :index="index" :render="column.render"></render-dom>
                </template>

                <!-- render button -->
                <template v-if="column.button">
                  <template v-for="(btn, i) in column.group">
                    <el-button
                      :key="i"
                      :type="btn.type"
                      :size="btn.size || 'mini'"
                      :icon="btn.icon"
                      :disabled="btn.disabled"
                      :plain="btn.plain"
                      :class="btn.className || ''"
                      @click.stop="btn.onClick(scope.row, scope.$index)"
                    >{{btn.name}}</el-button>
                  </template>
                </template>

              </template>

            </el-table-column>
          </template>
        </el-table>
        <el-pagination
          background
          class="mt-5"
          :current-page="pagination.pageIndex"
          :layout="pagination.layout"
          :page-size="pagination.pageSize"
          :page-sizes="pagination.pageSizes"
          :total="pagination.recordCount"
          @current-change="pageChange"
          @size-change="handleSizeChange"
          v-if="pagination.recordCount > 0"
        >
        </el-pagination>
      </el-card>

      <div class="bulk-actions" v-show="selectedItems.length > 0">
        <el-dropdown @command="batchOperation">
          <el-button size="small">
            已选中 {{selectedItems.length}} 行 <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(o, key) in actions">
              <template v-if="!o.invisible">
                <el-dropdown-item
                  v-if="key === 'update'"
                  :command="key"
                  :key="`actions-${key}`"
                  :disabled="selectedItems.length !== 1"
                  :divided="o.divided">
                  <i v-if="o.icon" :class="o.icon"></i>
                  {{ o.label }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-else-if="key === 'delete'"
                  :command="key"
                  :key="`actions-${key}`"
                  :disabled="selectedItems.length < 1"
                  :divided="o.divided">
                  <i v-if="o.icon" :class="o.icon"></i>
                  {{ o.label }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-else
                  :command="key"
                  :key="`actions-${key}`"
                  :divided="o.divided">
                  <i v-if="o.icon" :class="o.icon"></i>
                  {{ o.label }}
                </el-dropdown-item>
              </template>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'pagingTable',
  components: {
    RenderDom: {
      functional: true,
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
         * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
         * @param {Object} ctx - 渲染的节点的this对象
         * @argument 传递参数 row index
         */
      render (createElement, ctx) {
        const { row, index } = ctx.props
        return ctx.props.render(row, index, ctx)
      }
    }
  },
  data () {
    return {
      displayBatch: false,
      selectedItems: [],
      model: {
        keyword: '',
        selectedIDS: []
      }
    }
  },
  props: {
    heading: {
      type: String,
      default: ''
    },
    subheading: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    },
    /**
     * 数据集合
     */
    dataset: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
       * 列显示配置
       */
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
       * 批量操作
       */
    actions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
       * 表功能选项
       */
    options: {
      type: Object,
      default: () => {
        return {
          /**
             * 多选
             */
          multiSelect: true,
          /**
             * 显示序号， 多选则 multiSelect
             */
          index: false,
          /**
             * 加载动画
             */
          loading: false,
          /**
             * 是否一挂载就加载数据
             */
          initTable: true,
          /**
             * 设置行class
             */
          tableRowClassName: () => {}
        }
      }
    },
    /**
       * 分页数据
       */
    pagination: {
      type: Object,
      default: () => {
        return {
          /**
             * 总记录
             */
          recordCount: 0,
          /**
             * 当前页
             */
          pageIndex: 1,
          /**
             * 行/页
             */
          pageSize: 10,
          /**
             * 行/页
             */
          pageSizes: [10, 20, 30, 40, 50, 100],
          /**
             * 布局
             */
          layout: 'total, sizes, prev, pager, next, jumper',
          visible: true
        }
      }
    },
    /**
       * 行样式
       */
    rowsClassName: {
      type: Function,
      default: () => {
        return null
      }
    },
    /**
       * 为空
       */
    empty: {
      type: Object,
      default: () => {
        return {
          content: '',
          buttonLabel: ''
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (this.selectedItems.length > 0) {
        this.batchActions()
      }
    })
  },
  watch: {
    selectedItems: {
      deep: true,
      handler (val) {
        this.batchActions(val)
      }
    }
  },
  methods: {
    /**
       * 分页
       * @param index
       */
    pageChange (index) {
      this.pagination.pageIndex = index
      this.$emit('paging', index)
    },
    /**
       * 分页
       * @param val
       */
    handleSizeChange (val) {
      this.pagination.pageIndex = 1
      this.pagination.pageSize = val
      this.$emit('paging', val)
    },
    /**
       * 单行选择
       */
    singleSelect (item) {
      this.toggleSelection([item])
    },
    /**
       * 多行选择
       * @param rows
       */
    multiSelect (rows) {
      this.selectedItems = rows
      this.displayBatch = rows.length > 0
    },
    /**
       * 设置选中列
       */
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    /**
       * 事件绑定
       */
    batchOperation (command) {
      if (this.actions[command] && this.selectedItems.length > 0) {
        const action = this.actions[command].onClick
        if (action && typeof (action) === 'function') {
          action.call(this, command === 'update' ? this.selectedItems[0] : this.selectedItems)
        }
      }
    },
    /**
       * 单行点击
       * @param row
       * @param column
       * @param event
       */
    rowClick (row, column, event) {
      event.cancelBubble = true
      if (this.actions.update) {
        const action = this.actions.update.onClick
        if (action && typeof (action) === 'function') {
          action.call(this, row)
        }
      }
    },
    /**
       * 列事件
       * @param event
       * @param row
       * @param func
       */
    columnEvent (event, row, func) {
      event.cancelBubble = true
      if (func && typeof (func) === 'function') {
        func.call(this, row)
      }
    },
    /**
       * 批量操作
       * @param rows
       */
    batchActions () {
      if (this.selectedItems.length > 0) {
        this.utility.bulkActions(document.querySelector('.el-table__header-wrapper'))
      }
    },
    /**
       * 行样式
       * @param row
       * @param rowIndex
       * @returns {string}
       */
    tableRowClassName ({ row, rowIndex }) {
      if (this.rowsClassName && typeof (this.rowsClassName) === 'function') {
        return this.rowsClassName(this, row, rowIndex)
      }
    },
    /**
       * 行选中高亮背景
       * @param row
       * @param rowIndex
       * @returns {{"background-color": string}}
       */
    rowClass ({ row, rowIndex }) {
      let exist = false
      this.selectedItems.forEach((o) => {
        if (o === row) {
          exist = true
        }
      })
      if (exist) {
        return {
          'background-color': '#edf5fe'
        }
      }
    },
    emptyEvent () {
      if (this.empty && this.empty.onClick && typeof (this.empty.onClick) === 'function') {
        this.empty.onClick.call()
      }
    }
  }
}
</script>
