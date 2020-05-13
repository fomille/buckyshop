<template>
  <div id="app">
    <router-view/>
    <div v-if="!updateBrowser" class="update-browser">
      <div class="container">
        <h3>
          {{$t('updateBrowser.heading')}}
        </h3>
        <h5>
          {{$t('updateBrowser.content')}}
        </h5>
        <el-row :gutter="20">
          <el-col :span="4">
            <a href="https://www.google.com/chrome" target="_blank">
              <p>
                <img src="https://site-file.fomillesite.com/1165170418698895361/1566714441439.png!2">
              </p>
              <p>
                {{$t('updateBrowser.chrome')}}
              </p>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://www.firefox.com/" target="_blank">
              <p>
                <img src="https://site-file.fomillesite.com/1165170418698895361/1566714463449.png!2">
              </p>
              <p>
                {{$t('updateBrowser.firefox')}}
              </p>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://www.apple.com/safari/" target="_blank">
              <p>
                <img src="https://site-file.fomillesite.com/1165170418698895361/1566714474145.png!2">
              </p>
              <p>
                {{$t('updateBrowser.safari')}}
              </p>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://www.opera.com/" target="_blank">
              <p>
                <img src="https://site-file.fomillesite.com/1165170418698895361/1566714468709.png!2">
              </p>
              <p>
                {{$t('updateBrowser.opera')}}
              </p>
            </a>
          </el-col>
          <el-col :span="4" :offset="2">
            <a href="https://www.browseupdate.com/" target="_blank" class="el-icon-arrow-right">
              {{$t('updateBrowser.button')}}
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div
      v-if="!pageLoaded"
      class="app-loading">
      <div class="app-loading-ball">
        <label></label>
        <label></label>
        <label></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      updateBrowser: true,
      pageLoaded: false,
      userAgent: ''
    }
  },
  computed: {
    userAside: function () {
      return this.$route.meta.userAside
    },
    displayHeader: function () {
      return this.$route.meta.header
    }
  },
  mounted () {
    this.pageLoaded = true
  },
  created () {
    const userAgent = navigator.userAgent
    this.userAgent = userAgent
    this.updateBrowser = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('Firefox') > -1 || userAgent.indexOf('Safari') > -1 || userAgent.indexOf('Chrome') > -1
  }
}
</script>
