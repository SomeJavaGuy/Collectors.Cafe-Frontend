<template>
<div>

    <v-card class="my-2 pa-3 grey lighten-4">
      <strong>Maker:</strong>
        <UserSummary :address="order.maker" :fulladdress="!summaryonly" class="ml-3"></UserSummary><br />
      <strong>NFT:</strong> Token: {{ order.make.type.token }}, tokenID: {{ order.make.type.tokenId }} <br />
      <strong>Take:</strong> {{ order.take.type['@type'] }} {{ order.take.value }} <br />
      <strong>Fill:</strong> {{ order.fill }} <br />
      <strong>Stock:</strong> {{ order.makeStock }} <br />
      <strong>Created At:</strong> {{ order.createdAt }} <br />
      <strong>Hash:</strong> {{ order.hash }}

      <div v-if="summaryonly">
        <v-btn icon :to="{ name: 'order', params: { orderHash: order.hash } }">
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>

    </v-card>

</div>
</template>
<script>

import { config } from '@/config'
import UserSummary from "@/components/UserSummary"
export default {
  props: ['order', 'networkid', 'summaryonly'],
  data () {
    return {
    }
  },
  components: {
    UserSummary
  },
  computed: {
  },
  methods: {

    async init() {
      console.log(this.order)
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
