<template>
<div class="ma-3">

    <v-card class="my-2 pa-3">
      <div class="text-center mb-2" v-if="title"><strong>{{ title }}</strong></div>

      <div v-if="loading" class="text-center">Loading</div>

      <div v-if="!loading">
        <div v-if="orders.length == 0" class="text-center my-4">
          No orders
        </div>
        <div v-else>
          <div class="mt-2 mb-5" v-for="(order, i) in orders" :key="i" >
            <Order :order="order" networkid="networkid" summaryonly="true" />
          </div>
        </div>
      </div>
    </v-card>

</div>
</template>
<script>

import { config } from '@/config'
import Order from "@/components/Order"
export default {
  props: ['networkid', 'title', 'type', 'maker', 'token', 'tokenId' ],
  data () {
    return {
      loading: false,
      orders: []
    }
  },
  components: {
    Order
  },
  computed: {
  },
  methods: {

    async init() {

      this.loading = true
      await this.searchOrder()
      this.loading = false
    },

    async searchOrder () {
      this.loading = true
      this.orders = []

      const networkId = this.networkid

      // Only Rinkeby for Now
      if (networkId != 4) {
        this.loading = false
        return
      }

      // console.log('networkId', networkId)
      const url = config.raribleAPI[networkId].URLRoot + '/protocol/ethereum/order/indexer/v0.1/orders/search'
      console.log(url)

      const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }

      // [bid_by_item, bid_by_maker, sell, sell_by_collection, sell_by_item, sell_by_maker]
      let data = null
      if (this.type == 'sell') {
        data = {
          '@type': this.type,
        }
      }
      else if (this.type == 'sell_by_maker' || this.type == 'bid_by_maker') {
        data = {
          '@type': this.type,
          'maker': this.maker
        }
      }
      else if (this.type == 'sell_by_item' || this.type == 'bid_by_item') {
        data = {
          '@type': this.type,
          'token': this.token,
          'tokenId': this.tokenId
        }
      }

      console.log(data)

      try {

        const res = await this.$http.post(url, data, headers)
        console.log(res)
          if (res.body.orders.length > 0) {
            this.orders = res.body.orders
          }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

  },
  created () {
    this.init()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
