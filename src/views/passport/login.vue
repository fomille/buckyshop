<template>
  <div class="passport">
    <canvas class="passport-canvas" ></canvas>
    <div class="passport-content">
      <div class="passport-form">
        <div class="passport-form-width">
          <p class="text-center">
            <a href="https://www.buckydrop.com/" target="_blank">
              <img src="https://www.buckydrop.com/img/en/login/logo.png" alt="buckyshop">
            </a>
          </p>
          <el-form :model="entity" :rules="formRules" ref="ruleForm">
            <el-form-item prop="accountName">
              <el-input
                maxlength="64"
                v-model="entity.accountName"
                @blur="accountBlur"
                :placeholder="$t('passport.login.entity.account.placeholder')"
                auto-complete="off">
              </el-input>
            </el-form-item>
            <el-form-item prop="accountPwd">
              <el-input
                maxlength="30"
                type="password"
                v-model="entity.accountPwd"
                :placeholder="$t('passport.login.entity.password.placeholder')"
                auto-complete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="mt-7">
              <el-button type="danger" :loading="loading" @click="formValidation('ruleForm')">
                {{$t('passport.login.button')}}
              </el-button>
            </el-form-item>
          </el-form>
          <div class="text-center">
            <a href="https://www.buckydrop.com/en/forgot/" target="_blank">
              {{$t('passport.login.registerTip')}}
            </a>
            <hr>
            <a href="https://www.buckydrop.com/en/register/" target="_blank">
              {{$t('passport.login.forgetTip')}}
            </a>
          </div>
        </div>
      </div>
      <div class="passport-content-img">
        <a href="https://www.buckydrop.com/en/info_graphic/#/business_mode" target="_blank">
          <img src="https://cdn.buckydrop.com/starit-buckydrop/2020/dist/login_banner.928b2b94.png" alt="start your free trial today">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Circle from '../../plugins/circle'
import extend from '../../plugins/page/base'
import * as users from '../../plugins/api/passport'
// import Cookie from 'js-cookie'
import * as theme from '../../plugins/api/theme'

export default {
  name: 'login',
  extends: extend,
  data () {
    return {
      entity: {
        accountName: '1256083602@qq.com',
        accountPwd: '123456',
        lang: 'en'
      },
      formRules: {
        accountName: [
          { required: true, message: this.$t('passport.login.entity.account.required'), trigger: 'blur' },
          { type: 'email', message: this.$t('passport.login.entity.account.custom'), trigger: 'blur' }
        ],
        accountPwd: [
          { required: true, message: this.$t('passport.login.entity.password.required'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.backgroundAnimation()
  },
  created () {
    console.log(process.env)
  },
  methods: {
    getShop () {
      theme.shops({
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 登录
     * @param formName
     */
    formValidation (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          users.login(this.entity)
            .then(result => {
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$store.commit('setUserModel', result.data)
                  this.$router.push(this.$route.query.redirect || `/${this.shopCode}/themes`)
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 删除帐号中的空格
     */
    accountBlur () {
      this.entity.account = this.utility.removeAllSpace(this.entity.account)
    },
    /**
     * canvas 动画
     */
    backgroundAnimation () {
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      const canvas = document.querySelector('.passport-canvas')
      const ctx = canvas.getContext('2d')
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      const circles = []
      const draw = () => {
        ctx.clearRect(0, 0, w, h)
        for (let i = 0; i < circles.length; i++) {
          circles[i].move(w, h)
          circles[i].drawCircle(ctx)
          for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
          }
        }
        requestAnimationFrame(draw)
      }
      for (let i = 0; i < 60; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h))
      }
      draw()
    }
  }
}
</script>

<style scoped>

</style>
