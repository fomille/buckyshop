<template>
  <div class="design-section-panel">
    <el-tabs
      @tab-click="tabSlide"
      v-model="activeName">
      <el-tab-pane label="Sections" name="first">
        <div class="split">
          <label>Default</label>
        </div>
        <!-- header -->
        <template
          v-if="dataset.page.includeHeader && shopConfig.section.header"
        >
          <section-element
            key="section-page-header"
            :schema="shopConfig.section.header.schema"
            v-model="dataset.common.header"
            :display-visible="true"
            :section-index="-22"
            :id="dataset.common.header.resourceCode"
            :source-group="shopConfig.section.header.resourceGroup"
            :active="editSectionCode === dataset.common.header.resourceCode"
            @display="openSettingPanel"
            @message="sendMessage"
            @visible="sectionVisible"
          >
          </section-element>
        </template>
        <div class="split mt-3 mb-3">
          <label>This page</label>
        </div>
        <!-- page module list -->
        <draggable
          handle=".section-element-move"
          :list="dataset.page.modules"
          @start="draggableStart"
          @end="draggableEnd"
          :move="draggableMoving"
        >
          <template v-for="(o, index) in dataset.page.modules">
            <section-element
              v-if="shopConfig.section[o.resourceType]"
              :schema="shopConfig.section[o.resourceType].schema"
              :key="o.pageModuleCode"
              :id="o.pageModuleCode"
              :sort="true"
              :source-group="shopConfig.section[o.resourceType].resourceGroup"
              :active="editSectionCode === dataset.page.modules[index].pageModuleCode"
              :display-visible="true"
              :section-index="index"
              v-model="dataset.page.modules[index]"
              @display="openSettingPanel"
              @message="sendMessage"
              @delete="removeSection"
              @visible="sectionVisible"
            >
            </section-element>
          </template>
        </draggable>
        <div
          v-if="dataset.page.addable === 1"
          class="section-addable"
          @click="changeSectionVisible"
        >
          + Add Sections
        </div>
        <div
          v-if="dataset.page.addable === 1 && sectionPasteVisible"
          class="section-addable no-top"
          @click="pasteFormClipboard"
        >
          Paste form clipboard
        </div>
        <div class="split">
          <label>Default</label>
        </div>
        <template
          v-if="dataset.page.includeHeader && shopConfig.section.footer"
        >
          <section-element
            key="section-page-footer"
            :schema="shopConfig.common.footer.schema"
            v-model="dataset.common.footer"
            :display-visible="true"
            :section-index="-21"
            :id="dataset.common.footer.resourceCode"
            :source-group="shopConfig.section.footer.resourceGroup"
            :active="editSectionCode === dataset.common.footer.resourceCode"
            @display="openSettingPanel"
            @message="sendMessage"
            @visible="sectionVisible"
          >
          </section-element>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Theme" name="second">
        <template v-for="(o, index) in shopConfig.config.schema">
          <template
            v-if="o.settings && o.settings.length > 0"
          >
