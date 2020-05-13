<template>
  <page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
    v-title="$t('settings.language.pageTitle')">
    <h3>
      {{ $t("settings.language.pageTitle") }}
    </h3>
    <page-block
      :subheading="$t('settings.language.desc')"
    >
      <el-select
        v-model="langCode"
        placeholder="请选择"
        @change="langChange"
      >
        <el-option
          v-for="item in languages"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </page-block>
  </page-loading>
</template>

<script>
import data from '../../plugins/data'
import extend from '../../plugins/page/base'
export default {
  extends: extend,
  name: 'language',
  data () {
    return {
      languages: data.language
    }
  },
  created () {
    this.pageValid()
  },
  methods: {
    langChange (value) {
      this.utility.setLanguage(value)
    }
  }
}
</script>

<style scoped>

</style>
