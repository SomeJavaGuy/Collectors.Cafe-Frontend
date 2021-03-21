<template>
  <div>

    <v-navigation-drawer
      class="white"
      v-model="drawer"
      app
    >

      <v-list-item-content>
        <v-list-item-title class="title text-center pa-1">
         Application
        </v-list-item-title>
        <v-list-item-subtitle class="text-center pa-1">
          subtext
        </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense flat>

        <v-list-item :to="{name: 'public-home'}" link class="nav-draw-link">
          <v-list-item-icon>
            <v-icon>play_arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'login'}" link class="nav-draw-link">
          <v-list-item-icon>
            <v-icon>play_arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
      light
      flat
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar-side-icon>
      <img src="/images/logo.png" style="height: 40px; width: auto; margin: 8px"></img>

      <v-spacer></v-spacer>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  })
}
</script>

<style scoped>
.navbar-link {
  color: rgba(0, 0, 0, 0.87) !important;
  text-decoration: none !important;
}
.nav-draw-link {
  color: #444 !important;
}
</style>
