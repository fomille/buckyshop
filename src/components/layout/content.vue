<template>
  <router-view v-if="fullScreen"></router-view>
  <div class="layout" v-else>
    <template v-if="hideCrumb">
      <router-view></router-view>
    </template>
    <template v-else>
      <bucky-header></bucky-header>
      <bucky-aside></bucky-aside>
      <div class="layout-container">
<!--        <breadcrumb></breadcrumb>-->
        <transition name="router-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import BuckyHeader from './header'
import BuckyAside from './aside'

export default {
  name: 'layoutContent',
  components: {
    BuckyHeader,
    BuckyAside
  },
  computed: {
    hideCrumb: function () {
      return this.$route.meta.hideCrumb
    },
    fullScreen: function () {
      return this.$route.meta.fullScreen
    }
  }
}
</script>
