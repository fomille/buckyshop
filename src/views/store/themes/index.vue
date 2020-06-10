<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('store.theme.pageTitle')">
    <h3>
      {{ $t("store.theme.pageTitle") }}
    </h3>
    <page-block
      :heading="$t('store.theme.current.heading')"
      :subheading="$t('store.theme.current.subheading')"
    >
      <el-row
        :gutter="20"
        class="site-theme">
        <el-col :span="5">
          <h3>{{ entity.title }}</h3>
          <p class="clearfix">
            {{ utility.timestampToDatetime(entity.updateTime) }}
          </p>
          <div class="publish-tips mt-5">
            <a class="el-button absolutely el-button--primary" :href="`/${shopCode}/canvas/${entity.shopTemplateCode}`" target="_blank">
              {{ $t("store.theme.editWeb") }}
            </a>
          </div>
          <div class="publish-tips mt-5">
            <a class="el-button absolutely el-button--default" :href="`https://${entity.domain}`" target="_blank">
              {{ $t("store.theme.previewWeb") }}
            </a>
          </div>
          <!--          <div-->
          <!--            class="mt-7">-->
          <!--            <p-->
          <!--              v-if="entity.changed"-->
          <!--              class="text-warning">-->
          <!--              <i class="el-icon-warning"></i>-->
          <!--              {{$t('store.theme.changed.heading')}}-->
          <!--            </p>-->
          <!--            <el-button-->
          <!--              @click="publishSite(true)"-->
          <!--              class="absolutely"-->
          <!--              type="warning">-->
          <!--              {{$t('store.theme.changed.button')}}-->
          <!--            </el-button>-->
          <!--          </div>-->
        </el-col>
        <el-col
          :offset="1"
          :span="18">
          <div class="site-theme-web">
            <div class="screenShot-container scaled">
              <div class="screenShot-content">
                <div class="screenShot-wrapper">
                  <iframe class="screenShot-iframe" :src="entity.shopUrl"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="site-theme-app">
            <div class="screenShot-container scaled">
              <div class="screenShot-content">
                <div class="screenShot-wrapper screenShot-wrapper-mobile">
                  <iframe class="screenShot-iframe" :src="entity.shopUrl"></iframe>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </page-block>
    <page-block
      :heading="$t('store.theme.owned.heading')"
      :subheading="$t('store.theme.owned.subheading')"
    >
      <template slot="header" v-if="dataset.length < 5">
        <el-button @click="exploreVisible = true" size="small" class="float-right mt-5">
          {{ $t("store.theme.getFreeThemes") }}
        </el-button>
      </template>
      <el-table
        :data="dataset"
        v-loading="tableLoading"
        style="width: 100%">
        <el-table-column
          :label="$t('store.theme.tableHeader.title')"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('store.theme.tableHeader.styleName')"
        >
          <template slot-scope="scope">
            {{ scope.row.styleName }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('store.theme.tableHeader.updateTime')"
          width="180"
        >
          <template slot-scope="scope">
            {{ utility.timestampToDate(scope.row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column label="" width="100">
          <template slot-scope="scope">
            <router-link class="text-primary" :to="`/${shopCode}/canvas/${scope.row.shopTemplateCode}`">
              {{ $t("store.theme.editWeb") }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="" width="100">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link text-primary pointer">
                  {{ $t("base.more") }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <!--                <el-dropdown-item :command="{ data: scope.row, op: 'preview' }">{{ $t("base.preview") }}</el-dropdown-item>-->
                <el-dropdown-item v-if="scope.row.current === 0" :command="{ data: scope.row, op: 'publish' }">{{ $t("store.theme.setDefaultTheme") }}</el-dropdown-item>
                <el-dropdown-item :command="{ data: scope.row, op: 'rename' }">{{ $t("base.rename") }}</el-dropdown-item>
                <!--                <el-dropdown-item :command="{ data: scope.row, op: 'duplicate' }">{{ $t("base.duplicate") }}</el-dropdown-item>-->
                <el-dropdown-item v-if="scope.row.current === 0" :command="{ data: scope.row, op: 'delete' }" divided>{{ $t("base.delete.button") }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </page-block>
    <el-dialog
      :title="this.$t('store.theme.publish.title')"
      :visible.sync="updateVisible"
      :closeOnClickModal="false"
      @close="closePublish"
      width="630px">
      {{ this.$t('store.theme.publish.content') }}
      <div class="site-theme site-publish-theme">
        <img class="absolutely" :src="updateModel.image">
        <!--<div class="site-theme-web">-->
        <!--  <img class="absolutely" :src="updateModel.image">-->
        <!--</div>-->
        <!--<div class="site-theme-app">-->
        <!--  <img class="absolutely" :src="updateModel.app">-->
        <!--</div>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" :disabled="loading" @click="updateVisible = false">{{ this.$t('base.cancel') }}</el-button>
        <el-button size="small" :loading="loading" type="primary" @click="publishSite(false)">{{ this.$t('base.publish') }}</el-button>
      </div>
    </el-dialog>
<!--    <explore-dataset-->
<!--      @closeExplore="closeExplore"-->
<!--      :display="exploreVisible"-->
<!--    ></explore-dataset>-->
  </page-loading>
</template>

<script>
import extend from '../../../plugins/page/base'
// import ExploreThemes from '../../../components/explore-dataset'
import * as theme from '../../../plugins/api/theme'

export default {
  name: 'siteTheme',
  extends: extend,
  components: {
    // ExploreThemes
  },
  computed: {
    /**
       * 站点信息
       */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  data () {
    return {
      entity: {},
      dataset: [],
      updateModel: {},
      updateVisible: false,
      exploreVisible: false,
      tableLoading: false,
      shopCode: '',
      imageEntity: {
        url: '',
        alt: ''
      }
    }
  },
  methods: {
    updateAlt (value) {
      console.log('updateAlt', value)
    },
    getShop () {
      theme.shops({
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
       * 表格下拉菜单事件
       */
    handleCommand (command) {
      switch (command.op) {
        case 'preview':
          this.previewSite(command.data)
          break
        case 'duplicate':
          this.duplicateTheme(command.data)
          break
        case 'delete':
          this.removeTheme(command.data)
          break
        case 'publish':
          this.updateModel = command.data
          this.updateVisible = true
          break
        case 'rename':
          this.renameTheme(command.data)
          break
      }
    },
    /**
       * 复制主题
       */
    duplicateTheme (data) {
      this.$confirm(this.$t('store.theme.duplicate.content'), this.$t('store.theme.duplicate.title'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            this.datasource.templateDuplicate({
              id: data.id
            })
              .then(result => {
                result.options = {
                  success: this.$t('base.duplicateSuccess')
                }
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.getSiteThemes()
                  }
                })
                instance.confirmButtonLoading = false
                done()
              })
              .catch(error => {
                instance.confirmButtonLoading = false
                this.networkMistake(error)
                done()
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /**
       * 删除主题
       */
    removeTheme (data) {
      this.$confirm(this.$t('store.theme.delete.content'), this.$t('store.theme.delete.title'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            this.datasource.templateDelete({
              id: data.id
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete
                }
                this.resultMessage(result, () => {
                  this.getSiteThemes()
                })
                instance.confirmButtonLoading = false
                done()
              })
              .catch(error => {
                instance.confirmButtonLoading = false
                this.networkMistake(error)
                done()
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /**
       * 关闭发布主题弹窗
       */
    closePublish () {
      this.loading = false
    },
    /**
       * 发布选择
       */
    publishSite (isDefault) {
      this.publishTheme(isDefault ? this.entity.id : this.updateModel.id, isDefault)
    },
    /**
       * 发布主题
       */
    publishTheme (id, isDefault) {
      this.loading = true
      theme.templateUpdate({
        shopTemplateCode: this.shopTemplateCode,
        shopCode: this.shopCode
      })
        .then(result => {
          this.updateVisible = false
          result.options = {
            success: this.$t('base.publishSuccess')
          }
          this.resultMessage(result, success => {
            if (success) {
              // this.entity.changed = false
              // if (!isDefault) {
              //   this.entity = JSON.parse(JSON.stringify(this.updateModel))
              // }
              this.getData()
            }
          })
        })
        .catch(error => {
          this.updateVisible = false
          this.networkMistake(error)
        })
    },
    /**
       * 修改模版名称
       */
    renameTheme (data) {
      this.$prompt(this.$t('store.theme.rename.content'), this.$t('store.theme.rename.title'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        closeOnClickModal: false,
        inputValue: data.title,
        inputPattern: /^.{0,32}$/,
        inputPlaceholder: this.$t('store.theme.rename.placeholder'),
        inputErrorMessage: this.$t('store.theme.rename.error')
      }).then(({ value }) => {
        theme.templateUpdate({
          shopCode: data.shopCode,
          shopTemplateCode: data.shopTemplateCode,
          current: data.current,
          title: value
        })
          .then(result => {
            result.options = {
              action: this.actionType.update,
              formName: 'update'
            }
            this.resultMessage(result, success => {
              if (success) {
                this.getData()
                if (data.current === 1) {
                  this.entity.title = value
                }
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      })
    },
    /**
       * 关闭模版弹窗
       */
    closeExplore (data, func) {
      if (data) {
        this.datasource.templateApply({
          shopCode: this.shopCode,
          templateCode: data.id
        })
          .then(result => {
            this.exploreStatus(func)
            result.options = {
              success: this.$t('base.addition.success')
            }
            this.resultMessage(result, success => {
              if (success) {
                this.getSiteThemes()
              }
            })
          })
          .catch(error => {
            this.exploreStatus(func)
            this.networkMistake(error)
          })
      } else {
        this.exploreStatus(func)
      }
    },
    /**
       * 免费主题弹窗关闭
       */
    exploreStatus (func) {
      this.exploreVisible = false
      if (func && typeof (func) === 'function') {
        func.call(this)
      }
    },
    /**
       * 获取当前主题
       */
    getCurrentTheme (result) {
      if (result.success) {
        this.entity = result.data
        this.unsaved = false
        // console.log(JSON.stringify(this.entity))
      } else {
        // this.errorMessage(result)
      }
    },
    /**
       * 数据请求
       */
    getData () {
      theme.shopTemplate({
        shopCode: this.shopCode
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
              result.data.forEach((o) => {
                if (o.current === 1) {
                  this.entity = o
                }
              })
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
       * 预览网站
       */
    previewSite (data) {
      this.utility.openSite(`http://${this.shopCode}-${data.id}.design.fomille.com/`)
    }
  },
  created () {
    this.getData()
    this.pageValid()
    // this.getShop()
  }
}
</script>
