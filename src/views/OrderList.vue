<template>
  <div>

  <Preloader v-show="!initializationDone" text="loading..."></Preloader>

  <v-container v-if="initializationDone">

    <OrderList v-if="queryType == 'sell'" class="mt-4"
      :networkid = "network.id"
      :type = "queryType"
    />

    <OrderList v-if="queryType == 'sell_by_item' || queryType == 'bid_by_item'" class="mt-4"
      :networkid = "network.id"
      :type = "queryType"
      :token = "contractAdress"
      :tokenId = "tokenId"
    />

    <OrderList v-if="queryType == 'sell_by_maker' || queryType == 'bid_by_maker'"  class="mt-4"
      :networkid = "network.id"
      :type = "queryType"
      :maker = "makerAddress"
    />
  </v-container>


  <!-- Begin Notification Bar -->
  <v-snackbar
    top
    :color="notificationBar.type"
    v-model="notificationBar.show"
  >
    {{ notificationBar.message }}
    <v-btn text @click="notificationBar.show = false">
      Close
    </v-btn>
  </v-snackbar>
  <!-- End Notification Bar -->

  </div>
</template>

<script>
import Preloader from "@/components/Preloader"
import UserSummary from "@/components/UserSummary"
import OrderList from "@/components/OrderList"
import {mapActions, mapGetters, mapState} from 'vuex'
// import { getCurrentNetworkID, getCurrentAccount } from '@/utils/utils'
import { config } from '@/config'

export default {
  data: () => ({
    loading: true,
    initializationDone: false,
    networkId: null,
    userAddress: null,
    thisIsMyself: false,
    // type: this.$route.params.type,
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
  }),
  components: {
    Preloader,
    UserSummary,
    OrderList,
  },
  computed: {
    ...mapGetters({
      // config: 'getConfig',
      network: 'getNetwork',
      myAddress: 'getUserAccount',
    }),

    queryType: function () {
      return this.$route.params.type
    },

    contractAdress: function () {
      if ('contractAddress' in this.$route.params) {
        return this.$route.params.contractAddress
      }
      else {
        return null
      }
    },

    tokenId: function () {
      if ('tokenId' in this.$route.params) {
        return this.$route.params.tokenId
      }
      else {
        return null
      }
    },

    makerAddress: function () {
      if ('makerAddress' in this.$route.params) {
        return this.$route.params.makerAddress
      }
      else {
        return null
      }
    }

  },
  methods: {
    ...mapActions(['loadNetwork']),
    async init() {
      this.initializationDone = false
      await this.loadNetwork()
      this.initializationDone = true
    },

    showNotification(type, message) {
      this.notificationBar.message = message
      this.notificationBar.type = type   // 'success' or 'error'
      this.notificationBar.show = true
    }

  },
  created () {
    this.init()
  },

}
</script>
