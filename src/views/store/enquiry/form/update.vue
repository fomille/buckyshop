<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="id ? $t('enquiry.form.update.updateTitle') : $t('enquiry.form.update.addTitle')">
    <p
      @click="goBack"
      class="go-back">
      <i class="el-icon-arrow-left"></i>
      {{ $t("enquiry.form.paging.pageTitle") }}
    </p>
    <h3 class="page-title">
      <small class="float-right pointer" v-if="id" @click="deleteForm">
        <i class="fo-delete"></i>
        {{ $t("base.delete.button") }}
      </small>
      {{ this.utility.isEmpty(entity.title) ? (id ? $t("enquiry.form.update.updateTitle") : $t("enquiry.form.update.addTitle")) : entity.title}}
    </h3>
    <el-form :model="entity" :rules="formRules" ref="update" label-width="100px" label-position="top">
      <page-block>
        <el-form-item prop="title" :label="$t('enquiry.form.update.entity.title.label')">
          <el-input
            maxlength="100"
            show-word-limit
            v-model="entity.title"
            :placeholder="$t('enquiry.form.update.entity.title.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="buttonLabel" :label="$t('enquiry.form.update.entity.buttonLabel.label')">
          <el-input
            maxlength="50"
            show-word-limit
            v-model="entity.buttonLabel"
            :placeholder="$t('enquiry.form.update.entity.buttonLabel.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark" :label="$t('enquiry.form.update.entity.remark.label')">
          <el-input
            maxlength="255"
            show-word-limit
            v-model="entity.remark"
            :placeholder="$t('enquiry.form.update.entity.remark.placeholder')"
          ></el-input>
        </el-form-item>
      </page-block>
      <page-block
        :heading="$t('enquiry.form.update.content')"
      >
        <draggable
          handle=".element-sort"
          :list="entity.fieldList"
        >
          <div
            class="field-list"
            v-for="(o, index) in entity.fieldList"
            v-bind:key="`field-list-${index}`"
          >
            <el-row :gutter="20" v-if="index === 0">
              <el-col :span="5">
                {{$t('enquiry.form.update.field.title')}}
              </el-col>
              <el-col :span="12">
                {{$t('enquiry.form.update.field.placeholder')}}
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="(o.fieldType === 'select' || o.fieldType === 'radio' || o.fieldType === 'checkbox') ? 17 : 5">
                <el-form-item :prop="`fieldList.${index}.fieldLabel`" :rules="formRules.type">
                  <el-input
                    v-model="o.fieldLabel"
                    maxlength="32"
                    show-word-limit
                    :placeholder="$t('enquiry.form.update.field.title')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                v-if="!(o.fieldType === 'select' || o.fieldType === 'radio' || o.fieldType === 'checkbox')"
                :span="12">
                <el-form-item
                  :prop="`fieldList.${index}.placeholder`" :rules="formRules.type">
                  <el-input
                    show-word-limit
                    :type="o.fieldType === 'textarea' ? 'textarea' : 'text'"
                    :maxlength="o.fieldType === 'textarea' ? 200 : 50"
                    rows="4"
                    v-model="o.placeholder"
                    :placeholder="$t('enquiry.form.update.field.placeholder')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-switch
                  :active-text="`${$t('enquiry.form.update.field.required')}`"
                  v-model="o.required"
                >
                </el-switch>
                <div class="el-switch">
                  <label class="el-switch__label el-switch__label--right">
                    ({{o.displayLabel}})
                  </label>
                </div>
              </el-col>
              <el-col :span="3">
                <el-button class="element-sort" style="margin-top: 5px" size="small" icon="el-icon-rank" circle></el-button>
                <el-button style="margin-top: 5px" type="danger" size="small" icon="el-icon-delete" circle @click="removeElement(index, o)"></el-button>
              </el-col>
            </el-row>
            <el-row
              v-if="o.fieldType === 'select' || o.fieldType === 'radio' || o.fieldType === 'checkbox'"
              :gutter="20">
              <el-col :span="5">
                <div style="padding: 16px 0">
                  <el-row
                    :gutter="20"
                    v-for="(option, optionIndex) in o.options"
                    v-bind:key="`option-${optionIndex}`"
                  >
                    <el-col :span="24" class="text-right" style="line-height: 30px">
                      <small>
                        {{$t('enquiry.form.update.option.item')}} {{optionIndex + 1}}
                      </small>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="form-options">
                  <draggable
                    handle=".option-sort"
                    :list="o.options"
                  >
                    <el-row
                      :gutter="20"
                      v-for="(option, optionIndex) in o.options"
                      v-bind:key="`option-${optionIndex}`"
                    >
                      <el-col
                        v-bind:key="optionIndex"
                        :span="15">
                        <el-form-item :prop="`fieldList.${index}.options.${optionIndex}.value`" :rules="formRules.type">
                          <el-input
                            show-word-limit
                            size="small"
                            maxlength="100"
                            v-model="option.value"
                            :placeholder="$t('enquiry.form.update.option.value')"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3" class="text-right" v-if="o.options.length > 1">
                        <label>
                          <input type="checkbox" :name="`option-${index}`" @click="setChecked(optionIndex, o)" v-model="option.checked">
                          <small>
                            {{$t('enquiry.form.update.option.default')}}
                          </small>
                        </label>
                      </el-col>
                      <el-col :span="6" v-if="o.options.length > 1">
                        <el-button class="option-sort" size="small" icon="el-icon-rank" circle></el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" circle @click="removeOption(optionIndex, o)"></el-button>
                      </el-col>
                    </el-row>
                  </draggable>
                  <el-button class="mt-3" size="small" icon="el-icon-plus" @click="addOption(index, o)">
                    {{ $t('enquiry.form.update.add.option') }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </draggable>
        <el-popover
          placement="top-start"
          width="600"
          trigger="hover"
          >
          <div class="el-popover__title">
            {{ $t('enquiry.form.update.add.normal') }}
          </div>
          <div class="preset-button">
            <template
              v-for="(o, key) in $t('enquiry.form.update.fieldType')"
            >
              <el-button
                :key="key"
                v-if="o.preset"
                size="small"
                @click="addElement(key, true)"
              >
                {{ o.label}}
              </el-button>
            </template>
          </div>
          <div class="el-popover__title mt-5">
            {{ $t('enquiry.form.update.add.custom') }}
          </div>
          <div class="preset-button">
            <template
              v-for="(o, key) in $t('enquiry.form.update.fieldType')"
            >
              <el-button
                :key="key"
                v-if="o.custom"
                size="small"
                @click="addElement(key, false)"
              >
                {{ o.label}}
              </el-button>
            </template>
          </div>
          <el-button
            plain
            size="small"
            type="primary"
            slot="reference">
            {{ $t('enquiry.form.update.add.button') }}
          </el-button>
        </el-popover>
      </page-block>
    </el-form>
    <div class="fixed-action" v-show="unsaved">
      <div class="fixed-action-label">
        {{ $t("base.unsaved") }}
      </div>
      <div class="fixed-action-button">
        <el-button
          size="small"
          @click="unsaved = false">
          {{ $t("base.cancel") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="formValidation">
          {{ $t("base.save") }}
        </el-button>
      </div>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../../plugins/page/unsaved'
import Draggable from 'vuedraggable'
import * as enquiry from '../../../../plugins/api/enquiry'

export default {
  name: 'siteCustomizeUpdate',
  extends: extend,
  components: {
    Draggable
  },
  data () {
    return {
      entity: {
        remark: '',
        siteId: '',
        title: '',
        displayLabel: '',
        buttonLabel: 'Submit',
        fieldList: []
      },
      formRules: {
        type: [
          {
            required: true,
            message: ''
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('enquiry.form.update.entity.title.required'),
            trigger: 'blur'
          }
        ],
        buttonLabel: [
          {
            required: true,
            message: this.$t('enquiry.form.update.entity.buttonLabel.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      const formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let isEmailOrPhone = false
          this.entity.fieldList.forEach((o) => {
            if ((o.fieldType === 'email' || o.fieldType === 'tel') && o.required) {
              isEmailOrPhone = true
            }
          })
          if (!isEmailOrPhone) {
            this.$message({
              type: 'error',
              message: this.$t('enquiry.form.update.fieldList')
            })
          } else {
            if (this.id) {
              this.updateForm()
            } else {
              this.addForm()
            }
          }
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      enquiry.enquiryFormDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.entity.fieldList.forEach((o) => {
                o.options = JSON.parse(o.options || '[]')
              })
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 添加数据
     */
    addForm () {
      this.entity.siteId = this.siteId
      enquiry.enquiryFormUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.goBack()
              // this.$router.push(`/enquiry/${this.siteId}/form/update/${result.data.id}`)
              // this.entity.id = result.data.id
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 跳转回列表
     */
    goBack () {
      this.$router.push(`/${this.langCode}/${this.shopCode}/store/enquiry/form`)
    },
    /**
     * 更新数据
     */
    updateForm () {
      enquiry.enquiryFormUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.goBack()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deleteForm () {
      this.$confirm(this.$t('base.delete.subheading'), this.$t('base.delete.heading'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            enquiry.enquiryFormDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: `/enquiry/${this.siteId}/form`
                }
                this.resultMessage(result, () => {
                  done()
                  instance.confirmButtonLoading = false
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /**
     * 添加一个元素
     * @param filedType 类型
     * @param preset 是否为预设
     */
    addElement (filedType, preset) {
      const schema = this.$t('enquiry.form.update.fieldType')[filedType]
      if (!schema) {
        return false
      }
      // 判断限制数量字段是否已添加过
      if (schema.quantity > 0) {
        const rows = this.entity.fieldList.filter((o) => {
          return o.fieldName === filedType
        })

        if (rows.length > 0) {
          return false
        }
      }
      const options = []
      if (filedType === 'select' || filedType === 'radio' || filedType === 'checkbox') {
        options.push({
          label: '',
          value: '',
          checked: true
        })
      }
      this.entity.fieldList.push({
        displayLabel: schema.label,
        defaultValue: '',
        fieldLabel: preset ? schema.fieldLabel === 'phoneCode' ? 'Phone' : schema.fieldLabel : '',
        fieldName: filedType,
        fieldType: schema.filedType,
        placeholder: preset ? schema.placeholder : '',
        required: schema.required,
        options: options
      })
    },
    /**
     *
     * @param index
     * @param row
     */
    removeElement (index, row) {
      this.entity.fieldList.splice(index, 1)
    },
    /**
     * 移除选项
     * @param index
     * @param row
     */
    removeOption (index, row) {
      row.options.splice(index, 1)
    },
    /**
     * 添加选项
     * @param index
     */
    addOption (index) {
      this.entity.fieldList[index].options.push({
        label: '',
        value: '',
        checked: false
      })
    },
    setChecked (index, row) {
      if (row.fieldType !== 'checkbox') {
        row.options.forEach((o, rowIndex) => {
          o.checked = index === rowIndex
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .field-list {
    .el-row {
      margin-bottom: 10px;

      .el-col {
        .element-sort {
          cursor: move;
        }
      }
    }
    [class*=el-switch]{
      margin-top: 5px;
    }
    .el-form-item__error {
      display: none !important;
    }
  }
  .preset-button{
    .el-button{
      margin-bottom: 10px;
    }
  }
</style>
