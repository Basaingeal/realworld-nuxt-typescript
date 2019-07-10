import axios from 'axios'
import JwtService from '~/services/JwtService'
import LoginBody from '~/models/loginBody.interface'
import User from '~/models/user.interface'
import RegisterBody from '~/models/registerBody.interface'
import UpdateUserBody from '~/models/updateUserBody.interface'
import ApiError from '~/models/apiError.interface'

class AuthService {
  private baseUrl?: string = process.env.baseUrl

  public async login(email: string, password: string): Promise<User | string> {
    const loginBody: LoginBody = {
      user: {
        email,
        password
      }
    }

    try {
      const { data } = await axios.post<User | ApiError>(
        `${this.baseUrl}/users/login`,
        loginBody
      )
      return data as User
    } catch (error) {
      return 'email or password is invalid'
    }
  }

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const registerBody: RegisterBody = {
      user: {
        username,
        email,
        password
      }
    }

    const { data } = await axios.post<User>(
      `${this.baseUrl}/users`,
      registerBody
    )
    return data
  }

  public async getCurrentUser(): Promise<User | null> {
    const authedAxios = JwtService.getAuthedAxios()
    if (authedAxios == null) {
      return null
    }

    const { data } = await authedAxios.get<User>(`${this.baseUrl}/user`)

    return data
  }

  public async updateUser(
    email?: string,
    username?: string,
    password?: string,
    image?: string,
    bio?: string
  ): Promise<User | string> {
    const authedAxios = JwtService.getAuthedAxios()
    if (authedAxios == null) {
      return 'Not Authenticated'
    }
    const updateBody: UpdateUserBody = {
      user: {}
    }

    if (email) {
      updateBody.user.email = email
    }
    if (username) {
      updateBody.user.username = username
    }
    if (password) {
      updateBody.user.password = password
    }
    if (image) {
      updateBody.user.image = image
    }
    if (bio) {
      updateBody.user.bio = bio
    }

    const { data } = await authedAxios.put<User>(
      `${this.baseUrl}/user`,
      updateBody
    )
    return data
  }
}

export default new AuthService()
