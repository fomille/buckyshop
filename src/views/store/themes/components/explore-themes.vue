<template>
    <div>
      <el-dialog
        :title="$t('store.theme.explore.freeTheme')"
        :visible.sync="display"
        :show-close="true"
        :before-close="dialogClose"
        top="30px"
        width="60%">
        <div
          class="themes"
          v-loading="loading"
        >
          <el-button
            round
            :type="'' === tagCode ? 'primary' : ''"
            @click="tagsChange('')"
            size="small">
            {{ $t('store.theme.explore.all') }}
          </el-button>
          <el-button
            round
            v-for="o in tags"
            :type="o.tagCode === tagCode ? 'primary' : ''"
            :key="o.tagCode"
            @click="tagsChange(o.tagCode)"
            size="small"
          >
            {{o.tagName}}
          </el-button>
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="(o, index) in dataset"
              :key="`theme-${index}`"
            >
              <div
                class="themes-item"
                @click="detail(o)">
                <div :class="`embed-responsive embed-responsive-1by1${o.styleCode === model.styleCode ? ' active' : ''}`">
                  <img class="embed-responsive-item" :src="o.cover">
                  <div class="themes-item-action">
                    <a :href="o.link" target="_blank" >
                      <el-button
                        size="small"
                        type="primary"
                        round
                        plain>
                        {{ $t('store.theme.explore.preview') }}
                      </el-button>
                    </a>
                    <el-button
                      type="primary"
                      round
                      size="small"
                      @click="detail(o)"
                    >
                      {{ $t('store.theme.explore.select') }}
                    </el-button>
                  </div>
                </div>
                <p class="text-center">
                  {{ o.styleName }}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogClose">{{ this.$t('base.back') }}</el-button>
          <el-button v-show="displayDetail" size="small" :loading="selectLoading" type="primary" @click="selectTheme">
            {{ $t('store.theme.explore.add') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import extend from '../../../../plugins/page/base'
import * as http from '../../../../plugins/api/theme'

export default {
  name: 'explore-themes',
  extends: extend,
  data () {
    return {
      displayDetail: false,
      selectLoading: false,
      dataset: [],
      model: {
        styleCode: '',
        styleName: '',
        link: '',
        content: 'Simple is perfect for stores looking for a simple style to showcase their product.'
      },
      tagCode: '',
      tags: []
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.tagCode = ''
        this.getData()
      }
    }
  },
  methods: {
    detail (item) {
      this.model = item
      this.displayDetail = true
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('closeExplore', null)
    },
    /**
     * 选择使用主题并关闭窗体
     */
    selectTheme () {
      this.selectLoading = true
      this.$emit('closeExplore', this.model, () => {
        this.selectLoading = false
      })
    },
    /**
     * 按分类搜索
     */
    tagsChange (code) {
      this.tagCode = code
      this.getData()
    },
    /**
     * 主题分类
     */
    getTags () {
      http.styleRTagList({
        current: 1,
        size: 100,
        item: {
        }
      })
        .then(result => {
          this.tags = result.data.records
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 获取主题数据
     */
    getData () {
      if (this.tags.length === 0) {
        this.getTags()
      }
      this.model = {}
      this.loading = true
      this.displayDetail = false
      const condition = {
        current: 1,
        size: 100,
        item: {
          type: 1
        }
      }
      if (this.tagCode) {
        condition.item.tagCode = this.tagCode
      }
      http.styleList(condition)
        .then(result => {
          this.dataset = result.data.records
          this.loading = false
          // for (let i = 0; i < 10; i++) {
          //   this.dataset.push({
          //     cover: 'https://cdn.superbuy.com/starit-buckyshop-site/2019/simple/img/theme-details.jpg',
          //     link: 'https://cdn.superbuy.com/',
          //     refCode: 'BSTEMPLATE0000000006',
          //     styleCode: 'STYLE1349799961952288',
          //     styleName: 'styleName ' + i
          //   })
          // }
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
