<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="`profile/${authorProfile.username}`">
        <img :src="authorProfile.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link :to="`profile/${authorProfile.username}`" class="author">
          {{ authorProfile.username }}
        </nuxt-link>
        <span class="date">{{ createdDate | previewDate }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="`article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Article from '../models/article.interface'
import { previewDate } from '@/filters/DateFilters'

@Component({
  filters: {
    previewDate
  }
})
export default class ArticlePreview extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly article!: Article

  get createdDate() {
    return new Date(this.article.createdAt)
  }
  get updatedDate() {
    return new Date(this.article.updatedAt)
  }
  get authorProfile() {
    return this.article.author
  }
}
</script>
