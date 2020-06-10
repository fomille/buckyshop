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
            v-model="dataset.common.header.data"
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
              v-model="o.data"
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
        <div class="split">
          <label>Default</label>
        </div>
        <template
          v-if="dataset.page.includeHeader && shopConfig.section.footer"
        >
          <section-element
            key="section-page-footer"
            :schema="shopConfig.common.footer.schema"
            v-model="dataset.common.footer.data"
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
          <section-element
            v-if="o.settings && o.settings.length > 0"
            :id="`setting-${index}`"
            :key="`section-theme-${index}`"
            :schema="o"
            source-group=""
            :active="editSectionCode === `setting-${index}`"
            :model="dataset.current"
            @display="openSettingPanel"
            @message="sendMessage"
          >
          </section-element>
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

    <div :class="`design-settings ${editSectionCode === '' ? '' : 'active'}`">
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
          :shop-code="shopCode"
          :template-code="dataset.templateCode"
          v-model="o.data"
          @close="closeSettingPanel"
          @message="updateSettings"
          @remove="removeSection"
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
        config: {},
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
      dataId: '',
      collectionId: '',
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
        // console.log('变更', JSON.stringify(this.shopConfig))
      },
      immediate: true,
      deep: true
    },
    dataId (newVal) {
      if (newVal.indexOf('?') > -1) {
        this.dataId = newVal.split('?')[0]
      }
    },
    snapshot (newVal) {
      // console.log('snapshot', newVal)
      if (newVal) {
        this.screenShot()
      }
    }
  },
  methods: {
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
      // data.data.pageType = this.dataset.page.pageType
      // if (data.data.moduleType === 'anchorPin') {
      //   this.anchorNavigation()
      // }
      // this.sendMessage(data)
    },
    /**
     * 添加section
     * @param sectionType 类型
     * @param official 是否正式添加
     */
    addSection (sectionType, official) {
      console.log('addSection', sectionType)
      if (this.schema.schema.section[sectionType]) {
        // this.getId(official, (id) => {
        //   // console.log(JSON.stringify({
        //   //   action: 'addSection',
        //   //   data: {
        //   //     id: id,
        //   //     official: official,
        //   //     moduleType: sectionType,
        //   //     settings: this.schema.schema.section[sectionType].settings,
        //   //     template: this.schema.schema.section[sectionType].frontTemplate,
        //   //     visible: true
        //   //   }
        //   // }))
        //   this.sendMessage({
        //     action: 'addSection',
        //     data: {
        //       id: id,
        //       official: official,
        //       moduleType: sectionType,
        //       settings: this.schema.schema.section[sectionType].settings,
        //       template: this.schema.schema.section[sectionType].frontTemplate,
        //       visible: true
        //     }
        //   })
        // })
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
        if (this.dataId.indexOf('?') > -1) {
          this.dataId = this.dataId.split('?')[0]
        }
        data.data.dataId = this.dataId
        data.data.collectionId = this.collectionId
      }
      const editor = this.getEditor()
      if (editor) {
        // console.log(JSON.stringify(data))
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
     * 推送截图信息
     */
    screenShot () {
      // console.log('发送截图命令', JSON.stringify({
      //   templateId: this.dataset.templateId,
      //   siteId: this.dataset.page.siteId
      // }))
      // this.sendMessage({
      //   action: 'screenShot',
      //   data: {
      //     templateCode: this.dataset.templateCode,
      //     shopCode: this.dataset.page.shopCode
      //   }
      // })
    },
    /**
     * 客户端执行后回调通知
     */
    clientCallMessage (e) {
      if (e.data.foBuilder) {
        this.messageStatus = e.data.message
        switch (e.data.message.action) {
          case 'addSection':
            this.addSectionExecute(e.data.message)
            break
          case 'removeSection':
            this.removeSectionExecute(e.data.message)
            break
          case 'design':
            this.dataId = e.data.message.dataId
            this.collectionId = e.data.message.collectionId
            this.initPanel()
            this.$emit('design', e.data.message)
            break
          case 'screenShot':
            this.saveScreenShot(e.data.message.data)
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
      // document.querySelector('.editor-settings').classList.add('active')
      // document.querySelector('.editor-section-panel').classList.remove('active')
      // this.sendMessage({
      //   action: 'update',
      //   data: {
      //     resourceType: 'colors',
      //     settings: this.dataset.current.colors.settings,
      //     siteId: this.dataset.page.siteId,
      //     templateId: this.dataset.templateId
      //   }
      // })
      // this.sendMessage({
      //   action: 'update',
      //   data: {
      //     resourceType: 'typography',
      //     settings: this.dataset.current.typography.settings,
      //     siteId: this.dataset.page.siteId,
      //     templateId: this.dataset.templateId
      //   }
      // })
      // if (this.dataset.current.general) {
      //   this.sendMessage({
      //     action: 'update',
      //     data: {
      //       resourceType: 'general',
      //       settings: this.dataset.current.general.settings,
      //       siteId: this.dataset.page.siteId,
      //       templateId: this.dataset.templateId
      //     }
      //   })
      // }
    },
    /**
     * 更新截图
     */
    saveScreenShot (data) {
      // this.datasource.screenShot(data)
      //   .then(result => {
      //     this.$emit('updateSnapshot')
      //     if (result.success) {
      //     }
      //   })
      //   .catch(error => {
      //     console.log('save screenshot', error)
      //   })
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
      this.$emit('editing', true)
    },
    /**
     * 正式添加section [客户端添加功能回调]
     */
    addSectionExecute (result) {
      const sectionSchema = this.schema.schema.section[result.resourceType]
      if (result.official && sectionSchema) {
        const data = {
          id: result.id,
          moduleId: sectionSchema.id,
          resourceType: result.resourceType,
          pageId: this.dataset.page.id,
          frontTemplate: sectionSchema.frontTemplate,
          settings: sectionSchema.settings,
          dynamic: sectionSchema.dynamic,
          visible: true
        }
        if (!sectionSchema.settings.sectionAlias) {
          sectionSchema.settings.sectionAlias = ''
        }
        const m = this.dataset.page.moduleList.filter((o) => {
          return o.id === data.id
        })
        if (m.length === 0) {
          this.dataset.page.moduleList.push(JSON.parse(JSON.stringify(data)))
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
      this.dataset.page.moduleList.forEach((o, index) => {
        if (o.resourceType === 'anchorPin') {
          pins.push({
            id: o.id,
            title: o.settings.title
          })
        }
        if (o.resourceType === 'anchorNavigation') {
          sectionIndex = index
        }
      })
      if (sectionIndex > -1) {
        this.dataset.page.moduleList[sectionIndex].settings.dataset.menus.data = pins
        const sectionType = 'anchorNavigation'
        this.sendMessage({
          action: 'update',
          data: {
            resourceType: 'anchorNavigation',
            siteId: this.dataset.siteId,
            templateId: this.dataset.page.moduleList[sectionIndex].templateId,
            frontTemplate: this.schema.schema.section[sectionType].frontTemplate,
            dynamic: false,
            settings: this.dataset.page.moduleList[sectionIndex].settings,
            id: this.dataset.page.moduleList[sectionIndex].id
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
    this.targetOrigin = `https://${this.siteId}-${this.dataset.templateId}.design.fomille.com/`
  }
}
</script>

<style scoped>

</style>
