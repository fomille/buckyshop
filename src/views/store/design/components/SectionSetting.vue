<template>
    <div
      class="editor-section">
      <h3 class="editor-section-title" @click="close">
        {{ schema.name[language] }}
      </h3>
      <div class="editor-section-content">
        <div class="setting-widget" v-if="!schema.global">
          <p>
            {{$t('design.sectionAlias.heading')}}
          </p>
          <p>
            <el-input
              size="small"
              v-model="model.sectionAlias"
              :placeholder="$t('design.sectionAlias.placeholder')"
            ></el-input>
          </p>
        </div>
        <template
          v-for="(o, index) in schema.settings"
        >
          <h4
            :class="`setting-element${0 === index ? ' active' : ''}${schema.settings.length === 1 ? ' only-one' : ''}`"
            :key="index.toString()"
            @click="blockVisible($event, index)"
          >
            {{ o.name[language] }}
          </h4>
          <div
            :class="`settings-content-block d-none${0 === index ? ' active' : ''}`"
            :data-params-block="index"
            :key="`params-block-${index}`"
          >
            <p class="editor-section-tips" v-if="o.tips && o.tips[language]" v-html="o.tips[language]"></p>
            <template v-if="index === 0 && (schema.type ==='header' || schema.type ==='footer')">
              <div class="setting-widget">
                <p>
                  <router-link target="_blank" class="text-primary" :to="getAddUrl()">
                    {{ $t('design.editMenu') }}
                    <i class="fo-export"></i>
                  </router-link>
                </p>
              </div>
            </template>

            <div class="editor-section-info" v-if="o.info && o.info[language]">
              <small>
                {{ o.info[language] }}
              </small>
            </div>
            <!--非列列表型组件-->
            <template v-if="o.multiple === 0 || o.multiple === false">
              <template
                v-for="(el, eIndex) in o.elements"
              >
                <template v-if="el.type === 'productCollectionPicker' || el.type === 'articleCollectionPicker'">
                  <section-widget
                    :key="`settings-${index}-${eIndex}`"
                    :schema="el"
                    v-model="model.dataset[el.field].data[0]"
                  >
                  </section-widget>
                  <!--显示单个集合下的（文章/商品），限制数量-->
                  <div
                    class="setting-widget"
                    :key="`settings-item-${index}-${eIndex}`"
                  >
                    <h6>
                      {{ $t(`design.${el.type}.name['${language}']`) }}
                    </h6>
                    <p>
                      <el-input-number
                        size="small"
                        class="absolutely"
                        :min="1"
                        :max="99"
                        v-model="model.dataset[el.field].quantity"
                        :placeholder="$t(`design.${el.type}.placeholder['${language}']`)"
                      ></el-input-number>
                    </p>
                  </div>
                </template>
                <template v-else-if="el.type === 'inquiryFormPicker'">
                  <section-widget
                    :key="`settings-${index}-${eIndex}`"
                    :schema="el"
                    v-model="model.dataset[el.field].data[0]"
                  >
                  </section-widget>
                </template>
                <section-widget
                  v-else
                  :key="`settings-${index}-${eIndex}`"
                  :schema="el"
                  v-model="model"
                >
                </section-widget>
              </template>
            </template>
            <!--列表组件-->
            <template v-else>
              <draggable
                handle=".editor-content-title"
                :list="model.dataset[o.tag].data"
              >
                <div
                  class="editor-content"
                  v-for="(sub, subIndex) in model.dataset[o.tag].data"
                  :key="`sub-${subIndex}`"
                >
                  <label v-show="false">
                    {{result = getPlaceholder(o.elements, sub, o.placeholder[language])}}
                  </label>
                  <div class="editor-content-title" :class="{'active': subIndex === slideIndex && elementVisible}">
                    <el-row>
                      <el-col
                        @click.native="toggleSettings(subIndex)"
                        class="text-truncate"
                        :span="20">
                        <!--                        <img :src="sub.image" v-if="schema.type === 'slideShow' && sub.image">-->
                        <img :src="result.image" v-if="result.image">
                        <i class="el-icon-picture-outline no-image" v-if="schema.type === 'slideShow' && !result.image"></i>
                        {{result.heading}}
                      </el-col>
                      <el-col
                        :span="4"
                        class="editor-content-element-move"
                      >
                        <i class="fo-move"></i>
                      </el-col>
                    </el-row>
                  </div>
                  <!--子项开始-->
                  <div
                    v-if="slideIndex === subIndex && elementVisible"
                    class="editor-content-element">
                    <div
                      v-for="(el, eIndex) in o.elements"
                      :key="`settings-${index}-${eIndex}`"
                    >
                      <section-widget
                        :schema="el"
                        v-model="model.dataset[o.tag].data[subIndex]"
                      >
                      </section-widget>
                    </div>
                    <!--复制、删除项-->
                    <div class="editor-section-bottom">
                      <el-button
                        size="small"
                        type="danger"
                        @click="removeSlide(o, subIndex)"
                        >
                        {{$t('base.delete.button')}}
                      </el-button>
                      <el-button
                        v-if="model.dataset[o.tag] && model.dataset[o.tag].data.length < o.max"
                        size="small"
                        type="primary"
                        @click="copySlide(o, subIndex)"
                        >
                        {{$t('base.duplicate')}}
                      </el-button>
                    </div>
                  </div>
                  <!--子项结束-->
                </div>
              </draggable>
              <div
                :key="`addSlide-${index}`"
                @click="addSlide(o)"
                v-if="model.dataset[o.tag] && model.dataset[o.tag].data.length < o.max"
                class="design-action">
                <p>
                  <i class="el-icon-plus"></i>
                  {{ $t('design.addSlide') }}
                </p>
              </div>
              <div
                :key="`clearSlide-${index}`"
                @click="clearSlide(o)"
                class="design-action">
                <p>
                  <i class="el-icon-close"></i>
                  {{ $t('design.clear') }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <div class="editor-section-bottom"
             v-if="schema.removable"
        >
          <p>
            <el-button
              v-if="schema.removable"
              size="small"
              type="primary"
              class="absolutely"
              @click="copySection"
            >
              {{$t('design.copy')}}
            </el-button>
          </p>

          <p>
            <el-button
              v-if="schema.removable"
              size="small"
              type="primary"
              class="absolutely"
              @click="copyToClip"
            >
              {{$t('design.copyToClip')}}
            </el-button>
          </p>
          <el-button
            v-if="schema.removable"
            size="small"
            type="text"
            class="absolutely"
            @click="removeSection"
          >
            {{$t('design.remove')}}
          </el-button>
        </div>

      </div>
    </div>
</template>
<script>
import SectionWidget from './SectionWidget'
import Draggable from 'vuedraggable'

export default {
  name: 'section-setting',
  components: {
    SectionWidget,
    Draggable
  },
  data () {
    return {
      question: '',
      model: {},
      slideIndex: 0,
      firstLoading: true,
      /**
       * 消息状态
       */
      funcStatus: {
        loading: false,
        data: {}
      },
      answer: 'I cannot give you an answer until you ask a question!',
      elementVisible: true,
      /**
       * 显示区块
       */
      blockIndex: 0
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  props: {
    schema: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    id: {
      type: String,
      default: () => ''
    },
    shopCode: {
      type: String,
      default: () => ''
    },
    templateCode: {
      type: String,
      default: () => ''
    },
    resourceCode: {
      type: String,
      default: () => ''
    },
    resourceType: {
      type: String,
      default: () => ''
    },
    /**
     * 消息状态
     */
    messageStatus: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    model: {
      deep: true,
      handler () {
        // console.log('waiting')
        this.debouncedUpdateView()
      }
    },
    value: {
      deep: true,
      handler () {
        this.verifyDefaultList()
      }
    },
    schema: {
      deep: true,
      handler () {
        // this.verifyDefaultList()
      }
    },
    messageStatus: {
      deep: true,
      handler (value) {
        this.funcStatus.data = value
        this.funcStatus.loading = false
      }
    }
  },
  mounted () {
    // const el = document.querySelector('.setting-element')
    // if (el) {
    //   el.classList.remove('active')
    // }
  },
  created () {
    // if (typeof (this.value.settings) === 'string') {
    //   this.value.settings = JSON.parse(this.value.settings)
    // }
    this.model = this.value
    // console.log('model', JSON.stringify(this.model))
    // console.log('schema', JSON.stringify(this.schema))
    this.debouncedUpdateView = this.getLodash.debounce(this.valueChanged, 500)
    this.verifyDefaultList()
    if (!this.model.sectionAlias) {
      this.model.sectionAlias = this.schema.name[this.language]
    }
  },
  methods: {
    /**
     * 占位文字
     * @param fields 节点
     * @param data 数据
     * @param defaultValue
     */
    getPlaceholder (fields, data, defaultValue) {
      const result = {
        heading: '',
        image: ''
      }
      // {"image":"https://site-file.fomillesite.com/1201424050841407490/1201463100168855553.jpg","id":"1209760089112739841","title":"NEWS"}

      fields.forEach((o) => {
        // eslint-disable-next-line no-mixed-operators
        if (o.type === 'text' || o.type === 'textarea' && data[o.field]) {
          result.heading = result.heading || data[o.field]
        } else if (o.type === 'imagePicker') {
          if (this.utility.isEmpty(result.image)) {
            result.image = data[o.field] || o.default
          }
        } else if (o.type === 'productCollectionPicker' || o.type === 'articleCollectionPicker') {
          result.image = result.image || data.image
          result.heading = result.heading || data.title
        }
      })
      result.heading = result.heading || defaultValue
      return result
    },
    /**
     * 默认数据校验
     */
    verifyDefaultList () {
      this.schema.settings.forEach((o) => {
        if (o.multiple && !o.dataType) {
          if (!this.model.dataset) {
            this.model.dataset = {}
          }
          if (!this.model.dataset[o.tag]) {
            const value = JSON.parse(JSON.stringify(this.schema.default.dataset[o.tag].data[0]))
            this.model.dataset[o.tag] = {
              type: 'normal',
              data: [
                value
              ]
            }
          }
        }
      })
      this.value = this.model
    },
    /**
     * 添加地址
     */
    getAddUrl () {
      return this.model.navigationLink
    },
    /**
     * 返回上一级
     */
    close () {
      this.$emit('close', this.id || this.model.id)
    },
    /**
     * 子组件展示切换
     * @param subIndex
     */
    toggleSettings (subIndex) {
      if (subIndex === this.slideIndex) {
        this.elementVisible = !this.elementVisible
      } else {
        this.elementVisible = true
        this.slideIndex = subIndex
      }
    },
    /**
     * 复制模块
     */
    copySection () {
      const code = `design-preview-${new Date().getTime()}`
      this.$emit('copy', {
        pageModuleCode: code,
        resourceCode: this.resourceCode,
        templateCode: this.templateCode,
        resourceType: this.resourceType,
        shopCode: this.shopCode,
        data: this.model,
        visible: true
      })
    },
    /**
     * 复制到剪贴版
     */
    copyToClip () {
      const code = `design-preview-${new Date().getTime()}`
      this.$emit('copyToClip', {
        pageModuleCode: code,
        resourceCode: this.resourceCode,
        templateCode: this.templateCode,
        resourceType: this.resourceType,
        shopCode: this.shopCode,
        data: this.model,
        visible: true
      })
    },
    /**
     * 参数变更,发送通知给 iframe进行同步参数
     */
    valueChanged () {
      if (!this.firstLoading) {
        this.funcStatus.loading = true
        this.$emit('message', {
          action: 'update',
          data: {
            pageModuleCode: this.id,
            resourceCode: this.resourceCode,
            templateCode: this.templateCode,
            resourceType: this.resourceType,
            shopCode: this.shopCode,
            data: this.model
          }
        })
      } else {
        this.firstLoading = false
      }
    },
    /**
     * 添加一行
     */
    addSlide (o) {
      if (o.tag && this.model.dataset[o.tag] && this.schema.default.dataset[o.tag] && this.schema.default.dataset[o.tag].data) {
        const max = parseFloat(o.max || 99)
        console.log(this.schema.default.dataset[o.tag])
        if (max > 0 && this.model.dataset[o.tag].data.length < max) {
          this.model.dataset[o.tag].data.push(JSON.parse(JSON.stringify(this.schema.default.dataset[o.tag].data[0])))
          this.slideIndex = this.model.dataset[o.tag].data.length - 1
        }
      }
    },
    /**
     * clear slides
     */
    clearSlide (o) {
      this.$confirm(this.$t('design.clearTips'), this.$t('design.clearHeading'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.model.dataset[o.tag].data = []
            this.slideIndex = null
            done()
          } else {
            done()
          }
        }
      })
    },
    /**
     * remove slide
     * @param o
     * @param index
     */
    removeSlide (o, index) {
      if (o.tag && this.model.dataset[o.tag]) {
        this.model.dataset[o.tag].data.splice(index, 1)
        this.slideIndex = null
      }
    },
    /**
     * copy slide
     */
    copySlide (o, index) {
      if (o.tag && this.model.dataset[o.tag] && this.model.dataset[o.tag]) {
        this.model.dataset[o.tag].data.push(
          JSON.parse(JSON.stringify(this.model.dataset[o.tag].data[index]))
        )
      }
    },
    /**
     * 删除section
     */
    removeSection () {
      this.$emit('remove', this.id || this.model.id, true)
    },
    /**
     * 区块显示
     * @param event
     * @param index
     */
    blockVisible (event, index) {
      if (this.schema.settings.length > 1) {
        const el = event.currentTarget
        if (el.classList.contains('active')) {
          el.classList.remove('active')
        } else {
          el.classList.add('active')
        }
        const block = document.querySelector(`[data-params-block="${index}"]`)
        if (block.classList.contains('active')) {
          block.classList.remove('active')
        } else {
          block.classList.add('active')
        }
      }
    }
  }
}
</script>
