<template>
  <div>
    <el-input
      size="small"
      v-model="videoURL"
      type="textarea"
      :rows="6"
      :placeholder="$t('component.videoPicker.placeholder')"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'video-picker',
  data () {
    return {
      visible: false,
      menuVisible: true,
      dataset: [],
      videoURL: ''
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    videoURL (val) {
      this.valueChange()
    }
  },
  created () {
    this.videoURL = this.value
  },
  methods: {
    /**
     * 值改变
     */
    valueChange () {
      // https://youtu.be/Sgopm0lGSgU
      //  https://www.youtube.com/embed/Sgopm0lGSgU
      // https://v.qq.com/x/cover/5y95zy4idzqf6hc/b0026xs9my6.html
      // https://v.qq.com/x/page/v08564kamo6.html
      // https://v.qq.com/x/cover/mzc002009n1tzjr/j0032xtrylm.html
      // <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=b0026xs9my6" allowFullScreen="true"></iframe>
      // <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=v08564kamo6" allowFullScreen="true"></iframe>
      // <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=j0032xtrylm" allowFullScreen="true"></iframe>
      if (this.videoURL.indexOf('https://youtu.be/') === -1 &&
        this.videoURL.indexOf('https://www.youtube.com/') === -1 &&
        this.videoURL.indexOf('https://v.qq.com/') === -1) {
        this.videoURL = ''
      } else if (this.videoURL.indexOf('https://youtu.be/') > -1) {
        this.videoURL = this.videoURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
      } else if (this.videoURL.indexOf('https://v.qq.com/x/') > -1) {
        const m = this.videoURL.split('/')
        this.videoURL = `https://v.qq.com/iframe/player.html?vid=${m[m.length - 1].replace('.html', '')}&amp;tiny=0&amp;auto=0`
      } else if (this.videoURL.indexOf('https://v.qq.com/txp/') > -1 && this.videoURL.indexOf('iframe') > -1) {
        this.videoURL = this.utility.getHtmlAttribute(this.videoURL, 'src').replace('/txp/', '/') + '&amp;tiny=0&amp;auto=0'
      }
      this.$emit('input', this.videoURL)
    }
  }
}
</script>
