<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    :full-screen="true"
    v-title="$t('design.pageTitle')">
    <div class="design-canvas">
      <div :class="`design-sidebar ${editSectionStatus}`">
        <h3 class="design-sidebar-heading text-truncate">
          <a
            class="bs-exit-edit"
            href="javascript:void(0)"
            @click="exitDesign"
          ></a>
          {{shopConfig.template.title}}
        </h3>
        <tool-bar
          v-model="dataset"
          :shop-config="shopConfig"
          :snapshot="updateScreenShot"
          @design="designModel"
          @toolbar="changeToolbar"
          @updateSnapshot="updateSnapshot"
          @editing="editSection"
        >
        </tool-bar>
      </div>
      <div class="design-website">
        <div class="design-website-navigation">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-dropdown
                placement="top-start"
                @command="changePage">
                <label class="el-dropdown-link">
                  {{ pageData.title }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </label>
                <el-dropdown-menu class="page-list" slot="dropdown">
                  <el-dropdown-item
                    v-for="o in pages['systemPages']"
                    :key="o.id"
                    :command="o.id"
                  >
                    {{o.title}}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-for="(o, index) in pages['customPages']"
                    :key="o.id"
                    :command="o.id"
                    :divided="index === 0"
                  >
                    {{o.title}}
                  </el-dropdown-item>
                  <el-dropdown-item
                    divided
                    key="fo-add-custom-page"
                    command="fo-add-custom-page"
                  >
                    <i class="fo-add"></i>
                    {{ $t('design.addPage')}}
                  </el-dropdown-item>
                </el-dropdown-menu>

              </el-dropdown>
            </el-col>
            <el-col :span="8">
              <div class="design-nav-action">
                <i class="bs-mobile" @click="editSize(0, 'mobile')"></i>
                <i class="bs-desktop active" @click="editSize(1, 'desktop')"></i>
                <i class="bs-full-screen" @click="editSize(2, 'full')"></i>
              </div>
            </el-col>
            <el-col
              v-show="unsaved"
              :span="8">
              <el-button
                @click="saveChanges"
                size="small"
                type="primary"
              >{{$t('base.save')}}</el-button>
            </el-col>
          </el-row>
        </div>
        <div :class="`design-website-container ${editSectionStatus}`">
          <div class="design-website-content">
            <div class="design-website-wrapper">
              <iframe class="design-website-iframe" :src="`http://dev-preview-${shopTemplateCode}.mybuckyshop.com/index.html`" id="editor"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../plugins/page/unsaved'
import toolBar from './components/toolBar'
import * as http from '../../../plugins/api/theme'

export default {
  name: 'design',
  components: {
    toolBar
  },
  extends: extend,
  data () {
    return {
      pageURL: 'https://1209760082859032577-1254724793669640193.design.fomille.com/index.html',
      pages: {
        customPages: [],
        systemPages: []
      },
      dataset: {
        common: {
          footer: {
            data: {}
          },
          header: {
            data: {}
          }
        },
        config: {},
        page: {},
        shopCode: '',
        templateCode: ''
      },
      /**
       * 店铺配置 & Sections & Schema
       */
      shopConfig: {
        /**
         * 模版信息
         */
        template: {},
        /**
         * 通用组件（header & footer & floatMenu)
         */
        common: {},
        /**
         * Sections
         */
        section: {},
        /**
         * 系统配置
         */
        config: {
          /**
           * 字体等schema
           */
          schema: {
            Social: {},
            Colors: {},
            Checkout: {},
            Favicon: {},
            Typography: {},
            Cart: {}
          },
          /**
           * 主题配置
           */
          data: {
            /**
             * 主题配置
             */
            current: {
              Social: {},
              Colors: {},
              Checkout: {},
              Favicon: {},
              Typography: {},
              Cart: {}
            },
            /**
             * 模版信息
             */
            meta: {
            },
            /**
             * 模版图片
             */
            extras: {}
          }
        }
      },
      unionPages: [],
      pageDesignStatus: false,
      /**
       * 是否更新首页截屏
       */
      updateScreenShot: false,
      pageData: {
        title: 'Product Pages',
        previewUrl: ''
      },
      editSectionStatus: ''
    }
  },
  created () {
    this.pageValid()
    this.unsaved = true
    this.getData()
  },
  methods: {
    /**
     * 退出编回
     */
    exitDesign () {
      this.$confirm(this.$t('design.exit'), this.$t('base.opps'), {
        confirmButtonText: this.$t('base.leave'),
        cancelButtonText: this.$t('base.cancel')
      }).then(() => {
        this.$router.push(`/${this.shopCode}/themes`)
      })
    },
    /**
     * 设置编辑区域尺寸
     * @param value
     * @param index
     */
    editSize (index, value) {
      document.querySelectorAll('.design-nav-action i').forEach(function (o, i) {
        if (i === index) {
          o.classList.add('active')
        } else {
          o.classList.remove('active')
        }
      })
      if (value === 'full') {
        document.querySelector('.design-website').classList.add('full')
      } else {
        document.querySelector('.design-website').classList.remove('full')
      }
      const el = document.querySelector('.design-website-wrapper')
      el.className = 'design-website-wrapper ' + value
    },
    /**
     * 初始数据
     */
    getData () {
      this.loading = true
      this.axios.all([
        http.pages({
          shopCode: this.shopCode,
          templateCode: this.shopTemplateCode
        }),
        http.shopConfig({
          shopCode: this.shopCode,
          templateCode: this.shopTemplateCode
        })
      ])
        .then(this.axios.spread((result, config) => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.getPages(result.data)
              this.shopConfig = config.data
              this.dataset.config = config.data.config
              this.dataset.common = config.data.common
            }
          })
        }))
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 获取页面
     */
    getPages (data) {
      this.unionPages = this.unionPages.concat(data.systemPages, data.customPages)
      this.pages = data
      if (data.systemPages && data.systemPages.length > 0) {
        this.pageData = data.systemPages[0]
        this.pageURL = this.pageData.previewUrl
        this.getPageData(data.systemPages[0].pageCode)
      }
    },
    /**
     * 获取编辑页面的数据
     * @param pageCode
     */
    getPageData (pageCode) {
      if (pageCode && !this.utility.isEmpty(pageCode)) {
        http.pageDetail({
          shopCode: this.shopCode,
          templateCode: this.shopTemplateCode,
          pageCode: pageCode
        }).then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              result.data.modules.forEach((o) => {
                o.settings = o.settings || {}
                try {
                  if (!o.settings.sectionAlias) {
                    o.settings.sectionAlias = ''
                  }
                } catch (e) {
                  console.log(e, o)
                }
              })
              this.dataset.page = result.data
              this.dataset.shopCode = this.shopCode
              this.dataset.templateCode = this.shopTemplateCode
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 跟据浏览器URL切换页面和配置
     * @param data
     */
    designModel (data) {
      // if (!(data.pageType === this.pageData.pageType && data.pageId === this.pageData.id)) {
      //   this.pageDesignStatus = true
      //   this.changePage(data.pageId)
      // }
    },
    /**
     * 工具条位置
     * @param value
     */
    changeToolbar (value) {
      this.toolbarPosition = value
    },
    /**
     * 首页截屏
     */
    updateSnapshot () {
      this.updateScreenShot = false
    },
    /**
     * 编辑面板
     * @param status 是否编辑
     */
    editSection (status) {
      this.editSectionStatus = status ? 'edited' : ''
    },
    /**
     * 切换页面
     * @param id
     */
    changePage (id) {
      // if (id === 'fo-add-custom-page') {
      //   let o = window.open('', '_blank', '')
      //   o.location.href = `/site/${this.shopCode}/pages`
      // } else {
      //   let pages = this.unionPages.filter((o) => {
      //     return o.id === id
      //   })
      //   if (pages.length > 0) {
      //     this.pageData = pages[0]
      //     if (!this.pageDesignStatus) {
      //       this.pageURL = this.pageData['previewUrl'] + '?' + new Date().getTime()
      //     }
      //     this.pageDesignStatus = false
      //     this.getPageData(id)
      //   }
      // }
    },
    /**
     *  保存配置
     */
    saveChanges () {
      // this.dataset.templateId = this.themeId
      // this.datasource.builderConfigSave({
      //   shopCode: this.dataset.shopCode,
      //   templateId: this.dataset.templateId,
      //   current: this.dataset.current,
      //   layout: this.dataset.layout,
      //   page: {
      //     id: this.dataset.page.id,
      //     shopCode: this.dataset.page.shopCode,
      //     moduleList: this.dataset.page.moduleList
      //   }
      // })
      //   .then(result => {
      //     this.resultMessage(result, (success) => {
      //       if (success) {
      //         this.updateScreenShot = this.dataset.page.pageType === 'home'
      //         this.$message({
      //           message: this.$t('design.saveSuccess'),
      //           type: 'success'
      //         })
      //       }
      //     })
      //   })
      //   .catch(error => {
      //     this.networkMistake(error)
      //   })
    }
  }
}
</script>

<style scoped>

</style>
