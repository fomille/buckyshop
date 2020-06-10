<template>
  <el-dialog
    :title="$t('batchUpload.alt.heading')"
    :visible="true"
    v-if="displayAlt"
    width="660px"
  >
    <el-row :gutter="20">
      <el-col :span="5">
        <img :src="entity.src" class="absolutely">
      </el-col>
      <el-col :span="17">
        <p>
          {{ $t('batchUpload.entity.alt.label') }}
        </p>
        <el-input
          v-model="entity.alt"
          :placeholder="$t('batchUpload.entity.alt.placeholder')"
        >
        </el-input>
        <p class="text-secondary">
          {{$t('batchUpload.alt.subheading')}}
        </p>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dataSync(false)">{{$t('base.cancel')}}</el-button>
      <el-button type="primary" @click="dataSync(true)">{{$t('base.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'section-image-alt',
  data () {
    return {
      entity: {
        alt: '',
        url: ''
      }
    }
  },
  props: {
    alt: {
      type: String,
      default: () => ''
    },
    url: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    imageURL (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.entity.alt = this.alt
    this.entity.url = this.url
  },
  methods: {
    /**
     * 数据同步
     */
    dataSync (update) {

    }
  }
}
</script>
