<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('enquiry.inbox.paging.pageTitle')"
  >
    <div class="enquiry-page">
      <h3>
        {{ $t("enquiry.inbox.paging.pageTitle") }}
      </h3>
      <paging-table
        class="enquiry-table"
        :heading="$t('enquiry.form.paging.heading')"
        :subheading="$t('enquiry.form.paging.subheading')"
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :options="{ ...dataTable.tableOptions, multiSelect: false }"
        :pagination="dataTable.pagingOptions"
        :empty="dataConfig.empty"
        :dataset="dataset"
        :rows-class-name="dataConfig.rowsClassName"
        @paging="getData"
      >
        <template slot="header">
          <el-row class="mb-5 dataset-search" :gutter="20">
            <el-col :span="14">
              <el-row :gutter="20">
                <el-col :span="19">
                  <el-input
                    :placeholder="$t('base.keyword')"
                    v-model="filterParams.q"
                    clearable
                    @blur="nextGetData"
                    @clear="nextGetData"
                    @keyup.enter.native="nextGetData"
                    @change="searchConditionChange"
                    class="input-with-select"
                  >
                    <el-select
                      v-model="filterParams.searchType"
                      slot="prepend"
                      style="width: 110px"
                      :placeholder="$t('base.selectPlaceholder')"
                    >
                      <el-option
                        v-for="{ label, value } in enquirySearchType"
                        :key="value"
                        :label="label"
                        :value="value"
                      >{{label}}</el-option>
                    </el-select>
                  </el-input>
                </el-col>
                <el-col :span="5">
                  <el-button
                    :loading="loading"
                    @click="getData"
                  >
                    {{ $t("base.search.button") }}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10" class="text-right">
              <label>
                {{ $t("base.orderBy") }}
              </label>
              <el-select
                class="ml-2"
                v-model="filterParams.orderBy"
                :placeholder="$t('base.selectPlaceholder')"
                @change="nextGetData"
              >
                <el-option
                  v-for="{ label, value } in enquiryOrderBy"
                  :key="value"
                  :label="label"
                  :value="value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="mb-5" type="flex" :gutter="20">
            <el-col :span="2">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAllState"
                @change="handleCheckAllChange"
                >
                {{$t('base.search.all')}}
              </el-checkbox>
            </el-col>
            <el-col :span="22">
              <el-checkbox-group
                v-model="filterParams.states"
                @change="handleCheckedStateChange"
              >
                <el-checkbox
                  v-for="{ label, value } in enquiryState"
                  :key="value"
                  :label="value"
                  >{{ label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mt-5 mb-5">
            <el-col :span="8">
              <el-date-picker
                v-model="filterParams.dateRange"
                type="daterange"
                range-separator="-"
                value-format="timestamp"
                :default-time="['00:00:00', '23:59:59']"
                @change="nextGetData"
                :start-placeholder="$t('base.date.start')"
                :end-placeholder="$t('base.date.deadline')"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="filterParams.device"
                :placeholder="$t('base.selectPlaceholder')"
                @change="nextGetData"
              >
                <el-option
                  v-for="{ label, value, icon } in deviceType"
                  :key="value"
                  :label="label"
                  :value="value"
                >
                  <div class="select-option">
                    <i :class="icon"></i> <span>{{ label }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button @click="handleResetFilter">{{
                $t("enquiry.inbox.paging.clearAllFilter")
              }}</el-button>
            </el-col>
          </el-row>
        </template>
      </paging-table>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../../plugins/page/paging'
import dict from '../../../../plugins/dict'
import * as enquiry from '../../../../plugins/api/enquiry'

export default {
  name: 'enquiry-inbox',
  extends: extend,
  data () {
    return {
      isIndeterminate: false,
      checkAllState: true,
      allState: [],
      filterParams: {
        orderBy: 'createTime-DESC',
        searchType: 1,
        q: '',
        states: [],
        device: '',
        dateRange: null
      },
      ...dict,
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: row => {
              this.updateEnquiry(row)
            }
          }
          // delete: {
          //   icon: 'el-icon-delete',
          //   label: this.$t('base.delete.button'),
          //   onClick: (rows) => {
          //     this.deleteForm(rows)
          //   }
          // }
        },
        columns: [
          {
            prop: 'device',
            width: 100,
            label: this.$t('enquiry.inbox.paging.tableHeader.device'),
            render: row => {
              return (
                <i
                  class={`fomille ${this.utility.getDicType(
                    this.deviceType,
                    row.device,
                    'icon'
                  )}`}
                />
              )
            }
          },
          {
            prop: 'country',
            label: this.$t('enquiry.inbox.paging.tableHeader.country')
          },
          {
            prop: 'createTime',
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm:ss',
            width: 220,
            label: this.$t('enquiry.inbox.paging.tableHeader.createTime')
          },
          {
            prop: 'clientName',
            label: this.$t('enquiry.inbox.paging.tableHeader.clientName')
          },
          {
            prop: 'formName',
            label: this.$t('enquiry.inbox.paging.tableHeader.formName')
          },
          {
            // prop: 'state',
            width: 100,
            label: this.$t('enquiry.inbox.paging.tableHeader.state'),
            render: row => {
              return (
                <el-tag
                  size="medium"
                  type={this.utility.getDicType(
                    this.enquiryState,
                    row.state,
                    'type'
                  )}
                >
                  {this.utility.getDicType(this.enquiryState, row.state)}
                </el-tag>
              )
            }
          }
        ],
        rowsClassName: row => `state__${row.state}`
      }
    }
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
    filterParams: {
      deep: true,
      handler (newVal) {
        localStorage.setItem(this.cacheKey.search, JSON.stringify(newVal))
      }
    }
  },
  created () {
    const allState = []
    this.enquiryState.map(({ value }) => allState.push(value))
    this.allState = allState
    this.filterParams.states = allState
    this.initCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 本地缓存加载
     * @param func 回调涵数
     */
    initCache (func) {
      const pagingOptions = localStorage.getItem(this.cacheKey.paging)
      if (pagingOptions) {
        this.dataTable.tableOptions = JSON.parse(pagingOptions)
      }
      const filterParams = localStorage.getItem(this.cacheKey.search)
      if (filterParams) {
        this.filterParams = JSON.parse(filterParams)
      }
      if (func && typeof (func)) {
        func.call(this, !pagingOptions)
      }
    },
    handleCheckAllChange (val) {
      this.filterParams.states = val ? this.allState : []
      this.isIndeterminate = false
      this.nextGetData()
    },

    handleCheckedStateChange (value) {
      const checkedCount = value.length
      this.checkAllState = checkedCount === this.allState.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allState.length
      this.nextGetData()
    },

    nextGetData () {
      this.$nextTick(() => this.getData())
    },

    /**
     * 清空搜索条件
     */
    handleResetFilter () {
      this.filterParams = {
        orderBy: 'createTime-DESC',
        searchType: 1,
        q: '',
        states: this.allState,
        device: '',
        dateRange: null
      }
      this.isIndeterminate = false
      this.checkAllState = true
      this.dataTable.tableOptions.pageIndex = 1
      this.getData(true)
    },

    /**
     * 分页
     */
    getData (firstLoading) {
      this.dataTable.tableOptions.loading = true
      const {
        orderBy,
        states,
        q,
        searchType,
        device,
        dateRange
      } = this.filterParams

      const params = {
        current: this.dataTable.pagingOptions.pageIndex,
        size: this.dataTable.pagingOptions.pageSize,
        orderBy,
        item: {
          shopCode: this.shopCode,
          states,
          q,
          device,
          searchType
        }
      }
      if (dateRange) {
        params.params.createTimeStart = dateRange[0]
        params.params.createTimeLimit = dateRange[1]
      }

      enquiry.inboxPaging(params)
        .then(result => {
          this.pageValid()
          this.dataTable.tableOptions.loading = false
          this.resultMessage(result, success => {
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
     * 修改跳转
     */
    updateEnquiry (row) {
      this.$router.push(`/${this.shopCode}/enquiry/inbox/update/${row.id}`)
    }
  }
}
</script>

<style lang="scss">
.enquiry-page {
  .fomille {
    font-size: 20px;
  }
  .select-option {
    display: flex;
    align-items: center;
    .fomille {
      font-size: 16px;
      margin-right: 10px;
    }
  }
}
</style>
