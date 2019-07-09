import Profile from './profile.interface'
import TagsList from './tagslist.interface'

export default interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: TagsList
  createdAt: Date | string
  updatedAt: Date | string
  favorited: boolean
  favoritesCount: number
  author: Profile
}
