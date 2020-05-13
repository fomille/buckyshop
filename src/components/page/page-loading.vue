<template>
    <div v-if="fullScreen">
      <slot v-if="!loading && !invalid"></slot>
      <div class="layout-main" v-else>
        <div class="el-loading-mask page-loading-full-screen" v-if="loading">
          <div class="el-loading-spinner"><i class="el-icon-loading"></i>
            <p class="el-loading-text">
              {{ $t('base.loading') }}
            </p>
          </div>
        </div>
        <div class="page-is-valid" v-if="invalid">
          <div class="page-is-valid-content">
            <h2>
              {{$t('pageAborted.heading')}}
            </h2>
            <dl>
              <dt>
                {{$t('pageAborted.subheading')}}
              </dt>
              <dd>
                {{$t('pageAborted.c1')}}
              </dd>
              <dd>
                {{$t('pageAborted.c2')}}
              </dd>
            </dl>
            <dl class="mt-5">
              <dt>
                {{$t('pageAborted.attempt')}}
              </dt>
              <dd>
                {{$t('pageAborted.a1')}}
              </dd>
              <dd>
                {{$t('pageAborted.a2')}}
              </dd>
              <dd>
                {{$t('pageAborted.a3')}}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-main" v-else>
      <slot v-if="!loading && !invalid"></slot>
      <div class="el-loading-mask page-loading" v-if="loading">
        <div class="el-loading-spinner"><i class="el-icon-loading"></i>
          <p class="el-loading-text">
            {{ $t('base.loading') }}
          </p>
        </div>
      </div>
      <div class="page-is-valid" v-if="invalid">
        <div class="page-is-valid-content">
          <h2>
            {{$t('pageAborted.heading')}}
          </h2>
          <dl>
            <dt>
              {{$t('pageAborted.subheading')}}
            </dt>
            <dd>
              {{$t('pageAborted.c1')}}
            </dd>
            <dd>
              {{$t('pageAborted.c2')}}
            </dd>
          </dl>
          <dl class="mt-5">
            <dt>
              {{$t('pageAborted.attempt')}}
            </dt>
            <dd>
              {{$t('pageAborted.a1')}}
            </dd>
            <dd>
              {{$t('pageAborted.a2')}}
            </dd>
            <dd>
              {{$t('pageAborted.a3')}}
            </dd>
          </dl>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'pageLoading',
  data () {
    return {
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    invalid: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    fullScreen: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  }
}
</script>
