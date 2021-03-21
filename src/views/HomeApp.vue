<template>
  <div>

  <Preloader v-show="loading" text="loading..."></Preloader>

  <v-container v-show="!loading" grid-list-md>
    <h1 class="text-center">My Collectibles</h1>

    <v-layout wrap>
      <v-flex
        v-for="(item, i) in NFTList"
        :key="i"
        md4 sm6 xs12
      >

      <NFTCard
        :info = "item"
      >
      </NFTCard>


      </v-flex>
    </v-layout>
  </v-container>

  <!-- Begin Dialog Form -->
  <v-layout justify-center>
    <v-dialog v-model="modalOpen" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="headline">Add Data</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form
              ref="addForm"
              v-model="addForm.valid"
            >
              <v-text-field
                v-model="addForm.userId"
                :rules="addForm.rules.userId"
                label="usrId"
                type="number"
                required
              ></v-text-field>

              <v-text-field
                v-model="addForm.title"
                :rules="addForm.rules.title"
                label="Title"
                clearable
                required
              ></v-text-field>

              <v-textarea
                v-model="addForm.body"
                :rules="addForm.rules.body"
                outlined
                name="body"
                counter="500"
                label="Body"
                clearable
              ></v-textarea>

              <v-checkbox
                v-model="addForm.checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree with our terms?"
                required
              ></v-checkbox>

        <div class="text-center">

          <v-btn
            :disabled="!addForm.valid"
            color="success"
            class="mr-4"
            @click="apiAddData"
          >
            Submit
          </v-btn>

          <v-btn
            color="info"
            @click="modalOpen = false"
          >
            Cancel
          </v-btn>

        </div>
            </v-form>

          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
   <!-- End Dialog Form -->

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
import Preloader from "@/components/Preloader"
import { config } from '@/config'
export default {
  data: () => ({
    loading: true,
    myProfile: null,
    NFTList: [],
    modalOpen: false,
    notificationBar: {
      show: false,
      type: 'success', // 'success', 'error'
      message: ''
    },
    addForm: {
      valid: true,
      userId: null,
      title: null,
      body: null,
      checkbox: false,
      rules: {
        userId: [
          v => !!v || 'userId is required',
          v => (v > 0 && v <= 100) || 'Value must be between 1 and 100',
        ],
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        body: [
          v => !!v || 'Body is required',
          v => (v && v.length <= 500) || 'Name must be less than 500 characters',
        ],
      },
    },
  }),
  computed: {
    myAddress: function () {
      return this.$store.state.myAddress
    },
    box: function () {
      return this.$store.state.box
    }
  },
  components: {
    Preloader,
    NFTCard,
  },
  methods: {

    async init() {
      await this.getMyProfile()
      await this.getMyNFTList()
    },

    async getMyProfile() {
      this.myProfile = await window.Box.getProfile(this.myAddress)
      console.log(this.myProfile)
    },

    async getMyNFTList() {
      this.loading = true
      this.NFTList = [];
      console.log('appHome')
      console.log('myAddress: ' + this.myAddress)

      const apiURL = config.openSeaAPI.url.getAssets
      console.log(apiURL)

      try {
        const params = {
          owner: this.myAddress
        }
        const headers = config.openSeaAPI.headers
        const res = await axios.get(apiURL, { params: params, headers: headers })
        // console.log(res.data)
        for (let item of res.data.assets) {
          this.NFTList.push(item)
        }
        console.log(this.NFTList)
      } catch (err) {
        console.log(err)
        this.showNotification('error', 'Error occurred!')
      } finally {
        this.loading = false
      }

    },

    async apiAddData() {

    },

    showNotification(type, message) {
      this.notificationBar.message = message
      this.notificationBar.type = type   // 'success' or 'error'
      this.notificationBar.show = true
    }

  },
  created () {
    this.init()
  }
}
</script>
