<template>
  <div
    :data-id="model && model.pageModuleCode ? model.pageModuleCode : ''"
    :class="`section-element ${schema.type} ${active ? 'active' : ''}`"
  >
    <el-row>
      <el-col
        :span="3"
        class="text-center"
        @click.native="displaySetting"
      >
        <template
          v-if="schema.icon && schema.icon.indexOf('/') > 0"
        >
          <img :src="schema.icon">
        </template>
        <template v-else>
          <i :class="schema.icon"></i>
        </template>
      </el-col>
      <el-col
        @click.native="displaySetting"
        class="text-truncate"
        :span="getDelete() ? 14 : 17">
        <template v-if="schema.global">
          {{schema.name[language]}}
        </template>
        <template v-else>
          {{model.data.sectionAlias || schema.name[language]}}
        </template>
      </el-col>
      <el-col
        :span="3"
        class="hand text-center"
        @click.native="deleteSection"
        v-if="getDelete()"
      >
        <i class="el-icon-delete"></i>
      </el-col>
      <el-col
        :span="4"
        v-if="sort"
        class="section-element-move"
      >
        <i class="bs-move"></i>
      </el-col>
      <el-col
        class="text-center"
        :span="6"
        @click.native="pasteFormClipboard"
        v-if="schema.type==='addition' && pasteVisible"
        >
        <div class="addition-button addition-paste">{{$t('base.paste')}}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'design-section',
  data () {
    return {
      display: false,
      clipVisible: false,
      model: {
        pageModuleCode: ''
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    id: {
      type: String,
      default: () => ''
    },
    schema: {
      type: Object,
      default: () => {
        return {
          removable: false,
          icon: ''
        }
      }
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    sort: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    sourceGroup: {
      type: String,
      default: () => {
        return ''
      }
    },
    displayVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    sectionIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    /**
     * 粘贴组件按钮
     */
    pasteVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  watch: {
    value: {
      handler (val) {
        this.model = val
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.model = this.value
    // if (!this.schema.name[this.language]) {
    //   console.log(JSON.stringify(this.schema))
    // }
  },
  methods: {
    getDelete () {
      return ('3000,4000'.indexOf(this.sourceGroup) > -1 && this.sourceGroup !== '' && this.active) && this.schema.removable
    },
    /**
     * 显示设置参数
     */
    displaySetting () {
      if (this.schema.type === 'addition') {
        this.$emit('add')
      } else {
        if (this.schema.settings.length > 0) {
          this.$emit('display', this.id || this.model.pageModuleCode, this.sectionIndex)
          const code = this.model.pageModuleCode || this.model.resourceCode
          if (code) {
            this.scrollSection(code)
          }
        } else {
          this.$emit('display', '')
        }
      }
    },
    /**
     * 删除
     */
    deleteSection () {
      this.$emit('delete', this.model.pageModuleCode, true)
    },
    /**
     * 从剪贴板中粘贴
     */
    pasteFormClipboard () {
      this.$emit('clipboard')
    },
    /**
     * 滚动 section
     * @param id
     */
    scrollSection (id) {
      this.$emit('message', {
        action: 'scroll',
        data: id
      })
    },
    /**
     * 组件显示状态
     */
    sectionVisible () {
      // console.log('sectionVisible', this.displayVisible && this.schema.removable && this.model && this.model.id)
      // console.log('visible', JSON.stringify(this.schema))
      // && this.schema.removable
      if (this.displayVisible && this.model && this.model.id) {
        if (this.model.visible === undefined) {
          this.model.visible = false
        }
        this.model.visible = !this.model.visible
        this.$emit('visible', {
          moduleType: this.model.moduleType,
          settings: this.model.settings,
          siteId: this.siteId,
          templateId: this.templateId,
          frontTemplate: this.model.frontTemplate,
          dynamic: this.model.dynamic,
          id: this.model.id,
          visible: this.model.visible,
          index: this.sectionIndex
        })
      }
    }
  }
}
</script>
