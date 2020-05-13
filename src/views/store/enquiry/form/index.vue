<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('enquiry.form.paging.pageTitle')">
    <h3>
      <el-button
        type="primary"
        size="small"
        class="float-right"
        @click="addForm">
        {{ $t("base.addition.button") }}
      </el-button>
      {{ $t('enquiry.form.paging.pageTitle') }}
<!--      v-if="!(pagingOptions.dataset.length === 0 && pagingOptions.firstLoading)"-->
    </h3>
    <paging-table
      :heading="$t('enquiry.form.paging.heading')"
      :subheading="$t('enquiry.form.paging.subheading')"
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :options="dataTable.tableOptions"
      :pagination="dataTable.pagingOptions"
      :empty="dataConfig.empty"
      :dataset="dataset"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
      <template slot="header">
        <el-row class="mb-4 dataset-search" :gutter="20">
          <el-col :span="14">
            <el-input
              :placeholder="$t('base.keyword')"
              v-model="dataTable.searchConditions.keyword"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition"
              class="input-with-select">
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="searchData(false)"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="10" class="text-right">
            <label>
              {{ $t('base.orderBy') }}
            </label>
            <el-select
              class="ml-2"
              v-model="dataTable.searchConditions.orderBy"
              :placeholder="$t('base.selectPlaceholder')"
              @change="searchData(false)"
            >
              <el-option :label="$t('enumerate.orderBy.updateTimeASC')" value="updateTime-ASC"></el-option>
              <el-option :label="$t('enumerate.orderBy.updateTimeDESC')" value="updateTime-DESC"></el-option>
              <el-option :label="$t('enumerate.orderBy.createTimeASC')" value="createTime-ASC"></el-option>
              <el-option :label="$t('enumerate.orderBy.createTimeDESC')" value="createTime-DESC"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>
    </paging-table>
  </page-loading>
</template>

<script>
import extend from '../../../../plugins/page/paging'
import * as enquiry from '../../../../plugins/api/enquiry'

export default {
  name: 'enquiryForm',
  extends: extend,
  data () {
    return {
      loading: false,
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateForm(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteForm(rows)
            }
          }
        },
        columns: [
          {
            prop: 'title',
            label: this.$t('enquiry.form.paging.tableHeader.title')
          },
          {
            prop: 'remark',
            label: this.$t('enquiry.form.paging.tableHeader.remark')
          },
          {
            prop: 'createTime',
            label: this.$t('enquiry.form.paging.tableHeader.createTime'),
            sortable: true,
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('enquiry.form.paging.empty.content'),
          buttonLabel: this.$t('enquiry.form.paging.empty.buttonLabel'),
          onClick: () => {
            this.addForm()
          }
        }
      }
    }
  },
  created () {
    this.initCache((success) => {
      this.getData(success)
    })
  },
  watch: {
    /**
     * 分页条件缓存
     */
    pagingOptions: {
      deep: true,
      handler (newVal) {
        localStorage.setItem(this.cacheKey.paging, JSON.stringify(newVal))
      }
    },
    /**
     * 搜索条件缓存
     */
    searchConditions: {
      deep: true,
      handler (newVal) {
        localStorage.setItem(this.cacheKey.search, JSON.stringify(newVal))
      }
    }
  },
  methods: {
    /**
     * 本地缓存加载
     * @param func 回调涵数
     */
    initCache (func) {
      const pagingOptions = localStorage.getItem(this.cacheKey.paging)
      if (pagingOptions) {
        this.dataTable.pagingOptions = JSON.parse(pagingOptions)
      }
      const searchConditions = localStorage.getItem(this.cacheKey.search)
      if (searchConditions) {
        this.dataTable.searchConditions = JSON.parse(searchConditions)
      }
      if (func && typeof (func)) {
        func.call(this, !pagingOptions)
      }
    },
    /**
     * 数据搜索
     */
    searchData () {
      this.dataTable.pagingOptions.pageIndex = 1
      this.getData(false)
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.loading = true
      this.dataTable.searchConditions.keyword = ''
      this.dataTable.pagingOptions.pageIndex = 1
      this.dataTable.searchConditions.clearVisible = false
      this.getData(true)
    },
    /**
     * 分页
     */
    getData (firstLoading) {
      this.dataTable.tableOptions.loading = true
      enquiry.enquiryFormPaging({
        current: this.dataTable.pagingOptions.pageIndex,
        size: this.dataTable.pagingOptions.pageSize,
        orderBy: this.dataTable.searchConditions.orderBy,
        params: {
          title: this.dataTable.searchConditions.keyword,
          siteId: this.shopCode
        }
      })
        .then(result => {
          this.pageValid()
          this.dataTable.tableOptions.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataTable.pagingOptions.firstLoading = firstLoading
              this.dataTable.pagingOptions.recordCount = result.data.total
              this.dataset = result.data.records
            }
          })
        })
        .catch(error => {
          this.dataTable.tableOptions.loading = false
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 添加跳转
     */
    addForm () {
      this.$router.push(`/${this.langCode}/${this.shopCode}/store/enquiry/form/add`)
    },
    /**
     * 修改跳转
     */
    updateForm (row) {
      this.$router.push(`/${this.langCode}/${this.shopCode}/store/enquiry/form/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteForm (rows) {
      const ids = []
      rows.forEach((o) => {
        ids.push(o.id)
      })
      this.$confirm(this.$t('base.delete.multiple').replace('{0}', ids.length), this.$t('base.delete.heading'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.datasource.enquiryFormDelete({
              ids: ids
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete
                }
                this.resultMessage(result, (success) => {
                  done()
                  instance.confirmButtonLoading = false
                  if (success) {
                    this.clearSearchCondition()
                  }
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    }
  }
}
</script>
