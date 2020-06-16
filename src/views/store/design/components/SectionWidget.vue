<template>
  <div class="setting-widget">
    <template v-if="schema.type === 'textarea'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-input
          v-model="model[schema.field]"
          :placeholder="schema.placeholder && schema.placeholder[language] || schema.name[language]"
          type="textarea"
          :rows="6"></el-input>
      </p>
    </template>

    <template v-else-if="schema.type === 'divider'">
      <hr>
    </template>
    <template v-else-if="schema.type === 'switch'">
      <p>
        <el-switch
          v-model="model[schema.field]"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
        >
        </el-switch>
        {{ schema.name[language] }}
      </p>
    </template>
    <template v-else-if="schema.type === 'select'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-select
          v-model="model[schema.field]"
          :placeholder="$t('base.selectPlaceholder')"
          size="small"
          v-if="schema.group"
          width="100%">
          <el-option-group
            v-for="g in groups"
            :key="g"
            :label="g">
            <el-option
              v-for="o in schema.options.filter((fo)=> { return fo.group === g })"
              :key="o.value"
              :label="o.name[language]"
              :value="o.value">
              {{o.name[language]}}
            </el-option>
          </el-option-group>
        </el-select>
        <el-select
          v-model="model[schema.field]"
          :placeholder="$t('base.selectPlaceholder')"
          size="small"
          v-else
          width="100%">
          <el-option
            v-for="o in schema.options"
            :key="o.value"
            :label="o.name[language]"
            :value="o.value">
            {{o.name[language]}}
          </el-option>
        </el-select>

      </p>
    </template>
    <template v-else-if="schema.type === 'imagePicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <image-picker
        :alt="this.imageAlt"
        :alt-button="displayAlt"
        v-model="model[schema.field]"
        @updateAlt="updateAlt"
      >
      </image-picker>
    </template>
    <template v-else-if="schema.type === 'linkPicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <link-picker
        :width="220"
        size="small"
        v-model="model[schema.field]"
      ></link-picker>
    </template>
    <template v-else-if="schema.type === 'colorPicker'">
      <p>
        <el-color-picker  v-model="model[schema.field]"></el-color-picker>
        {{ schema.name[language] }}
      </p>
    </template>
    <template v-else-if="schema.type === 'slider'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-slider
          v-model="model[schema.field]"
          :step="1">
        </el-slider>
      </p>
    </template>
    <template v-else-if="schema.type === 'inquiryFormPicker'">
      <inquiry-form-picker
        :name="schema.name"
        :picker-type="schema.type"
        v-model="model"
      >
      </inquiry-form-picker>
    </template>
    <template v-else-if="schema.type === 'productCollectionPicker' || schema.type === 'articleCollectionPicker'">
      <product-collection-picker
        :name="schema.name"
        :picker-type="schema.type"
        v-model="model"
      >
      </product-collection-picker>
    </template>
    <template v-else-if="schema.type === 'richText'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <rich-text-editor
        model-type="simple"
        :height="500"
        v-model="model[schema.field]"
      ></rich-text-editor>
    </template>
    <template v-else-if="schema.type === 'videoPicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <video-picker
        v-model="model[schema.field]"
      ></video-picker>
    </template>
    <template v-else-if="schema.type === 'positiveInteger'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <positive-integer
        v-model="model[schema.field]"
      ></positive-integer>
    </template>
    <template v-else-if="schema.type !=='hidden'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-input
          size="small"
          v-model="model[schema.field]"
          type="textarea"
          :rows="3"
          :placeholder="schema.placeholder && schema.placeholder[language] || schema.name[language]"
        ></el-input>
      </p>
    </template>
    <p class="setting-widget-info" v-if="schema.info && schema.info[language]" v-html="schema.info[language]">
      <small>
        {{ schema.info[language] }}
      </small>
    </p>
  </div>
</template>

<script>
import ProductCollectionPicker from './picker/ProductCollectionPicker'
import ImagePicker from './picker/ImagePicker'
import VideoPicker from './picker/VideoPicker'
import richText from '../../../../assets/image/rich-text.jpg'
import PositiveInteger from './picker/PositiveInteger'
import LinkPicker from './picker/LinkPicker'
// import RichTextEditor from '../../../../components/richText'

export default {
  name: 'section-widget',
  components: {
    PositiveInteger,
    VideoPicker,
    ImagePicker,
    ProductCollectionPicker,
    LinkPicker
    // RichTextEditor
  },
  data () {
    return {
      imageAlt: '',
      displayAlt: false,
      model: {},
      groups: [],
      richTextImage: richText,
      limitQuantity: 0
    }
  },
  props: {
    schema: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    value: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  watch: {
    model: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    },
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  created () {
    this.model = this.value
    if (this.schema.type === 'imagePicker') {
      if (this.schema.altFiled) {
        const field = this.schema.altFiled
        const value = this.model[field]
        if (value !== undefined && value !== null) {
          this.imageAlt = value
          this.displayAlt = true
        }
      }
    } else if (this.schema.type === 'select' && this.schema.group) {
      this.schema.options.forEach((o) => {
        if (o.group && this.groups.indexOf(o.group) === -1) {
          this.groups.push(o.group)
        }
      })
    }
  },
  methods: {
    /**
     * 更新ALT
     * @param value
     */
    updateAlt (value) {
      if (this.schema.type === 'imagePicker') {
        if (this.schema.altFiled) {
          const altFiled = this.schema.altFiled
          const oldValue = this.model[altFiled]
          if (oldValue !== undefined && oldValue !== null) {
            this.model[altFiled] = value
          }
        }
      }
    }
  }
}
</script>
<style lang='scss'>
  $color-info: rgba(255,255,255, .7);
  .setting-widget {
    .editor-section-link {
      color: $color-info !important;

      &:visited {
        color: $color-info !important;
      }
    }

    .el-input__inner, .el-textarea__inner {
      padding: 0 8px !important;
    }

    .el-color-picker {
      .el-color-picker__trigger {
        width: 30px;
        height: 30px;
        border: 0;
        padding: 0;
        margin-right: 5px;
        vertical-align: middle;
      }
    }

    .ql-toolbar {
      background-color: #fff;
    }

    .quill-editor {
      .ql-container {
        height: 300px;
      }
    }
  }
</style>
