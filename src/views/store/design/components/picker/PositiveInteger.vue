<template>
  <div>
    <el-input
      size="small"
      v-model="valueField"
      :placeholder="$t('component.numberOnly.placeholder')"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'positiveInteger',
  data () {
    return {
      visible: false,
      dataset: [],
      valueField: ''
    }
  },
  props: {
    value: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  watch: {
    valueField (val) {
      this.valueChange()
    }
  },
  created () {
    this.valueField = this.value
  },
  methods: {
    /**
     * 值改变
     */
    valueChange () {
      if (!/^[1-9]\d*$/.test(this.valueField)) {
        this.valueField = this.valueField.replace(/[^\d]/g, '').trim()
      }
      this.$emit('input', parseInt(this.valueField))
    }
  }
}
</script>