<!--            {{dataset.config.data.current[index]}}-->
<!--            {{`setting-${index}`}}&#45;&#45;{{editSectionCode}}-->
            <section-element
              :id="`setting-${index}`"
              :key="`section-theme-${index}`"
              :schema="o"
              source-group=""
              :active="editSectionCode === `setting-${index}`"
              v-model="dataset.config.data.current[index].data"
              @display="openSettingPanel"
              @message="sendMessage"
            >
            </section-element>
          </template>
        </template>
        <el-row :gutter="10" class="mt-6 copyright">
          <el-col :span="20" :offset="2">
            {{shopConfig.template.title}}
          </el-col>
          <el-col :span="20" :offset="2">
            Design and support by BuckyShop
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加组件 -->
    <section-picker
      v-if="dataset.page.addable === 1"
      :visible="newSectionVisible"
      :schema="shopConfig.section"
      :sections="dataset.page.modules"
      @close="closeSection"
      @add="addSection"
    >
    </section-picker>

    <div :class="`design-settings animated ${editSectionCode === '' ? '' : 'active'}`">
      <!-- header -->
      <template
        v-if="dataset.page.includeHeader && shopConfig.section.header && editSectionCode === dataset.common.header.resourceCode"
      >
        <section-setting
          key="section-page-header"
          :message-status="messageStatus"
          :shop-code="shopCode"
          :id="dataset.common.header.resourceCode"
          :template-code="dataset.templateCode"
          :resource-code="shopConfig.section.header.resourceCode"
          :resource-type="shopConfig.section.header.resourceType"
          :schema="shopConfig.section.header.schema"
          v-model="dataset.common.header.data"
          @close="closeSettingPanel"
          @message="updateSettings"
          @remove="removeSection"
        >
        </section-setting>
      </template>
      <template
        v-if="dataset.page.includeFooter && shopConfig.section.footer && editSectionCode === dataset.common.footer.resourceCode"
      >
        <section-setting
          key="section-page-footer"
          :id="dataset.common.footer.resourceCode"
          :message-status="messageStatus"
          :shop-code="shopCode"
          :template-code="dataset.templateCode"
          :schema="shopConfig.section.footer.schema"
          :resource-code="shopConfig.section.footer.resourceCode"
          :resource-type="shopConfig.section.footer.resourceType"
          v-model="dataset.common.footer.data"
          @close="closeSettingPanel"
          @message="updateSettings"
          @remove="removeSection"
        >
        </section-setting>
      </template>

      <template v-for="o in dataset.page.modules">
        <section-setting
          v-if="editSectionCode === o.pageModuleCode"
          :schema="shopConfig.section[o.resourceType].schema"
          :id="o.pageModuleCode"
          :key="o.pageModuleCode"
          :message-status="messageStatus"
          :resource-code="shopConfig.section[o.resourceType].resourceCode"
          :resource-type="shopConfig.section[o.resourceType].resourceType"
          :shop-code="shopCode"
          :template-code="dataset.templateCode"
          v-model="o.data"
          @close="closeSettingPanel"
          @message="updateSettings"
          @remove="removeSection"
          @copy="copySection"
          @copyToClip="copyToClip"
        >
        </section-setting>
      </template>

      <!-- settings -->
      <template v-for="(o, index) in shopConfig.config.schema">
        <section-setting
          v-if="editSectionCode === `setting-${index}` && o.settings && o.settings.length > 0"
          :id="`setting-${index}`"
          :key="`setting-theme-${index}`"
          :message-status="messageStatus"
          :shop-code="shopCode"
          :resource-type="index"
          :template-code="dataset.templateCode"
          :schema="o"
          v-model="dataset.config.data.current[index].data"
          @close="closeSettingPanel"
          @message="updateSettings"
          @remove="removeSection"
        >
        </section-setting>
      </template>
    </div>
  </div>
</template>

<script>
import extend from '../../../../plugins/page/base'
import SectionElement from './SectionElement'
import SectionSetting from './SectionSetting'
import SectionPicker from './SectionPicker'
import Draggable from 'vuedraggable'

