<template>
  <div>
    <div class="collection-picker">
      <h6>
        <router-link target="_blank" class="float-right" :to="getAddUrl()">
          {{ $t('design.picker.inquiryForm.add') }}
          <i class="fo-export"></i>
        </router-link>
        {{ name[language] }}
      </h6>
      <div class="collection-picker-none"
           @click="displayExplore=true"
           v-if="!entity.id">
        <p class="text-center">
          <i class="el-icon-plus"></i>
          {{ $t('design.picker.inquiryForm.select') }}
        </p>
      </div>
      <div class="collection-picker-content" v-if="entity.id">
        <p style="display: flex;align-items: center">
          {{ entity.title }}
        </p>
      </div>
      <el-button-group v-if="entity.id">
        <el-button @click="displayExplore=true">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button @click="clearData">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div v-if="displayExplore" class="dialog-picker">
      <h4 class="dialog-picker-title" @click="displayExplore=false">
        {{ $t('design.picker.inquiryForm.select') }}
      </h4>
      <div class="dialog-picker-content">
        <p class="dialog-picker-link">
          <a
            :href="getAddUrl()"
            target="_blank"
          >
            <i class="el-icon-plus"></i>
            {{ $t("design.picker.inquiryForm.add") }}
          </a>
        </p>

        <template
          v-for="(o, index) in dataset"
        >
          <div
            :key="`collection-${index}`"
            class="section-element">
            <el-row>
              <el-col
                :span="21"
                :offset="1"
              >
                <el-radio
                  class="el-radio-full"
                  v-model="selectedCode"
                  :label="o.id"
                  @change="addSection(index, o, false)"
                >
                  {{ o.title }}
                </el-radio>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
      <div v-if="displaySelected" class="dialog-picker-bottom">
        <p class="text-right absolutely">
          <el-button
            @click="selected"
            type="primary"
            size="small">
            {{ $t("design.imageBlock.selected") }}
          </el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import extend from '../../../../../plugins/page/base'
import * as http from '../../../../../plugins/api/enquiry'

export default {
  name: 'inquiry-form-picker',
  extends: extend,
  data () {
    return {
      displaySelected: false,
      displayExplore: false,
      sectionIndex: -1,
      selectedItem: {},
      entity: {
        id: '',
        title: '',
        imageUrl: ''
      },
      dataset: [],
      selectedCode: ''
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
          buttonLabel: '',
          id: '',
          remark: '',
          shopCode: '',
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
        this.selectedCode = ''
        this.getData()
      }
    }
  },
  created () {
    this.entity = this.value
  },
  methods: {
    /**
       * 添加地址
       */
    getAddUrl () {
      return `/en/design/${this.shopCode}/enquiry/form/add`
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
        buttonLabel: '',
        id: '',
        remark: '',
        shopCode: '',
        title: ''
      }
    },
    /**
       * 获取链接数据
       */
    getData () {
      this.dataset = []
      http.enquiryFormPaging({
        current: 1,
        size: 20,
        item: {
          title: '',
          shopCode: this.shopCode
        }
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data.records
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
          buttonLabel: '',
          id: this.selectedItem.id,
          remark: this.selectedItem.remark,
          shopCode: this.selectedItem.shopCode,
          title: this.selectedItem.title
        }
        this.displayExplore = false
        this.$emit('input', this.entity)
      }
    }
  }
}
</script>
