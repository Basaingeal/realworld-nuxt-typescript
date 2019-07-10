import axios, { AxiosRequestConfig, AxiosStatic, AxiosInstance } from 'axios'
import Articles from './../models/articles.interface'
import JwtService from '~/services/JwtService'
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

    let axiosInstance: AxiosStatic | AxiosInstance = axios
    if (JwtService.getJwt()) {
      axiosInstance = JwtService.getAuthedAxios() as AxiosInstance
    }

    const { data } = await axiosInstance.get<Articles>('/articles', axiosConfig)
    return data
  }

  public async getArticle(slug: string): Promise<Article> {
    const { data } = await axios.get<Article>(
      `${this.baseUrl}/articles/${slug}`
    )
    return data
  }
}

export default new ArticleService()
