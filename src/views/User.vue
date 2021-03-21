<template>
  <div>

  <Preloader v-show="!initializationDone" text="loading..."></Preloader>

  <v-container v-if="initializationDone">
    <UserInfo
      :address="userAddress"
      :myaddress="myAddress"
      :networkid = "network.id"
      :followers = "userFollowerList"
      :followees = "userFolloweeList"
      :myfollowers = "myFollowerList"
      :myfollowees = "myFolloweeList"
      v-on:user-following-change="init"
    />


    <OrderList class="mt-4"
      :networkid = "network.id"
      type = "sell_by_maker"
      :maker = "userAddress"
      title = "Sell Orders"
    />

    <OrderList class="mt-4"
      :networkid = "network.id"
      type = "bid_by_maker"
      :maker = "userAddress"
      title = "Bid Orders"
    />

  </v-container>

  <!----------------------------------------------------------->
  <!-- Begin Mainnet -->
  <!----------------------------------------------------------->
  <v-container v-if="network.id == 1 && initializationDone">


    <div v-if="userHighlightList.length == 0">
      Showroom Empty
    </div>

    <v-layout wrap>
      <v-flex
        v-for="(item, i) in userHighlightList"
        :key="i"
        md4 sm6 xs12
      >

        <NFTCard
          :info = "item"
          :key = "'nftcard' + i"
          :myaddress = "myAddress"
          :networkid = "network.id"
          :mynftlikelist = "account.nftLikeList"
          :myhightlightlist = "account.nftHighlightList"
          v-on:token-like-change="init"
          v-on:highlight-change="init"
        >
        </NFTCard>


      </v-flex>
    </v-layout>

    <div v-if="NFTList.length == 0">
      No NFT
    </div>

    <v-layout wrap>
      <v-flex
        v-for="(item, i) in NFTList"
        :key="i"
        md4 sm6 xs12
      >

        <NFTCard
          :info = "item"
          :key = "'nftcard' + i"
          :myaddress = "myAddress"
          :networkid = "network.id"
          :mynftlikelist = "account.nftLikeList"
          :myhightlightlist = "account.nftHighlightList"
          v-on:token-like-change="init"
          v-on:highlight-change="init"
        >
        </NFTCard>


      </v-flex>
    </v-layout>

  </v-container>
  <!----------------------------------------------------------->
  <!-- END Mainnet -->
  <!----------------------------------------------------------->


  <!----------------------------------------------------------->
  <!-- Begin Testnet -->
  <!----------------------------------------------------------->
  <v-container v-if="network.id == 4 && initializationDone">

    <div v-if="userHighlightList.length == 0">
      Showroom Empty
    </div>

    <v-layout wrap>
      <v-flex
        v-for="(item, i) in userHighlightList"
        :key="i"
        md4 sm6 xs12
      >

      <TestnetNFTCard
        :info = "item"
        :key = "'nftcard' + i"
        :myaddress = "myAddress"
        :networkid = "network.id"
        :mynftlikelist = "account.nftLikeList"
        :myhightlightlist = "account.nftHighlightList"
        v-on:token-like-change="init"
        v-on:highlight-change="init"
      >
      </TestnetNFTCard>


      </v-flex>
    </v-layout>


    <div v-if="testnetNFTList.length == 0">
      No NFT
    </div>

    <v-layout wrap>
      <v-flex
        v-for="(item, i) in testnetNFTList"
        :key="i"
        md4 sm6 xs12
      >

      <TestnetNFTCard
        :info = "item"
        :key = "'nftcard' + i"
        :myaddress = "myAddress"
        :networkid = "network.id"
        :mynftlikelist = "account.nftLikeList"
        :myhightlightlist = "account.nftHighlightList"
        v-on:token-like-change="init"
        v-on:highlight-change="init"
      >
      </TestnetNFTCard>


      </v-flex>
    </v-layout>

  </v-container>
  <!----------------------------------------------------------->
  <!-- End Testnet -->
  <!----------------------------------------------------------->


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
import NFTCard from "@/components/NFTCard"
import TestnetNFTCard from "@/components/TestnetNFTCard"
import Preloader from "@/components/Preloader"
import UserSummary from "@/components/UserSummary"
import UserInfo from "@/components/UserInfo"
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
    NFTList: [],
    testnetNFTList: [],
    CurrencyList: [],
    userFollowerList: [],
    userFolloweeList: [],
    userHighlightList: [],
    myFollowerList: [],
    myFolloweeList: [],
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
  }),
  components: {
    Preloader,
    NFTCard,
    TestnetNFTCard,
    UserSummary,
    UserInfo,
    OrderList,
  },
  computed: {
    ...mapGetters({
      // config: 'getConfig',
      network: 'getNetwork',
      account: 'getAccount',
      myAddress: 'getUserAccount',
    }),
  },
  methods: {
    ...mapActions(['loadNetwork', 'loadAccount']),
    async init() {
      console.log('user init...')
      this.initializationDone = false
      await this.loadNetwork()
      await this.loadAccount(true)
      console.log(this.account)
      console.log('my Address: ' + this.myAddress)

      if ('userAddress' in this.$route.params) {
        this.userAddress = this.$route.params.userAddress
        if (this.userAddress == this.myAddress) {
          this.thisIsMyself = true
        }
        else {
          this.thisIsMyself = false
        }
      }
      else {
        this.userAddress = this.myAddress
      }
      if (this.network.id == 1) {
        await this.getUserTokenBalance()
      }
      else if (this.network.id == 4) {
        await this.testnetGetUserTokenBalance()
      }

      await this.getUserNetworkInfo()
      console.log(this.userHighlightList)

      this.initializationDone = true
    },


    async getUserTokenBalance() {
      this.NFTList = []
      this.CurrencyList = []
      console.log('userAddress: ' + this.userAddress)

      const apiURL = config.covalentAPI.URLRoot
                + '/v1/' + this.network.id + '/address/' + this.userAddress + '' + '/balances_v2/?nft=true&no-nft-fetch=true&key='
                + config.covalentAPI.APIKey
      console.log(apiURL)

      try {
        const res = await this.$http.get(apiURL)
        const items = res.body.data.items
        let NFTCount = 0;
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          if (item.type == 'cryptocurrency') {
            this.CurrencyList.push(item)
          }
          if (item.type == 'nft') {
            for (let j = 0; j < item.nft_data.length; j++) {
              NFTCount++;
              item.nft_data[j].counter = NFTCount
              item.nft_data[j].contract_address = item.contract_address
              item.nft_data[j].contract_name = item.contract_name
              item.nft_data[j].contract_ticker_symbol = item.contract_ticker_symbol
              this.NFTList.push(item.nft_data[j])
            }
          }
        }
        console.log(this.CurrencyList)
        console.log(this.NFTList)
      } catch (err) {
        console.log(err)
        this.showNotification('error', 'Error occurred!')
      } finally {
      }

    },

    async testnetGetUserTokenBalance() {
      this.testnetNFTList = []
      this.CurrencyList = []
      console.log('userAddress: ' + this.userAddress)

      const apiURL = config.openSeaRinkebyAPI.URLRoot
                + 'assets?owner=' + this.userAddress
      console.log(apiURL)

      try {
        const res = await this.$http.get(apiURL)
        console.log(res)
        const items = res.body.assets
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          this.testnetNFTList.push(item)
        }
        console.log(this.testnetNFTList)
      } catch (err) {
        console.log(err)
        this.showNotification('error', 'Error occurred!')
      } finally {
      }

    },

    async getUserNetworkInfo () {

      this.userFollowerList = []
      this.userFolloweeList = []

      this.myFollowerList = []
      this.myFolloweeList = []

      this.userHighlightList = []

      try {

        let url = config.backendURL + '/api/' + this.network.id + '/userfollow/'
            + this.userAddress.toLowerCase()
        // console.log(url)
        let res = await this.$http.get(url)
        // console.log(res)
        this.userFollowerList = res.body.followers
        this.userFolloweeList = res.body.followees
        this.myFollowerList = res.body.myfollowers
        this.myFolloweeList = res.body.myfollowees

        url = config.backendURL + '/api/' + this.network.id + '/nft-hightlights/'
            + this.userAddress.toLowerCase()
        res = await this.$http.get(url)
        console.log(res)
        if (res.body) {
          const highlightList = res.body

          for (let i=0; i<highlightList.length; i++) {
            let hightlight = highlightList[i]

            if (this.network.id == 1) {
              for (let j = 0; j < this.NFTList.length; j++) {
                let nft = this.NFTList[j]
                if (nft.contract_address.toLowerCase() == hightlight.contractAddress.toLowerCase() && nft.token_id == hightlight.tokenId) {
                  let hightNFT = { ...nft }
                  this.userHighlightList.push(hightNFT)
                }
              }
            }
            else {
              for (let j = 0; j < this.testnetNFTList.length; j++) {
                let nft = this.testnetNFTList[j]
                if (nft.asset_contract.address.toLowerCase() == hightlight.contractAddress.toLowerCase() && nft.token_id == hightlight.tokenId) {
                  let hightNFT = { ...nft }
                  this.userHighlightList.push(hightNFT)
                }
              }
            }

          }

        }

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
