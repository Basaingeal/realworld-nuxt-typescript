<template>
  <div>
    <the-header />
    <nuxt />
    <the-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

@Component({
  components: {
    TheHeader,
    TheFooter
  }
})
export default class TheLayout extends Vue {
  async created() {
    if (this.$store.state.auth.authenticated) {
      await this.$store.dispatch('auth/refreshUser')
    }
  }
}
</script>
