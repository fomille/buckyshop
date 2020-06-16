<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"></editor>
  </div>
</template>
<script>
import * as http from '../../plugins/api/common'
import plugins from './plugins'
import { fullToolbar, simpleToolbar } from './toolbar'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons.min.js'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/link'
import 'tinymce/plugins/autolink' // 插入上传图片插件
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/codesample'
export default {
  name: 'tinymce-editor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 编辑器禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 编辑器模式
     */
    modelType: {
      type: String,
      default: () => {
        return 'full'
      }
    },
    /**
     * 是否行内
     */
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'uk',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 400,
        plugins: plugins,
        toolbar: this.modelType === 'full' ? fullToolbar : simpleToolbar,
        image_advtab: true,
        image_title: true,
        file_picker_types: 'image',
        branding: false,
        menubar: false,
        inline: this.inline,
        default_link_target: '_blank',
        block_formats: 'Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre',
        images_upload_handler: (blobInfo, success, failure) => {
          const formData = new FormData()
          formData.append('rename', true)
          formData.append('file', blobInfo.blob())
          http.upload(formData).then(res => {
            if (res.success) {
              success(res.data.cdnUrl)
            } else {
              this.$message(res.msg)
              success()
            }
          })
        }
      },
      myValue: this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scope>
.tinymce-editor::v-deep .tox .tox-tbtn svg{
  fill: #606266;
}
</style>
