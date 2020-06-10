<template>
  <page-loading
    :page-loading="pageLoading"
    :page-is-valid="pageIsValid"
    v-title="$t('enquiry.inbox.update.pageTitle')"
  >
    <div class="enquiry-page">
      <p
        @click="goBack"
        class="go-back">
        <i class="el-icon-arrow-left"></i>
        {{ $t("enquiry.inbox.paging.pageTitle") }}
      </p>
      <h3 class="page-title">
        {{ $t("enquiry.inbox.update.pageTitle") }}
      </h3>
      <el-row :gutter="20">
        <el-col :span="17">
          <page-block
            class="enquiry-content">
            <template
              v-for="(item, index) in Object.entries(enquiryDetail.content)"
            >
              <el-row :gutter="20" :key="index">
                <el-col :span="6">
                  <div class="enquiry-page-label">{{ item[0] }}</div>
                </el-col>
                <el-col :span="18">
                  <div class="enquiry-page-value">
                    <span v-if="item[0] !== 'Attachment'">{{ item[1] }} </span>
                    <a class="download-link" :href="item[1]" :download="`Attachment${enquiryDetail.id}`" v-else>下载附件</a>
                  </div>
                </el-col>
              </el-row>
              <el-divider :key="`divider-${index}`"></el-divider>
            </template>
          </page-block>

          <page-block
            :heading="$t('enquiry.inbox.update.source.heading')"
            class="enquiry-content"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{$t('enquiry.inbox.update.source.title')}}
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value">
                {{enquiryDetail.refTitle}}
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{$t('enquiry.inbox.update.source.url')}}
                </div>
              </el-col>
              <el-col :span="18" class="enquiry-page-value">
                <a :href="enquiryDetail.refUrl" class="text-secondary" target="_blank">{{enquiryDetail.refUrl}}</a>
              </el-col>
            </el-row>
            <el-divider v-if="enquiryDetail.userAgent"></el-divider>
            <el-row
              v-if="enquiryDetail.userAgent"
              :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{$t('enquiry.inbox.update.source.browser')}}
                </div>
              </el-col>
              <el-col :span="18" class="enquiry-page-value">
                {{enquiryDetail.userAgent}}
              </el-col>
            </el-row>
          </page-block>

          <page-block
            :heading="$t('enquiry.inbox.update.track.heading')"
            class="enquiry-record">
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
                maxlength="255"
                show-word-limit
                :placeholder="$t('enquiry.inbox.update.track.message')"
                v-model="enquiryStateModel.remark"
              ></el-input>
              <div class="text-right">
                <el-button
                  class="mt-4"
                  type="primary"
                  size="small"
                  @click="handleConfirm"
                  :disabled="utility.isEmpty(enquiryStateModel.remark)"
                  >
                  {{$t('base.save')}}
                </el-button>
              </div>
            </div>
            <div class="mt-6">
              <el-timeline class="enquiry-record-timeline">
                <el-timeline-item
                  v-for="timeline in enquiryRecordList"
                  :key="timeline.id"
                  :hide-timestamp="true"
                  color="#3F9EFF"
                  placement="top"
                >
                  <div class="enquiry-record-timeline-item">
                    <el-row type="flex" justify="space-between">
                      <div class="label">{{ timeline.operator }}</div>
                      <div class="timestamp">
                        {{
                        utility.timestampToDatetime(timeline.createTime)
                        }}
                      </div>
                    </el-row>
                    <div class="remark mt-2">
                      {{ timeline.remark || "remark" }}
                    </div>
                    <el-divider></el-divider>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </page-block>
        </el-col>
        <el-col :span="7">
          <page-block>
            <el-row :gutter="20">
              <el-col :span="7">
                <el-image
                  class="enquiry-page-img"
                  :src="enquiryDetail.refImg || imagePlaceholder"
                  fit="fill"
                >
                  <div slot="error" class="image-slot image-slot-error">
                    <i class="el-icon-picture-outline image-icon"></i>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="17">
                <a :href="enquiryDetail.refUrl" class="text-secondary" target="_blank">{{
                  enquiryDetail.refTitle
                }}</a>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{ $t("enquiry.inbox.update.form.id") }}
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value text-right">
                  {{ enquiryDetail.id }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{ $t("enquiry.inbox.update.form.name") }}
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value text-right">
                  {{ enquiryDetail.formName }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  IP
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value text-right">
                  <div>{{ enquiryDetail.ip }}</div>
                  <div v-if="enquiryDetail.country || enquiryDetail.province || enquiryDetail.city">
                    ({{ enquiryDetail.country }}{{ enquiryDetail.province
                    }}{{ enquiryDetail.city }})
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{ $t("enquiry.inbox.update.form.time") }}
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value text-right">
                  {{
                  utility.timestampToDatetime(enquiryDetail.createTime)
                  }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="enquiry-page-label">
                  {{ $t("enquiry.inbox.update.form.state") }}
                </div>
              </el-col>
              <el-col :span="18">
                <div class="enquiry-page-value text-right">
                  <el-tag
                    :type="
                      this.utility.getDicType(
                        this.enquiryState,
                        enquiryDetail.state,
                        'type'
                      )
                    "
                    >{{
                      utility.getDicType(
                        enquiryState,
                        enquiryDetail.state
                      )
                    }}</el-tag
                  >
                </div>
              </el-col>
            </el-row>
            <el-button
              class="mt-5 mb-6 btn-block"
              type="primary"
              @click="dialogVisible = true"
              >
              {{ $t("enquiry.inbox.update.form.change") }}
            </el-button
            >
          </page-block>
          <page-block>
            <div class="user-info">
              <router-link :to="customerLink">
                <el-avatar style="background: #46a0fc" v-if="avatar">{{
                  avatar
                }}</el-avatar>
                <el-avatar
                  icon="el-icon-user-solid"
                  style="background: #FFCC01"
                  v-else
                ></el-avatar>
              </router-link>
              <router-link class="mt-3 text-primary" :to="customerLink"
                >{{ enquiryDetail.client.firstName }}
                {{ enquiryDetail.client.lastName }}</router-link
              >
              <router-link class="mt-3 text-secondary" :to="customerLink">{{
                enquiryDetail.client.email
              }}</router-link>
              <router-link class="mt-3" :to="customerLink">{{
                enquiryDetail.client.phone
              }}</router-link>
              <div class="mt-3">
                {{ $t("enquiry.inbox.update.form.quantity") }}
              </div>
              <div class="count mt-3">{{ enquiryDetail.client.enquires }}</div>
            </div>
          </page-block>
        </el-col>
      </el-row>
      <el-dialog :title="$t('enquiry.inbox.update.dialog.title')" :visible.sync="dialogVisible" :close-on-click-modal="false" width="550px">
        <el-form
          :model="enquiryStateModel"
          ref="stateChangeForm"
          label-position="top"
        >
          <el-form-item :label="$t('enquiry.inbox.update.form.state')">
            <el-select
              v-model="enquiryStateModel.state"
              :placeholder="$t('base.selectPlaceholder')"
            >
              <el-option
                v-for="{ label, value } in enquiryState"
                :key="value"
                :label="label"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('enquiry.inbox.update.dialog.remark')">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              maxlength="255"
              show-word-limit
              :placeholder="$t('enquiry.inbox.update.track.message')"
              v-model.trim="enquiryStateModel.remark"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">
            {{$t('base.cancel')}}
          </el-button>
          <el-button
            type="primary"
            :disabled="enquiryStateModel.state === enquiryDetail.state"
            @click="handleConfirm"
            >
            {{$t('base.save')}}
          </el-button
          >
        </span>
      </el-dialog>
    </div>
  </page-loading>
</template>

<script>
import extend from '../../../../plugins/page/paging'
import * as enquiry from '../../../../plugins/api/enquiry'
import dict from '../../../../plugins/dict'

export default {
  name: 'enquiryDetail',
  extends: extend,
  data () {
    return {
      ...dict,
      dialogVisible: false,
      enquiryStateModel: {
        state: null
      },
      enquiryDetail: {
        client: {},
        content: {}
      },
      enquiryRecordList: [],
      imagePlaceholder: 'https://theme.fomillesite.com/img/placeholder.jpg'
    }
  },
  computed: {
    avatar () {
      const { firstName, lastName } = this.enquiryDetail.client
      return firstName ? firstName.charAt() : lastName ? lastName.charAt() : ''
    },
    customerLink () {
      return `/site/${this.shopCode}/customer/update/${
        this.enquiryDetail.client.id
      }`
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.enquiryStateModel.remark = ''
      }
      this.enquiryStateModel.state = this.enquiryDetail.state
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
      this.getEnquiryRecord()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 跳转回列表
     */
    goBack () {
      this.$router.push(`/${this.shopCode}/enquiry/inbox`)
    },
    /**
     * 添加询盘跟踪记录
     */
    handleConfirm () {
      if (this.enquiryStateModel.state === this.enquiryDetail.state && !this.enquiryStateModel.remark) {
        this.dialogVisible = false
        return
      }
      const params = {
        createTime: this.utility.timestamp(),
        enquiryId: this.id,
        ...this.enquiryStateModel
      }
      enquiry.enquiryUpdate(params)
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.$message.success(result.msg)
              this.enquiryDetail.state = this.enquiryStateModel.state
              this.enquiryStateModel.remark = ''
              this.getEnquiryRecord()
              this.dialogVisible = false
            } else {
              this.$message.error(result.msg)
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 获取详情
     */
    getDetail () {
      enquiry.enquiryDetail({
        shopCode: this.shopCode,
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.enquiryDetail = {
                ...result.data,
                content: JSON.parse(result.data.content)
              }
              this.enquiryStateModel.state = result.data.state
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 询盘追踪记录列表
     */
    getEnquiryRecord () {
      const params = {
        shopCode: this.shopCode,
        id: this.id
      }
      enquiry.enquiryTimeline(params)
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              this.enquiryRecordList = result.data
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    }
  }
}
</script>

<style lang="scss">
.enquiry-page {
  &-img {
    width: 60px;
    height: 60px;
  }
  &-label,
  &-value {
    word-break: break-all;
    font-size: 14px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  &-value {
    color: #c0c4cc;
  }
  .enquiry-content {
    .el-divider {
      margin: 0;
    }
    .enquiry-page-value {
      color: #909399;
    }
  }
  .enquiry-record {
    &-timeline {
      padding-left: 0;
      &-item {
        .el-divider {
          margin: 12px 0;
        }
        .timestamp,
        .label {
          color: #c0c4cc;
        }
        .remark {
          color: #909399;
        }
      }
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*font-size: 14px;*/
    .count {
      font-size: 32px;
    }
  }
  .state-tag {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    background: #f4f4f5;
  }
  .download-link {
    text-decoration: underline;
  }
}
</style>