export default {
  name: 'section',
  extends: extend,
  components: {
    SectionElement,
    SectionPicker,
    SectionSetting,
    Draggable
  },
  data () {
    return {
      displaySection: true,
      imageURL: '',
      toolbarPosition: 'left',
      activeName: 'first',
      dataset: {
        common: {
          footer: {
            data: {}
          },
          header: {
            data: {}
          }
        },
        page: {
          includeFooter: 1,
          includeHeader: 1,
          modules: []
        },
        config: {
          data: {
            current: {
              Colors: {},
              General: {},
              Typography: {}
            }
          }
        },
        shopCode: '',
        templateCode: ''
      },
      /**
       * 通知消息
       */
      messageStatus: {},
      editSectionCode: '',
      /**
       * 选择
       */
      selector: {
        section: ''
      },
      targetOrigin: '',
      newSectionVisible: false,
      collectionCode: '',
      spuCode: '',
      /**
       * section 临时ID
       */
      sectionTemplateId: '',
      /**
       * 组件粘贴
       */
      sectionPasteVisible: false,
      /**
       * 页面组件复制
       */
      pagePasteVisible: false
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    shopConfig: {
      type: Object,
      default: () => {}
    },
    /**
     * 是否更新首页截屏
     */
    snapshot: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.setOrigin()
        // console.log('变更', JSON.stringify(val.page))
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.dataset = this.value
    window.addEventListener('message', (e) => {
      this.clientCallMessage(e)
    }, false)
    const toolbar = localStorage.getItem('toolbar')
    if (toolbar) {
      this.toolbarPosition = toolbar
    }
  },
  methods: {
    /**
     * 从剪贴板中粘贴
     */
    pasteFormClipboard () {
      let sectionCache = localStorage.getItem(this.global.sectionClipKey)
      if (sectionCache) {
        sectionCache = JSON.parse(sectionCache)
        const schema = this.shopConfig.section[sectionCache.resourceType]
        if (schema) {
          console.log('pasteFormClipboard', schema)
          sectionCache.pageModuleCode = `design-preview-${new Date().getTime()}`
          sectionCache.pageCode = this.dataset.page.pageCode
          this.copySection(sectionCache, 1)
        }
      }
    },
    /**
     * copy section
     * @param data
     * @param closePanel 关闭参数面板
     */
    copySection (data, closePanel) {
      this.sendMessage({
        action: 'addSection',
        data: {
          official: true,
          pageModuleCode: data.pageModuleCode,
          resourceType: data.resourceType,
          resourceCode: data.resourceCode,
          shopCode: data.shopCode,
          templateCode: data.templateCode,
          pageCode: this.dataset.page.pageCode,
          data: data.data,
          visible: true
        }
      })
      const model = {
        data: data.data,
        hidden: 0,
        pageCode: this.dataset.page.pageCode,
        pageModuleCode: data.pageModuleCode,
        pageType: this.dataset.page.pageType,
        resourceCode: data.resourceCode,
        resourceType: data.resourceType,
        sort: this.dataset.page.modules.length + 1
      }
      const m = this.dataset.page.modules.filter((o) => {
        return o.pageModuleCode === model.pageModuleCode
      })
      if (m.length === 0) {
        this.dataset.page.modules.push(JSON.parse(JSON.stringify(model)))
      }
      this.tabSlide()
      this.newSectionVisible = false
    },
    /**
     * 复制到剪贴版
     */
    copyToClip (data) {
      const schema = this.shopConfig.section[data.resourceType]
      if (schema) {
        localStorage.setItem(this.global.sectionClipKey, JSON.stringify(data))
        this.sectionPasteVisible = true
        this.$message({
          type: 'success',
          message: this.$t('design.copySucceeded')
        })
      }
    },
    /**
     * 设置项切换
     */
    tabSlide () {
      this.editSectionCode = ''
      this.$emit('editing', false)
    },
    /**
     * 关闭添加section的窗体
     */
    closeSection () {
      this.newSectionVisible = false
      this.removeSection('', '', false)
    },
    /**
     * 关闭设置面板
     */
    closeSettingPanel () {
      this.tabSlide()
    },
    /**
     * 添加section
     */
    changeSectionVisible () {
      this.newSectionVisible = true
    },
    /**
     * 更新锚点配置预览
     * 寻找锚点组件和锚钉，更新其配置
     */
    updateSettings (data) {
      data.data.pageType = this.dataset.page.pageType
      if (data.data.moduleType === 'anchorPin') {
        this.anchorNavigation()
      }
      this.sendMessage(data)
    },
    /**
     * 添加section
     * @param sectionType 类型
     * @param official 是否正式添加
     */
    addSection (sectionType, official) {
      if (this.shopConfig.section[sectionType]) {
        // console.log('addSection', JSON.stringify(this.shopConfig.section[sectionType]))
        const code = `design-preview-${new Date().getTime()}`
        this.sendMessage({
          action: 'addSection',
          data: {
            official: official,
            pageModuleCode: code,
            resourceType: sectionType,
            resourceCode: this.shopConfig.section[sectionType].resourceCode,
            shopCode: this.dataset.page.shopCode,
            templateCode: this.dataset.page.templateCode,
            pageCode: this.dataset.page.pageCode,
            data: this.shopConfig.section[sectionType].data,
            visible: true
          }
        })
      }
    },
    /**
     * 开始拖动
     * @param evt
     */
    draggableStart: function (evt) {
      document.querySelector('.design-canvas').classList.add('scaled')
      this.sendMessage({
        action: 'draggableStart',
        data: {
          dragged: evt.item.dataset.id
        }
      })
    },
    /**
     * 拖完
     * @param evt
     */
    draggableEnd: function (evt) {
      document.querySelector('.design-canvas').classList.remove('scaled')
      this.sendMessage({
        action: 'draggableEnd',
        data: {
          dragged: evt.clone.dataset.id
        }
      })
    },
    /**
     * 拖动中
     * @param evt
     */
    draggableMoving: function (evt) {
      this.sendMessage({
        action: 'draggableMoving',
        data: {
          dragged: evt.draggedContext.element.pageModuleCode,
          related: evt.relatedContext.element.pageModuleCode,
          after: evt.willInsertAfter
        }
      })
    },
    /**
     * 组件显示状态
     * @param data
     */
    sectionVisible (data) {
      // data.templateId = this.dataset.templateId
      // data.siteId = this.dataset.page.siteId
      // // console.log('visible message', JSON.stringify(data))
      // this.sendMessage({
      //   action: 'visible',
      //   data: data
      // })
    },
    /**
     * 发送post message通知
     * @param data
     */
    sendMessage (data) {
      if (data.action && data.action === 'update') {
        data.data.collectionCode = this.collectionCode || ''
        data.data.spuCode = this.spuCode || ''
        data.data.pageCode = this.dataset.page.pageCode
        data.data.dynamic = true
      }
      const editor = this.getEditor()
      if (editor) {
        // console.log('send', data)
        editor.postMessage(data, this.targetOrigin)
      }
    },
    /**
     * 获取编辑器
     * @returns {null|Window}
     */
    getEditor () {
      const editor = document.getElementById('editor')
      if (editor && editor.contentWindow) {
        return editor.contentWindow
      }
      return null
    },
    /**
     * 客户端执行后回调通知
     */
    clientCallMessage (e) {
      if (e.data.design) {
        // console.log('call', JSON.stringify(e.data.message))
        this.messageStatus = e.data.message
        switch (e.data.message.action) {
          case 'addSection':
            this.addSectionExecute(e.data.message)
            break
          case 'removeSection':
            this.removeSectionExecute(e.data.message)
            break
          case 'design':
            this.collectionCode = e.data.message.collectionCode
            this.spuCode = e.data.message.spuCode
            this.initPanel()
            this.$emit('design', e.data.message)
            break
        }
      }
    },
    /**
     * 切换页面时，初始化设置面板
     */
    initPanel () {
      this.displaySection = true
      this.tabSlide()
      this.closeSection()
      this.sendMessage({
        action: 'update',
        data: {
          resourceType: 'colors',
          data: this.dataset.config.data.current.Colors.data,
          shopCode: this.dataset.page.shopCode,
          templateCode: this.dataset.page.templateCode
        }
      })
      this.sendMessage({
        action: 'update',
        data: {
          resourceType: 'typography',
          data: this.dataset.config.data.current.Typography.data,
          shopCode: this.dataset.page.shopCode,
          templateCode: this.dataset.page.templateCode
        }
      })
      if (this.dataset.config.data.current.General) {
        this.sendMessage({
          action: 'update',
          data: {
            resourceType: 'general',
            data: this.dataset.config.data.current.General.data,
            shopCode: this.dataset.page.shopCode,
            templateCode: this.dataset.page.templateCode
          }
        })
      }
    },
    /**
     * 删除Section [客户端删除成功回调执行]
     * @param result
     */
    removeSectionExecute (result) {
      if (result.official) {
        this.dataset.page.modules.forEach((o, index) => {
          if (o.pageModuleCode === result.id) {
            this.dataset.page.modules.splice(index, 1)
            if (o.resourceType === 'anchorPin') {
              this.anchorNavigation(() => {
                this.dataset.page.modules.splice(index, 1)
              })
            }
          }
        })
        this.closeSettingPanel()
      }
    },
    /**
     * 显示对应的设置参数
     * @param id
     * @param sectionIndex
     */
    openSettingPanel (id, sectionIndex) {
      this.editSectionCode = id
      this.$emit('editing', id !== '')
    },
    /**
     * 正式添加section [客户端添加功能回调]
     */
    addSectionExecute (result) {
      const sectionSchema = this.shopConfig.section[result.resourceType]
      if (result.official && sectionSchema) {
        const data = {
          data: sectionSchema.data,
          hidden: 0,
          pageCode: this.dataset.page.pageCode,
          pageModuleCode: result.pageModuleCode,
          pageType: this.dataset.page.pageType,
          resourceCode: sectionSchema.resourceCode,
          resourceType: result.resourceType,
          sort: this.dataset.page.modules.length + 1
        }
        // console.log('add', JSON.stringify(data))
        const m = this.dataset.page.modules.filter((o) => {
          return o.pageModuleCode === data.pageModuleCode
        })
        if (m.length === 0) {
          this.dataset.page.modules.push(JSON.parse(JSON.stringify(data)))
        }
        if (result.official && result.resourceType === 'anchorPin') {
          this.anchorNavigation()
        }
        this.newSectionVisible = false
      }
    },
    /**
     * 锚钉导航菜单数据
     */
    anchorNavigation () {
      const pins = []
      let sectionIndex = -1
      this.dataset.page.modules.forEach((o, index) => {
        if (o.resourceType === 'anchorPin') {
          pins.push({
            id: o.pageModuleCode,
            title: o.settings.title
          })
        }
        if (o.resourceType === 'anchorNavigation') {
          sectionIndex = index
        }
      })
      if (sectionIndex > -1) {
        this.dataset.page.modules[sectionIndex].data.dataset.menus.data = pins
        this.sendMessage({
          action: 'update',
          data: {
            data: this.dataset.page.modules[sectionIndex].data,
            hidden: 0,
            pageCode: this.dataset.page.pageCode,
            pageModuleCode: this.dataset.page.modules[sectionIndex].pageModuleCode,
            pageType: this.dataset.page.pageType,
            resourceCode: this.dataset.page.modules[sectionIndex].resourceCode,
            resourceType: this.dataset.page.modules[sectionIndex].resourceType,
            sort: this.dataset.page.modules.length + 1
          }
        })
      }
    },
    /**
     * 删除Section [通知客户端]
     * @param id
     * @param official
     */
    removeSection (id, official) {
      this.sendMessage({
        action: 'removeSection',
        data: {
          official: official,
          id: id
        }
      })
    },
    setOrigin () {
      this.targetOrigin = this.dataset.page.url
    }
  }
}
</script>

<style scoped>

</style>
