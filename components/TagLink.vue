<template>
  <nuxt-link :to="`/tags/${label}`" class="tag-pill tag-default">
    {{ label }}
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TagLink extends Vue {
  @Prop({ required: true }) readonly label!: string
}
</script>
