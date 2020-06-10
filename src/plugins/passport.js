import lib from './utility'

/**
 * 用户登录
 */
export default {
  tokenName: 'userModel',
  getUser () {
    const data = localStorage.getItem(this.tokenName)
    if (!lib.isEmpty(data)) {
      return JSON.parse(data)
    }
    return {
      accountCode: '',
      avatar: '',
      firstName: '',
      lastName: '',
      authorization: ''
    }
  },
  login (data) {
    if (data) {
      localStorage.setItem(this.tokenName, JSON.stringify(data))
    }
  },
  register (data) {
    if (data) {
      let counter = []
      const count = localStorage.getItem('registerCounter')
      if (count) {
        counter = JSON.parse(count)
      }
      counter.push({
        data: new Date()
      })
      localStorage.setItem('registerCounter', JSON.stringify(counter))
    }
  },
  getRegisterRefresh () {
    let counter = []
    const count = localStorage.getItem('register')
    if (count) {
      counter = JSON.parse(count)
    }
    return counter.length
  },
  logout () {
    localStorage.removeItem(this.tokenName)
  },
  status () {
    return !lib.isEmpty(localStorage.getItem(this.tokenName))
  },
  token () {
    const data = this.getUser()
    if (!data) {
      return ''
    } else {
      return data.token || ''
    }
  }
}
