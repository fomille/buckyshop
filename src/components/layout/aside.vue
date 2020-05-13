<template>
  <aside>
    <!-- @open="handleOpen"
    @close="handleClose"-->
    <!--:default-openeds="['/merchant']"-->
    <el-menu
      :default-active="activeMenu"
      class="layout-aside"
      :default-openeds="['0','1']"
      router
    >
      <template v-for="(route, index) in routeList">
        <el-submenu
          :key="route.path"
          :index="route.url || index.toString()"
          v-if="route.children && route.children.length">
          <template slot="title">
            <i :class="route.icon"></i>
            <span>{{route.name}}</span>
          </template>
          <el-menu-item
            v-for="subRoute in route.children"
            :key="subRoute.path"
            :index="subRoute.path"
          >
            {{subRoute.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          :key="route.path"
          :index="route.url || index.toString()"
          v-else>
          <i :class="route.icon"></i>
          <span>{{route.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script>
export default {
  name: 'LayoutAside',
  data () {
    return {
      routeList: [
        {
          name: '模版',
          icon: '',
          children: [
            {
              name: '我的主题',
              path: '/:langCode/:shopCode/store/themes'
            }
          ]
        },
        {
          name: '询盘',
          icon: '',
          children: [
            {
              name: this.$t('enquiry.inbox.paging.pageTitle'),
              path: '/:langCode/:shopCode/store/enquiry/inbox'
            },
            {
              name: this.$t('enquiry.form.paging.pageTitle'),
              path: '/:langCode/:shopCode/store/enquiry/form'
            },
            {
              name: this.$t('enquiry.email.pageTitle'),
              path: '/:langCode/:shopCode/store/enquiry/email'
            }
          ]
        }
      ]
    }
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
    if (this.$route.params.shopCode) {
      this.shopCode = this.$route.params.shopCode
    }
    this.langCode = this.$route.params.langCode || 'en'
    this.routeList.forEach((o) => {
      if (o.path) {
        o.path = o.path.replace(':langCode', this.langCode).replace(':shopCode', this.shopCode)
      }
      o.children.forEach((sub) => {
        if (sub.path) {
          sub.path = sub.path.replace(':langCode', this.langCode).replace(':shopCode', this.shopCode)
        }
      })
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
