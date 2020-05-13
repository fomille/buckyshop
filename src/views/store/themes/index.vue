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
          <p class="text-secondary">
            <label>
              ID
            </label>
            <label class="ml-2">
              {{ siteId }}
            </label>
          </p>
          <div class="publish-tips mt-5">
<!--            <a class="el-button absolutely el-button&#45;&#45;primary" :href="`/design/${siteId}/${entity.id}`" target="_blank">-->
<!--              {{ $t("store.theme.editWeb") }}-->
<!--            </a>-->
          </div>
          <div class="publish-tips mt-5">
<!--            <a class="el-button absolutely el-button&#45;&#45;default" :href="`https://${siteModel.domain}`" target="_blank">-->
<!--              {{ $t("store.theme.previewWeb") }}-->
<!--            </a>-->
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
      <template slot="header" v-if="themes.length < 5">
        <el-button @click="exploreVisible = true" size="small" class="float-right mt-5">
          {{ $t("store.theme.getFreeThemes") }}
        </el-button>
      </template>
      <el-table
        :data="themes"
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
            <router-link class="text-primary" :to="`/${langCode}/${shopCode}/store/${scope.row.id}/design`">
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
                <el-dropdown-item v-if="!scope.row.active" :command="{ data: scope.row, op: 'publish' }">{{ $t("store.theme.setDefaultTheme") }}</el-dropdown-item>
                <el-dropdown-item :command="{ data: scope.row, op: 'rename' }">{{ $t("base.rename") }}</el-dropdown-item>
                <!--                <el-dropdown-item :command="{ data: scope.row, op: 'duplicate' }">{{ $t("base.duplicate") }}</el-dropdown-item>-->
                <el-dropdown-item v-if="!scope.row.active" :command="{ data: scope.row, op: 'delete' }" divided>{{ $t("base.delete.button") }}</el-dropdown-item>
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
<!--    <explore-themes-->
<!--      @closeExplore="closeExplore"-->
<!--      :display="exploreVisible"-->
<!--    ></explore-themes>-->
  </page-loading>
</template>

<script>
import extend from '../../../plugins/page/base'
// import ExploreThemes from '../../../components/explore-themes'

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
      themes: [],
      updateModel: {},
      updateVisible: false,
      exploreVisible: false,
      tableLoading: false,
      siteId: ''
    }
  },
  methods: {
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
      this.datasource.templatePublish({
        id: id,
        siteId: this.siteId
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
        this.datasource.siteTemplateRename({
          id: data.id,
          title: value
        })
          .then(result => {
            result.options = {
              action: this.actionType.update,
              formName: 'update'
            }
            this.resultMessage(result, success => {
              if (success) {
                this.getSiteThemes()
                if (data.active) {
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
          siteId: this.siteId,
          templateId: data.id
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
       * 获取站点所有主题
       */
    getSiteThemes () {
      this.tableLoading = true
      this.datasource.siteThemeList({
        siteId: this.siteId
      })
        .then(result => {
          this.themes = result.data
          this.tableLoading = false
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
       * 数据请求
       */
    getData () {
      this.axios.all([
        this.datasource.siteThemeCurrent({
          siteId: this.siteId
        }),
        this.datasource.siteThemeList({
          siteId: this.siteId
        })
      ])
        .then(this.axios.spread((result, result1) => {
          this.pageValid()
          if (result.success) {
            this.getCurrentTheme(result)
            this.themes = result1.data
          } else {
            // this.errorMessage(result)
          }
        }))
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
       * 预览网站
       */
    previewSite (data) {
      this.utility.openSite(`http://${this.siteId}-${data.id}.design.fomille.com/`)
    }
  },
  created () {
    // this.getData()
    this.entity = this.updateModel = {
      active: true,
      author: 'devin',
      changed: true,
      createTime: 1587984677127,
      description: 'Regular',
      id: '1254724793669640193',
      image: 'https://site-file.fomillesite.com/000000/1254740324405596162.jpg',
      longImage: 'https://site-file.fomillesite.com/000000/1254742240534872065.jpg',
      mobileImage: '',
      myTitle: '',
      pcImage: '',
      screenShot: 'https://site-file.fomillesite.com/1209760082859032577/annex/1254751058413867010.png',
      siteId: '1209760082859032577',
      templateId: '100005',
      title: 'Regular',
      updateTime: 1587990938260,
      version: 'v1.0.0',
      shopUrl: 'https://ddddddd.fomillesite.com'
    }
    this.themes = [
      {
        active: false,
        author: '',
        changed: true,
        createTime: 1573711688132,
        description: 'Nothingness template',
        id: '1209760083001638914',
        image: 'https://site-file.fomillesite.com/000000/1239779685173514241.jpg',
        longImage: 'https://site-file.fomillesite.com/000000/1239779838882746369.jpg',
        mobileImage: '',
        myTitle: '',
        pcImage: '',
        screenShot: '',
        siteId: '1209760082859032577',
        templateId: '100002',
        title: 'Nothingness',
        styleName: 'Nothingness',
        updateTime: 1588072473844,
        version: ''
      },
      {
        active: false,
        author: '',
        changed: false,
        createTime: 1577788525635,
        description: '起航-第一套独立站模板',
        id: '1211959034677276673',
        image: 'https://site-file.fomillesite.com/0/001/img/001.jpg',
        longImage: 'https://site-file.fomillesite.com/0/001/img/001.long.jpg',
        mobileImage: '',
        myTitle: '',
        pcImage: '',
        screenShot: '',
        siteId: '1209760082859032577',
        templateId: '100000',
        title: 'Bauhinia',
        styleName: 'Nothingness',
        updateTime: 1583429776688,
        version: ''
      },
      {
        active: true,
        author: '',
        changed: true,
        createTime: 1587984677127,
        description: 'Regular',
        id: '1254724793669640193',
        image: 'https://site-file.fomillesite.com/000000/1254740324405596162.jpg',
        longImage: 'https://site-file.fomillesite.com/000000/1254742240534872065.jpg',
        mobileImage: '',
        myTitle: '',
        pcImage: '',
        screenShot: '',
        siteId: '1209760082859032577',
        templateId: '100005',
        title: 'Regular',
        styleName: 'Nothingness',
        updateTime: 1587990938260,
        version: ''
      }
    ]
    this.pageValid()
  }
}
</script>
