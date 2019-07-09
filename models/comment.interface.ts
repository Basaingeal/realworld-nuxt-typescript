import Profile from './profile.interface'

export default interface Comment {
  id: number
  createdAt: Date | string
  updatedAt: Date | string
  body: string
  author: Profile
}
