<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    :full-screen="true"
    v-title="$t('design.home.pageTitle')">
    <div class="design-canvas">
      <div class="design-sidebar">
        <h3 class="design-sidebar-heading text-truncate">
          <a class="bs-exit-edit" href=""></a>
          Today, chemical manufacturers striving to secure
        </h3>
        <element-section></element-section>
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
                    {{ $t('design.home.addPage')}}
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
        <div class="design-website-container">
          <div class="design-website-content">
            <div class="design-website-wrapper">
              <iframe class="design-website-iframe" :src="pageURL" id="editor"></iframe>
            </div>
          </div>
          <div class="design-settings active">
            <div style="border: 2px solid blue;height: 3000px">
              design-settings
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../plugins/page/unsaved'
import ElementSection from './components/section'
export default {
  name: 'design',
  components: {
    ElementSection
  },
  extends: extend,
  data () {
    return {
      pageURL: 'https://1209760082859032577-1254724793669640193.design.fomille.com/index.html',
      pages: {
        customPages: [
          {
            h1Title: '',
            id: '1254715926109872130',
            isCustom: true,
            pageType: 'custom',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/pages/1254715926109872130.html',
            seoTitle: '',
            title: 'About us'
          },
          {
            h1Title: '',
            id: '1255092823015972866',
            isCustom: true,
            pageType: 'custom',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/pages/1255092823015972866.html',
            seoTitle: '',
            title: 'dddddd'
          }
        ],
        systemPages: [
          {
            h1Title: '',
            id: '1209760091058896897',
            isCustom: false,
            pageType: 'home',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/index.html',
            seoTitle: '',
            title: '首页'
          },
          {
            h1Title: '',
            id: '1209760091058896906',
            isCustom: false,
            pageType: 'articleDetail',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/articles/detail/builder-example-article.html',
            seoTitle: '',
            title: '文章详情'
          },
          {
            h1Title: '',
            id: '1209760091058896909',
            isCustom: false,
            pageType: 'article',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/articles/index.html',
            seoTitle: '',
            title: '文章列表'
          },
          {
            h1Title: '',
            id: '1209760091063091202',
            isCustom: false,
            pageType: 'articleCollection',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/articles/collections/index.html',
            seoTitle: '',
            title: '文章集合'
          },
          {
            h1Title: '',
            id: '1209760091063091205',
            isCustom: false,
            pageType: 'productDetail',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/products/detail/builder-example-product.html',
            seoTitle: '',
            title: '商品详情'
          },
          {
            h1Title: '',
            id: '1209760091063091210',
            isCustom: false,
            pageType: 'product',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/products/index.html',
            seoTitle: '',
            title: '商品列表'
          },
          {
            h1Title: '',
            id: '1209760091063091213',
            isCustom: false,
            pageType: 'productCollection',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/products/collections/index.html',
            seoTitle: '',
            title: '商品集合'
          },
          {
            h1Title: '',
            id: '1209760091063091216',
            isCustom: false,
            pageType: 'search',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/search.html',
            seoTitle: '',
            title: '搜索'
          },
          {
            h1Title: '',
            id: '1209760091063091218',
            isCustom: false,
            pageType: 'thanks',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/thanks.html',
            seoTitle: '',
            title: '感谢页'
          },
          {
            h1Title: '',
            id: '1209760091063091220',
            isCustom: false,
            pageType: 'pageNotFound',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/404.html',
            seoTitle: '',
            title: '404'
          },
          {
            h1Title: '',
            id: '1209760091063091222',
            isCustom: false,
            pageType: 'outOfService',
            previewUrl: 'https://1209760082859032577-1254724793669640193.design.fomille.com/out-of-service.html',
            seoTitle: '',
            title: '网站停用'
          }
        ]
      },
      pageDesignStatus: false,
      /**
       * 是否更新首页截屏
       */
      updateScreenShot: false,
      pageData: {
        title: 'Product Pages'
      }
    }
  },
  created () {
    this.pageValid()
    this.unsaved = true
  },
  methods: {
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
     * 切换页面
     * @param id
     */
    changePage (id) {
      // if (id === 'fo-add-custom-page') {
      //   let o = window.open('', '_blank', '')
      //   o.location.href = `/site/${this.siteId}/pages`
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
      //   siteId: this.dataset.siteId,
      //   templateId: this.dataset.templateId,
      //   current: this.dataset.current,
      //   layout: this.dataset.layout,
      //   page: {
      //     id: this.dataset.page.id,
      //     siteId: this.dataset.page.siteId,
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
