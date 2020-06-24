<template>
  <div>
    <div class="section-image-block">
      <div class="section-image-block-none" v-if="imageURL === ''">
        <p class="text-center embed-responsive" @click="displayExplore=true" v-if="imageURL === ''">
          <i class="el-icon-plus"></i>
        </p>
      </div>
      <div class="section-image-block-img" @click="displayExplore=true" v-if="imageURL !== ''">
        <div class="embed-responsive">
          <img class="embed-responsive-item" :src="imageURL">
        </div>
      </div>
      <el-button-group v-if="imageURL !== ''">
        <el-button @click="displayExplore=true" v-if="changeButton">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button v-if="altButton" @click="loadAltDialog">
          <i :class="`bs-alt${imageAlt ? ' text-success' : ''}`"></i>
        </el-button>
        <el-button v-if="removeButton" @click="removeImage">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div v-if="displayExplore" class="editor-explore">
      <h4 class="editor-explore-title" @click="displayExplore=false">
        {{ $t("design.imageBlock.heading") }}
      </h4>
      <div class="editor-explore-content">
        <el-row :gutter="10">
          <el-col
            class="text-center"
            :offset="1"
            :span="11">
            <el-upload
              multiple
              action="/api/admin/oss/simple-file-upload"
              :show-file-list="false"
              :limit="100"
              :accept="'image/*'"
              :headers="headers"
              :data="aliyunOSS"
              :with-credentials="true"
              :on-success="uploadSuccess"
              :before-upload="uploadBefore">
              <div class="embed-responsive">
                <div class="embed-responsive-item">
                  <i class="el-icon-upload"></i>
                </div>
              </div>
            </el-upload>
          </el-col>
          <el-col
            v-for="(o, index) in imageList"
            :key="o.url + index"
            @click.native="imageChecked($event, o)"
            :offset="index % 2"
            :span="11">
            <div class="embed-responsive editor-explore-img">
              <img class="embed-responsive-item" :src="o.url">
              <label></label>
            </div>
          </el-col>
        </el-row>
        <div
          v-if="pageCount > pageIndex && !loading"
          @click="nextPage"
          class="section-image-block-more">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div v-if="displaySelected" class="editor-explore-bottom">
        <p class="absolutely text-right">
<!--          <el-button-->
<!--            @click="deleteImage"-->
<!--            circle-->
<!--            icon="el-icon-delete"-->
<!--            class="mr-4"-->
<!--            size="small">-->
<!--          </el-button>-->
          <el-button
            @click="selected"
            type="primary"
            size="small">
            {{ $t("design.imageBlock.selected") }}
          </el-button>
        </p>
      </div>
    </div>
    <div v-if="displayAlt" style="background-color: blue;position: fixed;height: 300px;width: 200px;left: 100px;top: 109px;border:1px solid red;z-index: 10000"></div>
  </div>
</template>

<script>
import extend from '../../../../../plugins/page/base'
import * as http from '../../../../../plugins/api/common'

