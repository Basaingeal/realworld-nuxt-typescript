<template>
  <div>
    <article-preview
      v-for="article in articles"
      :key="article.slug"
      :article="article"
    />
    <div v-if="articles.length === 0" class="article-preview">
      No articles are here... yet.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ArticleBase from '../models/articles.interface'
import ArticlePreview from '@/components/ArticlePreview.vue'

@Component({
  components: {
    ArticlePreview
  }
})
export default class ArticlePreviewList extends Vue {
  @Prop({ default: [] }) readonly articles!: ArticleBase[]
}
</script>
