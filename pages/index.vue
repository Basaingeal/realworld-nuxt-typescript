<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="authenticated" class="nav-item">
                <button
                  :class="{
                    'nav-link': true,
                    active: selectedFeed === 'personal'
                  }"
                  @click="selectFeed('personal')"
                >
                  Your Feed
                </button>
              </li>
              <li class="nav-item">
                <button
                  :class="{
                    'nav-link': true,
                    active: selectedFeed === 'global'
                  }"
                  @click="selectFeed('global')"
                >
                  Global Feed
                </button>
              </li>
              <li v-if="selectedFeed === 'tag'" class="nav-item">
                <button class="nav-link active">
                  <i class="ion-pound"></i>
                  {{ selectedTag }}
                </button>
              </li>
            </ul>
          </div>

          <div v-if="loadingArticles" class="article-preview">
            Loading articles...
          </div>
          <article-preview-list v-else :articles="articlesList" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <tag-link
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                @click="setTagFeed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Articles from '../models/articles.interface'
import TagService from '@/services/TagService'
import ArticleService from '@/services/ArticleService'
import TagLink from '@/components/TagLink.vue'
import ArticlePreviewList from '@/components/ArticlePreviewList.vue'

@Component({
  components: {
    TagLink,
    ArticlePreviewList
  },
  async asyncData() {
    const tags: string[] = (await TagService.getTags()).tags
    const articles: Articles = await ArticleService.listArticles(
      undefined,
      undefined,
      undefined,
      10
    )
    return {
      tags,
      articles
    }
  }
})
export default class IndexPage extends Vue {
  tags: string[] = []
  articles: Articles = {
    articles: [],
    articlesCount: 0
  }
  selectedFeed: string = 'global'
  selectedTag?: string
  loadingArticles: boolean = false

  get articlesList() {
    return this.articles.articles
  }

  get authenticated() {
    return this.$store.state.auth.authenticated
  }

  async selectFeed(feed: string) {
    if (this.selectedFeed !== feed) {
      if (feed === 'personal') {
        this.loadingArticles = true
        this.articles = await ArticleService.feedArticles(10)
        this.loadingArticles = false
      } else if (feed === 'global') {
        this.loadingArticles = true
        this.articles = await ArticleService.listArticles(
          undefined,
          undefined,
          undefined,
          10
        )
        this.loadingArticles = false
      }
    }
    this.selectedFeed = feed
  }

  async setTagFeed(tag: string) {
    this.selectedTag = tag
    this.selectedFeed = 'tag'
    this.loadingArticles = true
    this.articles = await ArticleService.listArticles(
      tag,
      undefined,
      undefined,
      10
    )
    this.loadingArticles = false
  }
}
</script>
