<template>
  <el-dialog
    :title="$t('design.managePage')"
    :visible.sync="visible"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="30px"
    width="60%">
    <el-form :model="entity" :rules="formRules" ref="update" label-width="100px" label-position="top">
      <el-form-item prop="title">
        {{$t('design.pageEntity.title.label')}}
        <el-input
          v-model="entity.title"
          show-word-limit
          :placeholder="$t('design.pageEntity.title.placeholder')"
          :maxlength="100"
        ></el-input>
        <el-form-item prop="content">
          {{$t('design.pageEntity.content.label')}}

          <rich-text-editor
            v-model="entity.content"
            :placeholder="$t('design.pageEntity.content.placeholder')"
          ></rich-text-editor>
        </el-form-item>
      </el-form-item>
    </el-form>
    <template slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">{{$t('base.cancel')}}</el-button>
      <el-button type="primary" @click="formValidation">{{$t('base.save')}}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import * as http from '../../../../plugins/api/theme'
import extend from '../../../../plugins/page/base'

export default {
  name: 'add-page',
  extends: extend,
  data () {
    return {
      entity: {
        title: '',
        content: '',
        seoTitle: '',
        seoDesc: '',
        shopCode: ''
      },
      formRules: {
        content: [
          {
            required: true,
            message: this.$t('design.pageEntity.content.required'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('design.pageEntity.title.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.entity = {
          title: '',
          content: '',
          seoTitle: '',
          seoDesc: '',
          shopCode: ''
        }
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close', null)
    },
    /**
     * 表单校验
     */
    formValidation () {
      const formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entity.seoTitle = this.entity.title
          this.entity.shopCode = this.shopCode
          http.createPage(this.entity)
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$emit('close', true)
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
  .tox {
    z-index: 3000!important;
  }
</style>
