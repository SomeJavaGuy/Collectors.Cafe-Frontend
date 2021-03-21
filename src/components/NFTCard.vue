<template>
  <div class="py-1 px-2">
  <v-card v-if="loading"
    class="mx-auto my-2"
    max-width="344"
  >
    <v-card-text>
      <Preloader circle></Preloader>
    </v-card-text>
  </v-card>

  <v-card v-if="!loading"
    class="mx-auto my-2"
    max-width="344"
  >

    <v-card-title style="line-height: 1rem;">
      <div class="text-truncate" style="font-size: 1.0rem; font-weight: bold;">
        <span v-if="contractName">{{ contractName }}</span>
        <span v-if="!name">&nbsp;</span>
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
      <div>
        <span v-if="name">{{ name }}</span>
        <span v-if="name">&nbsp;</span>
      </div>
      <div v-show="showDescription">{{ description }}</div>

      <span v-if="quoteInETH"><strong>{{ quoteInETH }}</strong> Ether</span>
      <span v-if="!quoteInETH">&nbsp;</span>
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
        <span>{{ description }}</span>
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
import Preloader from "@/components/Preloader"
import { fromWeiToEther, getFromLocalStorage, saveToLocalStorage } from '@/utils/utils'
export default {
  props: ['info', 'networkid', 'typeCounter', 'itemCounter', 'myaddress', 'myhightlightlist', 'mynftlikelist'],
  data: () => ({
    retryCount: 0,
    jobWaiting: null,
    retryWaiting: null,
    maxToLoad: 5,
    loading: true,
    initializationDone: false,
    networkId: null,
    userAddress: null,
    thisIsMyself: false,
    showDescription: false,
    likeList: [],
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
  }),
  components: {
    Preloader
  },
  computed: {
    // myAddress: function () {
    //   return this.$store.state.userAddress
    // },
    name: function () {
      if (this.info.external_data && this.info.external_data.name) {
        return this.info.external_data.name
      }
      else if (this.detailedTokenInfo && this.detailedTokenInfo.external_data && this.detailedTokenInfo.external_data.name) {
        return this.detailedTokenInfo.external_data.name
      }
      else {
        return null
      }
    },
    description: function () {
      if (this.info.external_data && this.info.external_data.description) {
        return this.info.external_data.description
      }
      else if (this.detailedTokenInfo && this.detailedTokenInfo.external_data && this.detailedTokenInfo.external_data.description) {
        return this.detailedTokenInfo.external_data.description
      }
      else {
        return null
      }
    },
    contractName: function () {
      return this.info.contract_name
    },
    contractAddress: function () {
      return this.info.contract_address
    },
    token_id: function () {
      return this.info.token_id
    },
    token_url: function () {
      if (this.info.external_data && this.info.external_data.token_url) {
        return this.info.external_data.token_url
      }
      else if (this.detailedTokenInfo && this.detailedTokenInfo.external_data && this.detailedTokenInfo.external_data.external_url) {
        return this.detailedTokenInfo.external_data.external_url
      }
      else {
        return null
      }
    },
    ownerAddress: function () {
      return this.info.owner
    },
    image_url: function () {
      if (this.info.external_data && this.info.external_data.image) {
        return this.info.external_data.image
      }
      else if (this.detailedTokenInfo && this.detailedTokenInfo.external_data && this.detailedTokenInfo.external_data.image) {
        return this.detailedTokenInfo.external_data.image
      }
      else {
        return null
      }
    },
    quoteInETH: function () {
      if (this.detailedTokenInfo && this.detailedTokenInfo.token_quote_rate_eth) {
        return this.detailedTokenInfo.token_quote_rate_eth
      }
      else {
        return null
      }
    },
    isMyToken: function () {
      // return false
      if (this.info.owner) {
        if (this.info.owner.toLowerCase() == this.myaddress.toLowerCase()) {
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
      console.log("counter", this.info.counter)
      this.loading = true

      if (this.info.counter <= this.maxToLoad) {
        await this.getNFTMetaData()
      }
      else {
        const sleepTime = this.info.counter * 2000
        console.log('NFTCard will sleep: ', sleepTime)
        const that = this
        await new Promise(r => that.jobWaiting = setTimeout(r, sleepTime))
        console.log('waking up')
        await this.getNFTMetaData()
      }
      // await this.getLikes()

      this.loading = false
    },

    async getLikes() {
      this.likeList = []

      const url = config.backendURL + '/api/' + this.networkid + '/nft-likes/item/'
          + this.contractAddress.toLowerCase() + '/' + this.token_id
      console.log(url)

      try {
        const res = await this.$http.get(url)
        // console.log(res)
        if (res.body && res.body.length > 0) {
          this.likeList = res.body
        }
      } catch (err) {
        console.error(err)
      } finally {
      }

    },

    async getNFTMetaData() {

      // console.log('userAddress: ' + this.userAddress)
      this.detailedTokenInfo = null

      const localStorageKey = 'nft-token-' + this.networkid + '-'
            + this.info.contract_address + '-' + this.info.token_id
            + '-covalent'
      // console.log(localStorageKey)
      const localStored = getFromLocalStorage(localStorageKey)
      if (localStored) {
        console.log('Getting from cache: ', this.info.token_id)
        this.detailedTokenInfo = localStored
        return
      }

      const apiURL = config.covalentAPI.URLRoot
                + '/v1/' + this.networkid + '/tokens/' + this.info.contract_address
                + /nft_metadata/ + this.info.token_id + '/?key='
                + config.covalentAPI.APIKey
      console.log(apiURL)

      try {
        const res = await this.$http.get(apiURL)
        this.detailedTokenInfo = res.body.data.items[0].nft_data[0]
        console.log('Saving to cache: ', this.info.token_id)
        saveToLocalStorage(localStorageKey, this.detailedTokenInfo)
        console.log(this.detailedTokenInfo)
      } catch (err) {
        console.log(err)
        // If too many requests
        if (err.status === 429 ) {
          this.retryCount++;
          if (this.retryCount <= 2) {
            const that = this
            await new Promise(r => that.retryWaiting = setTimeout(r, 2000))
            await this.getNFTMetaData()
          }
          else {
            console.log('max retry reached. stoppping')
          }
        }
        // this.showNotification('error', 'Error occurred!')
      } finally {
      }

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
  },
  beforeDestory () {
    clearInterval(this.jobWaiting)
    clearInterval(this.retryWaiting)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
