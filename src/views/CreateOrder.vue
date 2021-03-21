<template>
  <div>

  <h2 class="text-center mx-auto mt-5 mb-3">Create New Order</h2>

  <Preloader v-show="!initializationDone" text="loading..."></Preloader>


  <v-container v-if="initializationDone">

  <v-card class="mx-auto pa-4" style="max-width: 600px">

    <div>

    Type: {{ orderType }} <br />
    Contract: {{ contractAddress }} <br/>
    tokenID: {{ tokenId }}

  </div>

    <v-form ref="form" class="my-3 text-center" >

      <v-row dense>

        <v-col cols="12">
          <v-text-field class="mx-2"
            outlined dense color="gray" persistent-hint
            label="Amount"
            v-model.number.trim="input.offerTokenAmount"
            type="number"
            placeholder=""
            suffix="ETH"
          ></v-text-field>
        </v-col>

      </v-row>


      <!-- Review button -->
      <div class="text-center">
        <v-btn color="secondary"
          @click="init" class="ma-2"
        >
            Reset
        </v-btn>
        <v-btn v-show="inputComplete"
          color="success" class="ma-2"
          @click="prepareOrder"
          :disabled="loading"
        >
          Create Order
        </v-btn>
      </div>

    </v-form>



  </v-card>
  </v-container>


  </div>
</template>

<script>
import Preloader from "@/components/Preloader"
import UserSummary from "@/components/UserSummary"
import {mapActions, mapGetters, mapState} from 'vuex'
import { fromEtherToWei, fromWeiToEther } from '@/utils/utils'
import { Order, sign } from '@/utils/order'
import * as ethUtil from 'ethereumjs-util'
import { config } from '@/config'

export default {
  data: () => ({
    loading: false,
    initializationDone: false,
    networkId: null,
    userAddress: null,
    orderData: null,
    input: {
      offerTokenAmount: null,
    },
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
  }),
  components: {
    Preloader,
    UserSummary,
  },
  computed: {
    ...mapGetters({
      // config: 'getConfig',
      network: 'getNetwork',
      myAddress: 'getUserAccount',
    }),

    inputComplete: function () {
      return this.input.offerTokenAmount
    },

    orderType: function () {
      return this.$route.params.type
    },

    contractAddress: function () {
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

  },
  methods: {
    ...mapActions(['loadNetwork']),
    async init() {
      this.initializationDone = false
      await this.loadNetwork()
      this.initializationDone = true
    },

    async prepareOrder () {
      this.loading = true

      const inputOfferAmount = this.input.offerTokenAmount
      // console.log('amount original: ', inputOfferAmount)

      const offerTokenAmountInWei = fromEtherToWei(inputOfferAmount)
      // console.log('amoutn in wei: ', offerTokenAmountInWei)

      const data = {
        maker: this.myAddress,
        make: {
          type: {
            token: this.contractAddress,
            tokenId: this.tokenId,
            '@type': "ERC721"
          },
          value: 1
        },
        take: {
          type: { '@type': 'ETH' },
          value: offerTokenAmountInWei
        },
        salt: 1,
        data: {
          beneficiary: "0x0000000000000000000000000000000000000000",
          originFees: [],
          '@type': "V1"
        }
      }

      console.log(data)

      // Use wallet to get the signature
      try {

// https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26
// web3.currentProvider.sendAsync(
// {
//     method: "eth_signTypedData_v3",
//     params: [signer, data],
//     from: signer
// },
// function(err, result) {
//     if (err) {
//         return console.error(err);
//     }
//     const signature = result.result.substring(2);
//     const r = "0x" + signature.substring(0, 64);
//     const s = "0x" + signature.substring(64, 128);
//     const v = parseInt(signature.substring(128, 130), 16);
//     // The signature is now comprised of r, s, and v.
//     }
// );

        // console.log ('current provider', window.web3.currentProvider)

        // const sig = window.web3.currentProvider.sendAsync(
        // {
        //     method: "eth_signTypedData_v3",
        //     params: [this.myAddress, JSON.stringify(data)],
        //     from: this.myAddress
        // })

        // console.log(this.myAddress)
        // const sig = await window.web3.eth.personal.sign(JSON.stringify(data), this.myAddress)

        const verifyingContract = '0x43162023C187662684abAF0b211dCCB96fa4eD8a'
        const sig = await sign(data, this.myAddress, this.network.id, verifyingContract)
        console.log(sig)



        return

        const signature = sig
        const signedOrder = {
          ...data
        }
        signedOrder.signature = signature
        console.log(JSON.stringify(signedOrder))


        // console.log('networkId', networkId)
        const url = config.raribleAPI[this.network.id].URLRoot + '/protocol/ethereum/order/indexer/v0.1/orders'
        console.log(url)

        const headers = {
          'Content-Type': 'application/json',
        }

        const res = await this.$http.put(url, signedOrder, headers)
        console.log(res)

      } catch (err) {
        console.log(err)
        if (err.code && err.code === 4001) {
          this.error = "Access Denied"
        }
        else {
          this.error = "Login Error"
        }
        // this.loading = false
        return
      }

      this.loading = false
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
