<template>
  <div>

  <h2 class="text-center mx-auto mt-5 mb-3">Order</h2>

  <Preloader v-show="!initializationDone" text="loading..."></Preloader>


  <v-container v-if="initializationDone && order">

    <Order :order="order" :networkid="network.id" />

  </v-container>


  </div>
</template>

<script>
import Preloader from "@/components/Preloader"
import UserSummary from "@/components/UserSummary"
import Order from "@/components/Order"
import {mapActions, mapGetters, mapState} from 'vuex'
// import { getCurrentNetworkID, getCurrentAccount } from '@/utils/utils'
import { config } from '@/config'

export default {
  data: () => ({
    loading: true,
    initializationDone: false,
    networkId: null,
    userAddress: null,
    order: null,
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
  }),
  components: {
    Preloader,
    UserSummary,
    Order,
  },
  computed: {
    ...mapGetters({
      // config: 'getConfig',
      network: 'getNetwork',
      myAddress: 'getUserAccount',
    }),
  },
  methods: {
    ...mapActions(['loadNetwork']),
    async init() {
      this.initializationDone = false
      await this.loadNetwork()
      await this.loadOrder()
      this.initializationDone = true
    },


    async loadOrder() {
      this.order = null

      const networkId = this.network.id
      console.log('networkId', networkId)
      const url = config.raribleAPI[networkId].URLRoot + '/protocol/ethereum/order/indexer/v0.1/orders/'
        + this.$route.params.orderHash
      console.log(url)

      try {
        const res = await this.$http.get(url)
        console.log(res)
        this.order = res.body
      } catch (err) {
        console.error(err)
      } finally {
      }
    },

    visitUserPage(address) {
      this.searchModalOpen = false
      const cleanAddress = address.toLowerCase()
      this.$router.push({ name: 'user', params: {userAddress: cleanAddress} })
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
