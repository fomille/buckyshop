import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n/base'
import 'normalize.css'
import './assets/css/base.scss'
import './assets/css/element-variables.scss'
import utility from './plugins/utility'
import PageBlock from './components/page/page-block'
import PageLoading from './components/page/page-loading'
import PageTable from './components/page/paging-table'
import PageBlockBase from './components/page/page-block-base'
import elementUI from 'element-ui'

Vue.use(elementUI)
Vue.config.productionTip = false
Vue.prototype.utility = utility
Vue.component('PageBlock', PageBlock)
Vue.component('PageBlockBase', PageBlockBase)
Vue.component('PageLoading', PageLoading)
Vue.component('PagingTable', PageTable)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
