<template>
  <a class="tag-pill tag-default" href="" @click.prevent="tagClick">
    {{ label }}
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TagLink extends Vue {
  @Prop({ required: true }) readonly label!: string

  tagClick() {
    this.$emit('click', this.label)
  }
}
</script>
