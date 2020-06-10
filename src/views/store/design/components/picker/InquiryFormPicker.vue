<template>
  <div>
    <div class="collection-picker">
      <h6>
        <router-link target="_blank" class="float-right" :to="getAddUrl()">
          {{ $t('design.picker.inquiryForm.edit') }}
          <i class="fo-export"></i>
        </router-link>
        {{ name[language] }}
      </h6>
      <div
        class="collection-picker-none"
        @click="displayExplore=true"
        v-if="entity.id === ''">
        <p class="text-center">
          <i class="fo-edit"></i>
          {{ $t('design.picker.inquiryForm.select') }}
        </p>
      </div>
      <div class="collection-picker-content" v-if="entity.id !== ''">
        <p class="form-name">
          {{ entity.title }}
        </p>
      </div>
      <el-button-group v-if="entity.id !== ''">
        <el-button @click="displayExplore=true">
          <i class="fo-edit"></i>
        </el-button>
        <el-button @click="clearData">
          <i class="fo-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div v-if="displayExplore" class="setting-sidebar">
      <h4 class="setting-sidebar-title" @click="displayExplore=false">
        {{ $t('design.picker.inquiryForm.select') }}
      </h4>
      <div class="setting-sidebar-content">
        <p class="centerLink">
          <a
            :href="getAddUrl()"
            target="_blank"
          >
            <i class="fo-add"></i>
            添加
          </a>
        </p>

        <template
          v-for="(o, index) in dataset"
        >
          <div class="editor-section-picker">
            <el-row>
              <el-col
                :offset="1"
                :span="22">
                <a
                  href="javascript:void(0)"
                  class="text-truncate"
                  @click="addSection(index, o, false)"
                >
                  <i
                    v-if="sectionIndex === index"
                    class="fomille float-right fo-radio-checked">
                  </i>
                  {{ o.title }}
                </a>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
      <div v-if="displaySelected" class="setting-sidebar-bottom">
        <p class="text-right absolutely">
          <el-button
            @click="selected"
            type="primary"
            size="small">
            {{ $t("design.selected") }}
          </el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" >
  .form-name {
    display: flex;
    align-items: center;
  }
</style>
<script>
import extend from '../../../../../plugins/page/base'

export default {
  name: 'inquiry-form-picker',
  extends: extend,
  data () {
    return {
      siteId: '',
      displaySelected: false,
      displayExplore: false,
      sectionIndex: -1,
      selectedItem: {},
      entity: {
        id: '',
        title: ''
      },
      dataset: []
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          id: '',
          title: ''
        }
      }
    },
    name: {
      en: 'Collection',
      'zh-CN': '集合'
    },
    pickerType: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    displayExplore (value) {
      if (value) {
        this.getData()
      }
    }
  },
  created () {
    this.entity = this.value
    this.siteId = this.$route.params.siteId
  },
  methods: {
    /**
     * 添加地址
     */
    getAddUrl () {
      return `/enquiry/${this.siteId}/form`
    },
    /**
     * 返回上一级
     */
    closePicker () {
      this.$emit('close')
    },
    /**
     * 添加 section
     */
    addSection (index, data) {
      this.displaySelected = true
      this.sectionIndex = index
      this.selectedItem = data
    },
    /**
     * 清除数据
     */
    clearData () {
      this.entity = {
        id: '',
        title: '',
        image: ''
      }
    },
    /**
     * 获取链接数据
     */
    getData () {
      this.dataset = []
      this.datasource.linkPicker({
        searchType: 6,
        q: '',
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 选择
     */
    selected () {
      if (this.selectedItem) {
        this.entity = {
          id: this.selectedItem.id,
          title: this.selectedItem.title
        }
        this.displayExplore = false
        this.$emit('input', this.entity)
      }
    }
  }
}
</script>
