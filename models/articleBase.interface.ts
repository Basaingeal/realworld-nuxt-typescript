import Profile from './profile.interface'

export default interface ArticleBase {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: Date | string
  updatedAt: Date | string
  favorited: boolean
  favoritesCount: number
  author: Profile
}
