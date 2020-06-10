<template>
  <div
    v-if="visible"
    class="design-addition">
    <h3 class="design-addition-title" @click="closePicker">
      {{ $t('design.addSection') }}
    </h3>
    <div class="design-addition-content">
      <template
        v-for="(o, index) in schema"
      >
        <div
          class="section-element"
          v-if="o.resourceGroup === '4000'"
          :key="`section-${index}`">
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <template
                v-if="schema.icon && schema.icon.indexOf('/') > 0"
              >
                <img :src="o.schema.icon">
              </template>
              <template v-else>
                <i :class="o.schema.icon"></i>
              </template>
            </el-col>
<!--            <el-col-->
<!--              class="editor-section-picker-addition"-->
<!--              :span="15">-->
<!--              <div-->
<!--                @click="addSection(index, o.schema.type, false)"-->
<!--              >-->
<!--                {{ o.schema.name[language] }}-->
<!--              </div>-->
<!--            </el-col>-->
            <el-col
              :span="19"
              >
              <el-radio
                v-model="selectedSection"
                :label="o.resourceType"
                class="el-radio-full text-truncate"
                @change="selectSection"
              >
                {{ o.schema.name[language] }}
              </el-radio>
            </el-col>
          </el-row>
        </div>
      </template>

      <div
        v-if="actionVisible"
        class="design-addition-button text-right"
      >
        <el-button
          type="text"
          class="text-info"
          @click="closePicker"
        >{{$t('base.cancel')}}</el-button>
        <el-button
          type="text"
          @click="addSection(true)"
        >{{$t('base.confirm')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-picker',
  data () {
    return {
      actionVisible: false,
      selectedSection: ''
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  props: {
    schema: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    sections: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.filterOnlyOnce()
      }
    }
  },
  methods: {
    /**
     * 预览选择
     */
    selectSection () {
      this.actionVisible = true
      this.addSection(false)
    },
    /**
     * 返回上一级
     */
    closePicker () {
      this.selectedSection = ''
      this.$emit('close')
    },
    /**
     * 过滤仅允许加一次的section
     */
    filterOnlyOnce () {
      this.selectedSection = ''
      this.actionVisible = false
      // for (const key in this.schema) {
      //   if (this.schema[key].schema.onlyOnce) {
      //     const m = this.sections.filter((o) => {
      //       return o.moduleType === key
      //     })
      //     this.schema[key].exist = m.length > 0
      //   }
      // }
    },
    /**
     * 添加 section
     */
    addSection (official) {
      if (this.selectedSection) {
        this.$emit('add', this.selectedSection, official)
      }
    }
  }
}
</script>
