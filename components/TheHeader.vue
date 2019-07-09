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
        <li class="nav-item">
          <nuxt-link to="/editor" class="nav-link">
            <i class="ion-compose" />&nbsp;New Post
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/settings" class="nav-link">
            <i class="ion-gear-a" />&nbsp;Settings
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/register" class="nav-link">
            Sign up
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>