export default {
  name: 'section-image-picker',
  extends: extend,
  data () {
    return {
      displaySelected: false,
      displayExplore: false,
      displayAlt: false,
      fileUploading: false,
      imageURL: '',
      selectedItem: {},
      imageList: [],
      fileLimit: 30,
      imageAlt: '',
      aliyunOSS: {
        isRename: true,
        ossKey: 'us-buckyshop',
        fileName: ''
      },
      headers: {
        shopCode: '086de2ed2a787a58b491e6bb95f0cf74'
      },
      pageIndex: 1,
      pageSize: 11,
      pageCount: 0,
      uploadFileList: []
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    alt: {
      type: String,
      default: () => ''
    },
    changeButton: {
      type: Boolean,
      default: () => true
    },
    altButton: {
      type: Boolean,
      default: () => false
    },
    removeButton: {
      type: Boolean,
      default: () => true
    }
  },
  watch: {
    imageURL (val) {
      this.$emit('input', val)
    },
    displayExplore (val) {
      if (val) {
        this.pageIndex = 1
        this.imageList = []
        this.getData()
      }
    }
  },
  created () {
    this.imageURL = this.value
    this.imageAlt = this.alt
  },
  methods: {
    removeImage () {
      this.imageURL = ''
    },
    /**
     * 下一页
     */
    nextPage () {
      if (this.pageIndex < this.pageCount) {
        this.pageIndex++
        this.getData()
      }
    },
    getData () {
      this.loading = true
      this.pageSize = this.pageIndex === 1 ? 11 : 10
      http.resourcesPaging({
        current: this.pageIndex,
        page: this.pageSize,
        item: {
          shopCode: this.shopCode,
          resGroup: 1
        }
      })
        .then(result => {
          this.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.imageList = this.imageList.concat(result.data.records)
              this.pageCount = result.data.pages
            }
            this.getDefaultImage()
          })
        })
        .catch(error => {
          this.loading = false
          this.networkMistake(error)
          this.getDefaultImage()
        })
    },
    getDefaultImage () {
      // if (this.imageList.length === 0) {
      //   this.imageList = [
      //     {
      //       createTime: 1591709937694,
      //       updateTime: 1591709937694,
      //       id: 681,
      //       resourceCode: '306798993460e0455e7b5336db9885e3',
      //       shopCode: '086de2ed2a787a58b491e6bb95f0cf74',
      //       url: 'https://upload.mybuckyshop.com/2020/06/09/CZY-MWiNKgeBZJaW3fL0Eh.jpg',
      //       flag: 1,
      //       resGroup: 1
      //     },
      //     {
      //       createTime: 1591709983510,
      //       updateTime: 1591709983510,
      //       id: 682,
      //       resourceCode: 'c3f4eb9be3bf12595ee01dd88b2292fb',
      //       shopCode: '086de2ed2a787a58b491e6bb95f0cf74',
      //       url: 'https://upload.mybuckyshop.com/2020/06/09/7t9UoZadKUQ9Dj-vmBD3Eh.jpg',
      //       flag: 1,
      //       resGroup: 1
      //     },
      //     {
      //       createTime: 1591711324731,
      //       updateTime: 1591711324731,
      //       id: 683,
      //       resourceCode: '57335dd6ebcd8225432909bad4017392',
      //       shopCode: '086de2ed2a787a58b491e6bb95f0cf74',
      //       url: 'https://upload.mybuckyshop.com/2020/06/09/F_J4FmRaaKK9mai1fMtdyM.JPG',
      //       flag: 1,
      //       resGroup: 1
      //     }
      //   ]
      // }
    },
    /**
     * 将图片置为选择状态
     */
    imageChecked (o, row) {
      document.querySelectorAll('.editor-explore .el-col').forEach((o) => {
        o.classList.remove('active')
      })
      o.currentTarget.classList.add('active')
      this.displaySelected = true
      this.selectedItem = row
    },
    /**
     * 上传完成
     * @param result
     * @param file
     * @param fileList
     */
    uploadSuccess (result, file, fileList) {
      if (result.success) {
        http.resourceUpdate({
          shopCode: this.shopCode,
          url: result.data.cdnUrl,
          flag: 1,
          resGroup: 1
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
        this.imageList.splice(0, 0, {
          url: result.data.cdnUrl
        })
      }
    },
    /**
     * 上传前处理
     * @param file
     * @returns {boolean}
     */
    uploadBefore (file) {
      const isLt2M = file.size < 1024 * 1024 * 5
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 5M')
      }
      this.aliyunOSS.fileName = file.name
      return isLt2M
    },
    /**
     * 选择图片
     */
    selected () {
      if (this.selectedItem) {
        this.imageURL = this.selectedItem.url
      }
      this.displayExplore = false
    },
    /**
     * 删除图片
     */
    deleteImage () {
      if (this.selectedItem) {
        this.$confirm(
          this.$t('base.delete.subheading'),
          this.$t('base.delete.heading'),
          {
            confirmButtonText: this.$t('base.confirm'),
            cancelButtonText: this.$t('base.cancel'),
            type: 'error',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                this.datasource
                  .resourcesDelete({
                    ids: [this.selectedItem.id]
                  })
                  .then(result => {
                    result.options = {
                      action: this.actionType.delete
                    }
                    this.resultMessage(result, (success) => {
                      done()
                      instance.confirmButtonLoading = false
                      if (success) {
                        this.imageList.forEach((o, index) => {
                          if (o.id === this.selectedItem.id) {
                            this.imageList.splice(index, 1)
                          }
                        })
                        this.displaySelected = false
                      }
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
          }
        )
      }
    },
    /**
     * 修改alt
     */
    editAlt () {
      this.displayAlt = false
      this.imageAlt = this.imageAlt.replace(/(^\s*)|(\s*$)/g, '')
    },
    /**
     * 修改ALT弹窗
     */
    loadAltDialog () {
      const h = this.$createElement
      this.$msgbox({
        customClass: 'el-message-dialog',
        title: this.$t('component.imageAlt.heading'),
        message: h('div', { class: 'el-row', style: 'margin-left: -10px; margin-right: -10px;' }, [
          h('div', { class: 'el-col el-col-6', style: 'padding-left: 10px; padding-right: 10px;' }, [
            h('img', {
              class: 'absolutely',
              attrs: {
                src: this.imageURL
              }
            })
          ]),
          h('div', { class: 'el-col el-col-18', style: 'padding-left: 10px; padding-right: 10px;' }, [
            h('p', null, 'ALT'),
            h('div', {
              class: 'el-input'
            }, [
              h('input', {
                class: 'el-input__inner border',
                attrs: {
                  placeholder: this.$t('component.imageAlt.entity.alt.placeholder'),
                  'data-alt': '0'
                },
                domProps: {
                  value: this.imageAlt
                }
              })
            ]),
            h('p', {
              style: 'margin-top:10px;'
            }, this.$t('component.imageAlt.subheading'))
          ])
        ]),
        closeOnClickModal: false,
        showCancelButton: true,
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.imageAlt = document.querySelector('[data-alt]').value
            this.$emit('updateAlt', this.imageAlt)
            done()
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>
<style lang='scss'>
  .el-message-dialog {
    width: 660px !important;
  }
  .section-image-block-more {
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    transition: all 0.25s;
    color: #fff;

    &:hover {
      color: rgba(255, 255, 255, .5);
    }
  }
</style>
