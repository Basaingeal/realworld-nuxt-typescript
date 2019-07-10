<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link to="/" class="nav-link">
            Home
          </nuxt-link>
        </li>
        <li v-if="authenticated" class="nav-item">
          <nuxt-link to="/editor" class="nav-link">
            <i class="ion-compose" />&nbsp;New Post
          </nuxt-link>
        </li>
        <li v-if="authenticated" class="nav-item">
          <nuxt-link to="/settings" class="nav-link">
            <i class="ion-gear-a" />&nbsp;Settings
          </nuxt-link>
        </li>
        <li v-if="!authenticated" class="nav-item">
          <nuxt-link to="/login" class="nav-link">
            Sign in
          </nuxt-link>
        </li>
        <li v-if="!authenticated" class="nav-item">
          <nuxt-link to="/register" class="nav-link">
            Sign up
          </nuxt-link>
        </li>
        <li v-if="authenticated && user" class="nav-item">
          <nuxt-link :to="`/profile/${user.user.username}`" class="nav-link">
            {{ user.user.username }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import User from '../models/user.interface'

@Component
export default class TheHeader extends Vue {
  get authenticated() {
    return this.$store.state.auth.authenticated
  }
  get user(): User | null {
    return this.$store.state.auth.user
  }
}
</script>
