import Article from '~/models/article.interface'
import JwtService from '~/services/JwtService'

class FavoriteService {
  private baseUrl?: string = process.env.baseUrl

  public async favoriteArticle(slug: string): Promise<Article | null> {
    const authedAxios = JwtService.getAuthedAxios()
    if (authedAxios == null) {
      return null
    }

    const { data } = await authedAxios.post<Article>(
      `${this.baseUrl}/articles/${slug}/favorite`
    )

    return data
  }

  public async unfavoriteArticle(slug: string): Promise<Article | null> {
    const authedAxios = JwtService.getAuthedAxios()
    if (authedAxios == null) {
      return null
    }

    const { data } = await authedAxios.delete<Article>(
      `${this.baseUrl}/articles/${slug}/favorite`
    )

    return data
  }
}

export default new FavoriteService()
