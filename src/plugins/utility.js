Element.prototype.data = function (key, value) {
  const that = this
  const dataName = 'testData'
  let data = {}
  if (typeof key === 'undefined' && typeof value === 'undefined') {
    return that[dataName]
  }
  if (typeof (value) !== 'undefined') {
    const _type = typeof (value)
    if (_type === 'string' || _type === 'number') {
      that.setAttribute(key, value)
    }
    data = that[dataName] || {}
    data[key] = value
    that[dataName] = data
    return this
  } else {
    data = that[dataName] || {}
    return data[key] || that.getAttribute(key)
  }
}

export default {
  /**
   * 常用正则表达式
   */
  expression: {
    Required: /[\S]/,
    Email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    Int: /(-)?(\d+)$/,
    IntPositive: /^[0-9]*[1-9][0-9]$/,
    IntZeroPositive: /^[1-9]\d*$/,
    Float: /(-)?(\d+)(((\.)(\d)+))?/,
    FloatPositive: /^[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$/,
    FloatZeroPositive: /^\d+(\.\d+)?$/,
    Chinese: /[\u4e00-\u9fa5]/,
    English: /^[a-zA-Z]+$/,
    Mobile: /^1(?:3[0-9]|5[0-9]|8[0-9]|7[0-9]|4[0-9])\d{8}$/,
    Password: /^[A-Za-z][A-Za-z0-9~!@#\\$%^&\\*]{5,19}$/,
    IdentityCard: /[\d]{6}(19|20)*[\d]{2}((0[1-9])|(11|12))([012][\d]|(30|31))[\d]{3}[xX\d]*/,
    EngAndNum: /^[a-zA-Z][a-zA-Z0-9]+$/,
    EngNumUnderline: /^[a-zA-Z0-9_]+$/,
    PhoneNumber: /(86)?(-)?(0\d{2,3})?(-)?(\d{7,8})(-)?(\d{1,5})?/,
    PostalCode: /\d{6}/,
    Account: /^[A-Za-z0-9@\\.]{4,19}$/,
    URL: /^[0-9a-zA-Z_]{1,}$/,
    Domain: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
  },
  /**
   * 时间格式化
   * @param dt
   * @param format
   * @returns {void | string | *}
   */
  dateFormat (dt, format) {
    const o = {
      'M+': dt.getMonth() + 1,
      'd+': dt.getDate(),
      'h+': dt.getHours(),
      'm+': dt.getMinutes(),
      's+': dt.getSeconds(),
      'q+': Math.floor((dt.getMonth() + 3) / 3),
      S: dt.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (dt.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  timestampToDate (span, format) {
    const date = new Date(span)
    return this.dateFormat(date, format || 'yyyy-MM-dd')
  },
  timestampToDatetime (span, format) {
    const date = new Date(span)
    return this.dateFormat(date, format || 'yyyy-MM-dd hh:mm:ss')
  },
  getPos (e) {
    const dd = document.documentElement
    const db = document.body
    const bc = e.getBoundingClientRect()
    return {
      left: bc.left + Math.max(dd.scrollLeft, db.scrollLeft),
      top: bc.top + Math.max(dd.scrollTop, db.scrollTop),
      height: e.offsetHeight,
      width: e.offsetWidth
    }
  },
  siteStatusColor (status) {
    return status === 0 ? 'el-button--danger' : status === 1 ? 'el-button--success' : 'el-button--info'
  },
  /**
   * 提取HTML 纯文本
   * @param html
   * @param length
   * @returns {string}
   */
  extractText (html, length) {
    html = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/↵/g, '').replace(/[\r\n]/g, '').replace(/&nbsp;/ig, '')
    if (length && length > 0) {
      html = html.substring(0, length)
    }
    return html.trim()
  },
  /**
   * 清理HTML内容
   * @param html
   * 图片的 width,height 节点属性
   */
  filterHTML (html) {
    return html.replace(/width="[^"]*"/g, '')
      .replace(/height="[^"]*"/g, '')
  },
  /**
   * 删除空格
   * @param value
   * @returns {*}
   */
  removeAllSpace (value) {
    return this.isEmpty(value) ? '' : value.replace(/\s+/g, '')
  },
  /**
   * URL过滤，只保留英文、数字、中划线
   * @param url
   * @returns {string}
   */
  urlFilter (url) {
    return url.replace(/[^a-zA-Z\d]/g, ' ').trim().replace(/\s+/g, '-').toLowerCase()
  },
  /**
   * location origin
   * @returns {string}
   */
  locationOrigin () {
    if (!window.location.origin) {
      return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    }
    return location.origin
  },
  /**
   * 首字大写
   * @param value
   * @returns {string}
   */
  capitalize (value) {
    return value.toLowerCase().replace(/( |^)[a-z]/g, (l) => l.toUpperCase())
  },
  /**
   * 是否为空
   * @param value
   * @returns {boolean}
   */
  isEmpty (value) {
    return !((value === undefined || value === null) ? false : /[\S]/.test(value))
  },
  /**
   * 批量操作（表头悬浮菜单）
   */
  bulkActions (el) {
    const pos = this.getPos(el)
    const scrollTop = document.documentElement.scrollTop
    const o = document.querySelector('.bulk-actions')
    const col = el.querySelector('colgroup').querySelectorAll('col')
    const left = parseInt(col[0].getAttribute('width'))
    o.style.width = (pos.width - left - 10) + 'px'
    o.style.left = (pos.left + left) + 'px'
    o.style.top = (pos.top - scrollTop) + 'px'
    o.style.height = (pos.height - 1) + 'px'
  },
  /**
   * 获取使用的语言
   * @returns {string}
   */
  getLanguage () {
    let lang = localStorage.getItem('language')

    if (!lang) {
      lang = (navigator.language || navigator.userLanguage)
    }
    lang = 'en|zh-CN'.indexOf(lang) > -1 ? lang : 'en'
    //
    // const lang = 'en'
    localStorage.setItem('language', lang)
    return lang
  },
  /**
   * 获取使用的语言
   * @returns {string}
   */
  setLanguage (lang) {
    localStorage.setItem('language', lang || 'en')
  },
  /**
   * 打开新标签页
   * @param url
   */
  openSite (url) {
    const o = window.open('', '_blank', '')
    o.location.href = url
  },
  /**
   * 获取HTML属性值
   * @param html
   * @param key
   */
  getHtmlAttribute (html, key) {
    const pattern = new RegExp('.+? ' + key + '="([^"]+)".+', 'gi')
    return html.replace(pattern, '$1')
  },
  /**
   * 换行符
   * @param html
   */
  linefeed (html) {
    return this.isEmpty(html) ? '' : html.replace(/\n/gi, '<br>')
  },
  /**
   * 月初、月末
   * @param year
   * @param month
   * @returns {{firstDay: number, lastDay: number}}
   */
  getHeadAndTailDay (year, month) {
    const date = new Date()
    year = year || date.getFullYear()
    month = month ? month - 1 : date.getMonth()
    return {
      firstDay: new Date(year, month, 1, 0, 0, 0, 0).getTime(),
      lastDay: new Date(year, month + 1, 0, 23, 59, 59, 59).getTime()
    }
  },
  getDicType (dic, status, key = 'label') {
    const res = dic.find(i => i.value === parseInt(status))
    return res ? res[key] : ''
  }
}
