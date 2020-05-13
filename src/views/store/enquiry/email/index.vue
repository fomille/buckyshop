<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('enquiry.email.pageTitle')">
    <h3>
      {{ $t('enquiry.email.pageTitle') }}
    </h3>
    <page-block>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-position="top"
      >
          <el-row
            :gutter="10"
          >
            <el-col :span="11">
              <small class="text-secondary">
                {{$t('enquiry.email.entity.email.label')}}
              </small>
            </el-col>
            <el-col :span="11">
              <small class="text-secondary">
                {{$t('enquiry.email.entity.userName.label')}}
              </small>
            </el-col>
          </el-row>
          <el-row
            v-for="(o, index) in entity.data"
            :key="`email-${index}`"
            class="mt-2"
            :gutter="10"
          >
            <el-col :span="11">
              <el-form-item
                :prop="`data.${index}.email`"
                :rules="formRules.email"
              >
                <el-input
                  size="small"
                  :placeholder="$t('enquiry.email.entity.email.placeholder')"
                  v-model="o.email"
                  @blur="emailBlur(o)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                :prop="`data.${index}.name`"
                :rules="formRules.userName"
              >
                <el-input
                  size="small"
                  :maxlength="255"
                  show-word-limit
                  :placeholder="$t('enquiry.email.entity.userName.placeholder')"
                  v-model="o.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              class="text-right"
              :span="2"
              v-show="entity.data.length > 1"
            >
              <el-button
                class="no-border"
                icon="el-icon-delete"
                circle
                size="small"
                @click="removeItem(index)"
              ></el-button>
            </el-col>
          </el-row>
        <p
          v-if="entity.data.length < 5"
          class="mt-7">
          <el-button
            type="primary"
            size="small"
            @click="addItem()">
            {{ $t("enquiry.email.addOne") }}
          </el-button>
        </p>
      </el-form>
    </page-block>
    <div class="fixed-action" v-show="unsaved">
      <div class="fixed-action-label">
        {{ $t("base.unsaved") }}
      </div>
      <div class="fixed-action-button">
        <el-button type="info" size="small" @click="unsaved = false">{{ $t("base.cancel") }}</el-button>
        <el-button type="primary" size="small" @click="formValidation">{{ $t("base.save") }}</el-button>
      </div>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../../plugins/page/unsaved'
import * as enquiry from '../../../../plugins/api/enquiry'

export default {
  name: 'enquiryEmail',
  extends: extend,
  data () {
    /**
     * 邮箱是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validateEmail = (rule, value, callback) => {
      const m = this.entity.data.filter((o) => {
        return o.email === value
      })
      if (m.length > 1) {
        callback(new Error(this.$t('enquiry.email.entity.email.exists')))
      } else {
        callback()
      }
    }
    return {
      entity: {
        data: [
          {
            email: '',
            name: ''
          }
        ]
      },
      formRules: {
        email: [
          {
            required: true,
            message: this.$t('enquiry.email.entity.email.required'),
            trigger: 'blur'
          },
          {
            type: 'email',
            message: this.$t('enquiry.email.entity.email.custom'),
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: this.$t('enquiry.email.entity.userName.required'),
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
    this.getData()
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      const formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateReceiver()
        } else {
          this.$message({
            type: 'error',
            message: this.$t('base.formValidation.inadequate')
          })
        }
      })
    },
    /**
     * 分页
     */
    getData () {
      enquiry.enquiryEmail({
        siteId: this.shopCode
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity.data = result.data
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updateReceiver () {
      enquiry.enquiryEmailUpdate({
        emailList: this.entity.data,
        siteId: this.shopCode
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 添加一项
     */
    addItem () {
      this.entity.data.push({
        email: '',
        name: ''
      })
    },
    /**
     * 删除一项
     * @param index
     */
    removeItem (index) {
      this.entity.data.splice(index, 1)
    },
    /**
     * 删除帐号中的空格
     */
    emailBlur (row) {
      row.email = this.utility.removeAllSpace(row.email)
    }
  }
}
</script>
