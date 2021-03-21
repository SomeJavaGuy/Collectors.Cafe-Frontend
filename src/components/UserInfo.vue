<template>
  <div>

  <div class="my-2 pa-3 orange lighten-5">
      <v-row>

        <v-col cols="6" sm="2">

          <v-avatar
            class="ma-5 align-center"
            size="100"
          >
          <v-img src="/images/account-head.png"></v-img>
          </v-avatar>

        </v-col>

        <v-col cols="12" sm="10">

          <v-card-title
            class="headline"
          >
            <v-chip v-show="isMyself"
              class="ma-2"
              color="green"
              text-color="white"
            >
              Me
            </v-chip>
            {{ address }}
          </v-card-title>

          <v-card-subtitle v-text="address"></v-card-subtitle>

            <span>{{ followees.length }} Following: </span>
            <span v-if="followees.length > 0">
              <UserSummary
                v-for="(item, i) in followees"
                :key="i"
                :address="item"
                class="mx-1 my-1"
              ></UserSummary>
            </span>

            <br />

            <span>{{ followers.length }} Followers:</span>
            <span v-if="followers.length > 0">
              <UserSummary
                v-for="(item, i) in followers"
                :key="i"
                :address="item"
                class="mx-1 my-1"
              ></UserSummary>
            </span>

          <v-card-actions>
            <span v-if="!isMyself && !imFollowingThisUser">
              <v-btn small @click="followUser" :disabled="followLoading">
                Follow
              </v-btn>
            </span>
            <span v-if="!isMyself && imFollowingThisUser">
              <v-chip class="mr-3" color="success">Following</v-chip>
              <v-btn small color="error" @click="unfollowUser" :disabled="followLoading">
                Unfollow
              </v-btn>
            </span>
          </v-card-actions>

        </v-col>
    </v-row>

  </div>



  </div>
</template>

<script>

import { config } from '@/config'
import UserSummary from "@/components/UserSummary"
export default {
  props: ['address', 'myaddress', 'networkid', 'followers', 'followees', 'myfollowers', 'myfollowees'],
  data () {
    return {
      followLoading: false,
    }
  },
  components: {
    UserSummary,
  },
  computed: {
    isMyself: function () {
      return this.address.toLowerCase() == this.myaddress.toLowerCase()
    },
    imFollowingThisUser: function () {
      return this.followers.includes(this.myaddress)
    },
    thisUserIsFollowingMe: function () {
      return this.followees.includes(this.myaddress)
    },
    shortAddress: function () {
      const frontToKeep = 6
      const endToKeep = 4
      const endIndexStart = this.address.length - endToKeep
      return this.address.substring(0, frontToKeep) + '...' + this.address.substring(endIndexStart)
    }
  },
  methods: {

    async followUser () {
      this.followLoading = true

      const url = config.backendURL + '/api/' + this.networkid + '/userfollow/follow/'
          + this.myaddress.toLowerCase() + '/' + this.address.toLowerCase()
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("user-following-change")
      } catch (err) {
        console.error(err)
      } finally {
        this.followLoading = false
      }
    },

    async unfollowUser () {
      this.followLoading = true

      const url = config.backendURL + '/api/' + this.networkid + '/userfollow/unfollow/'
          + this.myaddress.toLowerCase() + '/' + this.address.toLowerCase()
      console.log(url)

      try {
        const res = await this.$http.post(url)
        console.log(res)
        this.$emit("user-following-change")
      } catch (err) {
        console.error(err)
      } finally {
        this.followLoading = false
      }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
