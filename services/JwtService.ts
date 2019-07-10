import { AxiosInstance } from 'axios'
import AuthAxiosFactory from './AuthAxiosFactory'
class JwtService {
  private storageKey: string = 'jwt'

  public storeJwt(jwt: string): void {
    window.localStorage.setItem(this.storageKey, jwt)
  }

  public clearJwt(): void {
    window.localStorage.removeItem(this.storageKey)
  }

  public getJwt(): string | null {
    return window.localStorage.getItem(this.storageKey)
  }

  public getAuthedAxios(): AxiosInstance | null {
    const jwt = this.getJwt()
    if (jwt == null) {
      return null
    }

    return AuthAxiosFactory(jwt)
  }
}

export default new JwtService()
