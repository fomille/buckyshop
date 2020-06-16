<template>
  <div
  >
    <div
      v-if="privateLink"
      :class="`link-picker-has ${size} clearfix`">
      <el-button
        size="small"
        class="float-right"
        circle
        icon="el-icon-close"
        @click="clearValue"
      ></el-button>
      <p class="text-truncate">
        {{linkTitle}}
      </p>
    </div>
<!--    :width="width-26"-->
    <el-popover
      placement="top"
      trigger="click"
      v-model="visible"
      v-if="!privateLink"
    >
      <el-input
        :size="size"
        class="link-picker-input"
        v-model="searchKeyword"
        @blur="linkChange"
        :placeholder="$t('component.linkPicker.placeholder')"
        slot="reference"></el-input>
      <div class="link-picker">
        <dl
          v-show="menuVisible"
          class="link-picker-menu">
          <dd
            v-for="(o, index) in $t('component.linkPicker.menu')"
            :class="o.async ? 'has-sub' : ''"
            :key="index"
            @click="getData(o)"
          >
            {{o.label}}
          </dd>
        </dl>
        <dl
          v-show="contentVisible"
          class="link-picker-menu">
          <dt>
            <label
              v-if="dataset.length > 0"
              class="float-right">
              {{dataset.length}} {{$t('component.linkPicker.records')}}
            </label>
            <el-button type="text" @click="previous">
              <i class="el-icon-arrow-left"></i>
              {{$t('base.back')}}
            </el-button>
          </dt>
          <dd
            v-for="(o, index) in dataset"
            :key="index"
            class="text-truncate"
            @click="setData(o)"
          >
            <img v-if="o.imageUrl" :src="o.imageUrl" >
            {{o.title}}
          </dd>
        </dl>
      </div>
    </el-popover>
  </div>
</template>

<script>
import extend from '../../../../../plugins/page/base'
import * as http from '../../../../../plugins/api/theme'

/**
* 链接选择器
*/
export default {
  name: 'link-picker',
  extends: extend,
  data () {
    return {
      searchKeyword: '',
      menuVisible: true,
      contentVisible: false,
      dataset: [],
      visible: false,
      privateLink: '',
      linkTitle: ''
    }
  },
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    width: {
      type: Number,
      default: () => {
        return 500
      }
    },
    size: {
      type: String,
      default: () => {
        return 'medium'
      }
    }
  },
  watch: {
    privateLink (val) {
      this.$emit('input', val)
    },
    visible (value) {
      if (value) {
        this.menuVisible = true
        this.contentVisible = false
      }
    },
    value () {
      this.privateLink = this.value
      this.getTitle()
    }
  },
  created () {
    this.privateLink = this.value
    this.getTitle()
  },
  methods: {
    clearSearchKey () {
      this.searchKeyword = ''
    },
    /**
     * 返回
     */
    previous () {
      this.menuVisible = true
      this.contentVisible = false
      document.querySelector('.link-picker-input').focus()
    },
    /**
     * 获取链接数据
     * @param row
     */
    getData (row) {
      if (row.async) {
        this.dataset = []
        this.menuVisible = false
        this.contentVisible = true
        http.urlSearch({
          type: row.type,
          q: this.searchKeyword,
          shopCode: this.shopCode,
          size: 30,
          current: 1
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                if (row.all) {
                  this.dataset = result.data.list
                  // [row.all].concat(result.data.list)
                } else {
                  this.dataset = result.data
                }
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      } else {
        this.visible = false
        this.$t('component.linkPicker.menu').forEach((o) => {
          if (o.label === row.label) {
            this.linkTitle = o.label
            this.privateLink = o.url
          }
        })
      }
    },
    /**
     * 设置数据
     * @param row
     */
    setData (row) {
      let url = row.url
      if (url.indexOf('#') === -1) {
        url = url + '#' + row.title
      }
      this.privateLink = url
      this.linkTitle = row.title
      this.visible = false
    },
    /**
     * 清空值
     */
    clearValue () {
      // alert(this.privateLink)
      this.privateLink = ''
      this.clearSearchKey()
      setTimeout(() => {
        this.previous()
      }, 150)
    },
    /**
     * 分拆标题
     */
    getTitle () {
      if (!this.utility.isEmpty(this.privateLink)) {
        const m = this.privateLink.split('#')
        m.splice(0, 1)
        this.linkTitle = m.length > 0 ? m.join('#') : this.privateLink
      }
    },
    linkChange (e) {
      if (e.target.value && (e.target.value.indexOf('http://') > -1 || e.target.value.indexOf('https://') > -1)) {
        this.privateLink = e.target.value
        this.linkTitle = e.target.value
        this.visible = false
        this.clearSearchKey()
      }
    }
  }
}
</script>
<style lang='scss'>
  $themeColor: #46a0fc;
  .el-message-dialog {
    width: 660px !important;
  }
  .link-picker {
    max-height: 286px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: -11px -12px;

    .link-picker-menu {
      overflow: hidden;
      padding: 0;
      border-radius: 3px;
      margin: 0;

      dd {
        margin: 0;
        cursor: pointer;
        list-style-type: none;
        line-height: 40px;
        padding: 0 20px;
        transition: all 0.5s;

        &:hover {
          background-color: $themeColor;
          color: #fff;
        }

        &.has-sub {
          &:after {
            float: right;
            color: #c2c2c2;
            content: ">";
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid #e9ecef;
        }

        img{
          height: 30px;
          vertical-align: middle;
        }
      }

      dt {
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #e9ecef;
      }
    }
  }
  .link-picker-has {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    background-color: #fff;

    p {
      margin: 0 !important;
      padding: 0 15px !important;
    }

    .el-button {
      padding: 5px;
      margin: 7px 8px 0 0;
    }

    &.small {
      height: 32px;
      line-height: 32px;

      p {
        padding: 0 8px !important;
      }

      .el-button {
        padding: 3px;
        margin: 6px 8px 0 0;
      }
    }
  }
  .el-input__inner {
    /*border: 0 !important;*/
  }
</style>
