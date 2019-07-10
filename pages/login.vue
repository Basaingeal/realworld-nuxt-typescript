<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul v-if="errorMessage" class="error-messages">
            <li>{{ errorMessage }}</li>
          </ul>

          <form @submit.prevent="signIn">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthService from '~/services/AuthService'

@Component
export default class LoginPage extends Vue {
  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async signIn() {
    const user = await AuthService.login(this.email, this.password)
    if (typeof user === 'string') {
      this.errorMessage = user as string
    } else {
      this.$store.dispatch('auth/signIn', user)
      this.$router.push('/')
    }
  }
}
</script>
