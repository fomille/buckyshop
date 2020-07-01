<template>
  <div>
    <div class="collection-picker">
      <h6>
        <label class="collection-picker-tips" @click="getAddUrl()">
          <i class="el-icon-plus"></i>
          {{ $t('design.picker.productCollection.add') }}
        </label>
        {{ name[language] }}
      </h6>
      <div class="collection-picker-none"
           @click="displayExplore=true"
           v-if="!entity.collectionCode">
        <p class="text-center">
          <i class="el-icon-plus"></i>
          {{ $t('design.picker.productCollection.select') }}
        </p>
      </div>
      <div class="collection-picker-content" v-if="entity.collectionCode">
        <img :src="entity.imageUrl === '' ? global.placeholderImage : entity.imageUrl">
        <p>
          {{ entity.collectionName }}
        </p>
      </div>
      <el-button-group v-if="entity.collectionCode">
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
        {{ $t('design.picker.productCollection.select') }}
      </h4>
      <div class="dialog-picker-content">
        <p class="dialog-picker-link">
          <a
            href="javascript:void(0)"
            @click="getAddUrl()"
          >
            <i class="el-icon-plus"></i>
            {{ $t("design.picker.productCollection.add") }}
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
                  :label="o.collectionCode"
                  @change="addSection(index, o, false)"
                >
                  <img :src="o.imageUrl" v-if="o.imageUrl">
                  {{ o.collectionName }}
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
import * as http from '../../../../../plugins/api/theme'

export default {
  name: 'product-collection-picker',
  extends: extend,
  data () {
    return {
      displaySelected: false,
      displayExplore: false,
      sectionIndex: -1,
      selectedItem: {},
      entity: {
        collectionCode: '',
        collectionName: '',
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
          collectionCode: '',
          collectionName: '',
          imageUrl: ''
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
      this.utility.openSite(`/en/shop/${this.shopCode}/collections/add`)
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
        collectionCode: '',
        collectionName: '',
        imageUrl: ''
      }
    },
    /**
     * 获取链接数据
     */
    getData () {
      this.dataset = []
      http.goodsCollection({
        current: 1,
        size: 20,
        item: {
          collectionName: '',
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
          collectionCode: this.selectedItem.collectionCode,
          collectionName: this.selectedItem.collectionName,
          imageUrl: this.selectedItem.imageUrl
        }
        this.displayExplore = false
        this.$emit('input', this.entity)
      }
    }
  }
}
</script>
