import axios, { AxiosRequestConfig } from 'axios'
import Articles from './../models/articles.interface'
import Article from '~/models/article.interface'

class ArticleService {
  private baseUrl?: string = process.env.baseUrl

  public async listArticles(
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  ): Promise<Articles> {
    const params: any = {}
    if (tag) {
      params.tag = tag
    }
    if (author) {
      params.author = author
    }
    if (favorited) {
      params.favorited = favorited
    }
    if (limit) {
      params.limit = limit
    }
    if (offset) {
      params.offset = offset
    }

    const axiosConfig: AxiosRequestConfig = {
      method: 'GET',
      baseURL: this.baseUrl,
      params
    }
    const response = await axios.get<Articles>('/articles', axiosConfig)
    return response.data
  }

  public async getArticle(slug: string): Promise<Article> {
    const response = await axios.get<Article>(
      `${this.baseUrl}/articles/${slug}`
    )
    return response.data
  }
}

export default new ArticleService()
