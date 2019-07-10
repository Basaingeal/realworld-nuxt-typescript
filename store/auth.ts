import { ActionContext } from 'vuex'
import User from '~/models/user.interface'
import JwtService from '~/services/JwtService'
import AuthService from '~/services/AuthService'

interface AuthState {
  authenticated: boolean
  user?: User
}

type AuthContext = ActionContext<AuthState, AuthState>

export const getters = {
  authenticated(state: AuthState): boolean {
    return state.authenticated
  }
}

export const state = (): AuthState => ({
  authenticated: !!JwtService.getJwt(),
  user: undefined
})

export const mutations = {
  setAuthenticated(state: AuthState, authenticated: boolean) {
    state.authenticated = authenticated
  },
  setUser(state: AuthState, user?: User) {
    state.user = user
  }
}

export const actions = {
  async signIn(context: AuthContext, user: User) {
    JwtService.storeJwt(user.user.token)
    context.commit('setAuthenticated', true)
    await context.dispatch('refreshUser')
  },
  signOut(context: AuthContext): void {
    JwtService.clearJwt()
    context.commit('setAuthenticated', false)
    context.commit('setUser')
  },
  async refreshUser(context: AuthContext) {
    if (context.state.authenticated) {
      const user = await AuthService.getCurrentUser()
      context.commit('setUser', user)
    }
  }
}
