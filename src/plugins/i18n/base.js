import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cnLang from './zh-CN'
import enLang from './en'
import utility from '../utility'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
const lang = utility.getLanguage()
locale.use(lang === 'zh-CN' ? zhLocale : enLocale)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,
  messages: {
    'zh-CN': cnLang,
    en: enLang
  }
})

export default i18n
