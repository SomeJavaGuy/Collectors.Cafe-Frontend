<template>
  <div>

    <v-navigation-drawer
      class="white"
      v-model="drawer"
      app
    >

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

        <v-list-item :to="{name: 'app-home'}" link class="nav-draw-link">
          <v-list-item-icon>
            <v-icon>play_arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>App</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'orders-all', params: { type: 'sell'} }" link class="nav-draw-link">
          <v-list-item-icon>
            <v-icon>play_arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'logout'}" link class="nav-draw-link">
          <v-list-item-icon>
            <v-icon>play_arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
      elevation="1"
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="/images/logo.png" style="height: 40px; width: auto; margin: 8px"></img>

      <v-spacer></v-spacer>

      <v-chip v-if="networkId && networkId == 4"
        class="ma-2"
        color="red"
        text-color="white"
      >Rinkeby Testnet</v-chip>

       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          <router-link class="navbar-link" :to="{name: 'app-home'}">App</router-link>
        </v-btn>
      </v-toolbar-items>

       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn  text>
          <router-link class="navbar-link" :to="{ name: 'orders-all', params: { type: 'sell'} }">Orders</router-link>
        </v-btn>
      </v-toolbar-items>

       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          <router-link class="navbar-link" :to="{name: 'logout'}">Logout</router-link>
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    networkId: null,
    drawer: null,
  }),
  methods: {
    async init() {
      await new Promise(r => setTimeout(r, 1000))
      if (window.web3) {
        console.log(window.ethereum)
        this.networkId = await window.web3.eth.net.getId()
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.navbar-link {
  color: #CCC !important;
  text-decoration: none;
}
.nav-draw-link {
  color: #444 !important;
}
</style>
