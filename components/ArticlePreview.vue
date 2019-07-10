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
      <button
        ref="btnFavorite"
        :class="{
          btn: true,
          'btn-outline-primary': !favorited,
          'btn-primary': favorited,
          'pull-xs-right': true,
          disabled: favoriteDisabled
        }"
        @click="handleFavoriteClick"
      >
        <i class="ion-heart" /> {{ favoritesCount }}
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
import ArticleBase from '../models/articleBase.interface'
import { previewDate } from '@/filters/DateFilters'
import FavoriteService from '@/services/FavoriteService'

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
  readonly article!: ArticleBase

  favorited: boolean = this.article.favorited
  favoritesCount: number = this.article.favoritesCount
  favoriteDisabled: boolean = false

  get createdDate() {
    return new Date(this.article.createdAt)
  }
  get updatedDate() {
    return new Date(this.article.updatedAt)
  }
  get authorProfile() {
    return this.article.author
  }

  async handleFavoriteClick() {
    if (this.$store.state.auth.authenticated) {
      this.favoriteDisabled = true
      if (this.favorited) {
        const article = await FavoriteService.unfavoriteArticle(
          this.article.slug
        )
        if (article) {
          this.favorited = article.article.favorited
          this.favoritesCount = article.article.favoritesCount
        }
      } else {
        const article = await FavoriteService.favoriteArticle(this.article.slug)
        if (article) {
          this.favorited = article.article.favorited
          this.favoritesCount = article.article.favoritesCount
        }
      }
      this.favoriteDisabled = false
      ;(this.$refs.btnFavorite as HTMLElement).blur()
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
