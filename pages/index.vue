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
              <li class="nav-item">
                <nuxt-link class="nav-link disabled" to="/login">
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <article-preview-list :articles="articlesList" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <tag-link v-for="tag in tags" :key="tag" :label="tag" />
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
    const articles: Articles = await ArticleService.listArticles()
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

  get articlesList() {
    return this.articles.articles
  }
}
</script>
