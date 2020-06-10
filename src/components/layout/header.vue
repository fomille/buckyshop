<template>
  <header>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      class="float-right"
      @select="openMenu"
      :router="false"
    >
      <!--<el-menu-item index="1">-->
      <!--{{ $t("header.feedback") }}-->
      <!--</el-menu-item>-->
      <el-submenu index="9" class="avatar">
        <template slot="title">
          <span class="avatar-circle">{{ userModel.initial }}</span>
          {{ userModel.firstName }}
          {{ userModel.lastName }}
        </template>
        <el-menu-item>
          <a  href="/support" target="_blank">
            帮助中心
          </a>
        </el-menu-item>

        <!--        <el-submenu index="91">-->
        <!--          <template slot="title">{{ $t("base.language") }}</template>-->
        <!--          <el-menu-item @click="setLanguage(item.value)" v-for="item in items" :key="item.value">{{ item.label }}</el-menu-item>-->
        <!--        </el-submenu>-->
        <el-menu-item index="logout" class="el-menu-item-divided">
           退出
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="header-start">
      <a href="https://www.buckydrop.com/en/" target="_blank" class="logo">
        <img src="//cdn.buckydrop.com/starit-buckydrop/2020/dist/logo_small.6d79f258.png">
      </a>
      <a href="https://www.buckydrop.com/en/admin">
        BuckyDrop
      </a>
      <a href="https://www.buckydrop.com/en/shop" class="active">
        BuckyShop
      </a>
    </div>
  </header>
</template>
<style lang="scss">
  .el-menu-item {
    a {
      height: 36px;
      line-height: 36px;
      color: #909399;
      &:hover {
        color: #303133;
      }
    }
  }
</style>
<script>
import extend from '../../plugins/page/base'
export default {
  name: 'layoutHeader',
  extends: extend,
  data () {
    return {
      activeIndex: '1',
      items: [
        {
          value: 'zh-CN',
          label: '中文'
        },
        {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },
  computed: {
    userModel () {
      const userModel = this.$store.state.userModel
      userModel.initial = userModel.lastName ? userModel.lastName.substring(0, 1).toLocaleUpperCase() : ''
      return userModel
    }
  },
  created () {
  },
  methods: {
    setLanguage: function (val) {
      localStorage.setItem('language', val)
      this.$i18n.locale = val
    },
    /**
       * 打开菜单
       */
    openMenu (url) {
      if (url === 'logout') {
        localStorage.clear()
        this.$router.push({
          path: '/passport'
        })
      } else {
        this.$router.push({
          path: url
        })
      }
    }
  }
}
</script>
