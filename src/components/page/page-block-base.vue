<template>
    <div class="page-block">
      <div v-if="$slots.header">
        <el-row class="site-theme">
          <el-col :span="20">
            <h4 class="page-block-title" v-if="heading">
              {{ heading }}
            </h4>
            <p v-if="subheading" class="page-block-subheading">
              {{ subheading }}
            </p>
          </el-col>
          <el-col :span="4" class="page-block-action">
            <slot name="header"></slot>
          </el-col>
        </el-row>
      </div>
      <template v-else>
        <h4 class="page-block-title" v-if="heading">
          {{ heading }}
        </h4>
        <p v-if="subheading" class="page-block-subheading">
          {{ subheading }}
        </p>
      </template>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'pageBlockBase',
  data () {
    return {
    }
  },
  props: {
    heading: {
      type: String,
      default: ''
    },
    subheading: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
