<template>
  <div class="py-1 px-2">

  <v-card v-if="!loading"
    class="mx-auto my-2"
    max-width="344"
  >

    <v-card-title style="line-height: 1rem;">
      <div class="text-truncate" style="font-size: 1.0rem; font-weight: bold;">
        <span v-if="contractName">{{ contractName }}</span>
        <span v-if="!contractName">&nbsp;</span>
      </div>
    </v-card-title>

    <v-card-text>
      <v-img v-if="image_url"
        :aspect-ratio="1/1"
        style="padding: 10px; width: 100%; height: auto"
        :src="image_url"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey"
              :size="60"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-img v-if="!image_url"
        :aspect-ratio="1/1"
        style="padding: 10px; width: 100%; height: auto; opacity: 0.15;"
        src="/images/default-pic.png"
      >
      </v-img>
    </v-card-text>

    <v-card-text class="py-0">
      <span v-if="name">{{ name }}</span>
      <span v-if="name">&nbsp;</span>
      <div v-show="showDescription">{{ description }}</div>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="isMyLikedToken" icon @click="removeLike" class="mr-2">
        <v-icon color="orange accent-4">mdi-heart</v-icon>
      </v-btn>
      <v-btn v-else icon @click="addLike" class="mr-2">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ itemId }}</span>
      </v-tooltip>

      <v-btn icon :href="token_url" target="_blank">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-menu
        bottom
        left
      >

        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-show="isMyToken && isMyHighlight">
            <v-list-item-title>
              <v-btn text @click="removeHighlight">Remove from My Showroom</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-show="isMyToken && !isMyHighlight">
            <v-list-item-title>
              <v-btn text @click="addHighlight">Add to My Showroom</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item  v-show="isMyToken">
            <v-list-item-title>
              <v-btn text :to="{ name: 'create-order', params: { type: 'sell', contractAddress: contractAddress, tokenId: token_id} }" >Create Sell Order</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item  v-show="!isMyToken">
            <v-list-item-title>
              <v-btn text :to="{ name: 'create-order', params: { type: 'bid', contractAddress: contractAddress, tokenId: token_id} }" >Create Bid Order</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text :to="{ name: 'orders-by-token', params: { type: 'sell_by_item', contractAddress: contractAddress, tokenId: token_id} }" >Sell Orders</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn text :to="{ name: 'orders-by-token', params: { type: 'bid_by_item', contractAddress: contractAddress, tokenId: token_id} }" >Bid Orders</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>



    </v-card-actions>

  </v-card>


  </div>
</template>

<script>
import { config } from '@/config'
export default {
  props: ['info', 'myaddress', 'networkid', 'myhightlightlist', 'myhightlightlist', 'mynftlikelist'],
  data () {
    return {
      loading: false,
      requestModalOpen: false,
      showDescription: false,
    }
  },
  computed: {
    // myAddress: function () {
    //   return this.$store.state.userAddress
    // },
    itemId: function () {
      return this.info.asset_contract.address + ':' + this.info.asset_contract.address
    },
    name: function () {
      return this.info.name
    },
    description: function () {
      return this.info.description
    },
    contractName: function () {
      return this.info.asset_contract.name
    },
    contractAddress: function () {
      return this.info.asset_contract.address
    },
    token_id: function () {
      return this.info.token_id
    },
    ownerAddress: function () {
      return this.info.owner.address
    },
    image_url: function () {
      return this.info.image_url
    },
    token_url: function () {
      return this.info.external_link
    },
    isMyToken: function () {
      // return false
      if (this.info.owner.address) {
        if (this.info.owner.address.toLowerCase() == this.myaddress.toLowerCase()) {
          return true
        }
      }
      else {
        return false
      }
    },
    isMyLikedToken: function () {
      // return false
      let result = false
      for (let i=0; i<this.mynftlikelist.length; i++) {
        let like = this.mynftlikelist[i]
        if (like.contractAddress.toLowerCase() == this.contractAddress.toLowerCase() && like.tokenId == this.token_id) {
          result = true
          break
        }
      }
      return result
    },
    isMyHighlight: function () {
      // return false
      let result = false
      // if (!this.isMyToken) {
      //   return false
      // }
      for (let i=0; i<this.myhightlightlist.length; i++) {
        let hightlist = this.myhightlightlist[i]
        if (hightlist.contractAddress.toLowerCase() == this.contractAddress.toLowerCase() && hightlist.tokenId == this.token_id) {
          result = true
          break
        }
      }
      return result
    }
  },
  methods: {

    async init() {

      console.log(this.info)

    },

    async addLike () {
      this.likeLoading = true

      const url = config.backendURL + '/api/' + this.networkid + '/nft-likes/add/'
          + this.myaddress.toLowerCase() + '/' + this.contractAddress.toLowerCase() + '/'
          + this.token_id
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("token-like-change")
      } catch (err) {
        console.error(err)
      } finally {
        this.likeLoading = false
      }
    },

    async removeLike () {
      this.likeLoading = true

      const url = config.backendURL + '/api/' + this.networkid + '/nft-likes/delete/'
          + this.myaddress.toLowerCase() + '/' + this.contractAddress.toLowerCase() + '/'
          + this.token_id
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("token-like-change")
      } catch (err) {
        console.error(err)
      } finally {
        this.likeLoading = false
      }
    },

    async addHighlight () {

      const url = config.backendURL + '/api/' + this.networkid + '/nft-hightlights/add/'
          + this.myaddress.toLowerCase() + '/' + this.contractAddress.toLowerCase() + '/'
          + this.token_id
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("highlight-change")
      } catch (err) {
        console.error(err)
      } finally {
      }
    },

    async removeHighlight () {

      const url = config.backendURL + '/api/' + this.networkid + '/nft-hightlights/delete/'
          + this.myaddress.toLowerCase() + '/' + this.contractAddress.toLowerCase() + '/'
          + this.token_id
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("highlight-change")
      } catch (err) {
        console.error(err)
      } finally {
      }
    },

  },
  created () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
