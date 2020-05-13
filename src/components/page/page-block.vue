<template>
    <div class="page-block">
      <template v-if="$slots.header">
        <el-row class="page-block-header">
          <el-col :span="10">
            <h4 class="page-block-title" v-if="heading">
              {{ heading }}
            </h4>
            <p v-if="subheading" class="page-block-subheading">
              {{ subheading }}
            </p>
          </el-col>
          <el-col :span="14" class="page-block-action text-right">
            <slot name="header"></slot>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <h4 class="page-block-title" v-if="heading">
          {{ heading }}
        </h4>
        <p v-if="subheading" v-html="subheading" class="page-block-subheading"></p>
      </template>
      <el-card :shadow="shadow">
        <slot></slot>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'pageBlock',
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
    },
    shadow: {
      type: String,
      default: 'hover'
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
