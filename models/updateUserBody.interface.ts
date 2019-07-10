export default interface UpdateUserBody {
  user: {
    email?: string
    username?: string
    password?: string
    image?: string
    bio?: string
  }
}
