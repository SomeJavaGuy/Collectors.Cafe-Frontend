<template>

<div>
<v-form ref="form">

      <v-row dense class="mx-auto" style="max-width: 700px;">

        <v-col cols="10" style="text-align:right">
          <v-text-field class="mx-2"
            outlined dense color="gray" persistent-hint
            label="Enter User Account Address"
            v-model.address.trim="address"
            placeholder=""
          ></v-text-field>
        </v-col>
        <v-col cols="2" style="text-align: left">
          <v-btn
            @click="visitUserPage"
          >
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
        </v-col>

      </v-row>

</v-form>
</div>
</template>

<script>

export default {
  data () {
    return {
      address: null
    }
  },
  computed: {
    shortAddress: function () {
      const frontToKeep = 0
      const endToKeep = 4
      const endIndexStart = this.address.length - endToKeep
      return this.address.substring(0, frontToKeep) + '...' + this.address.substring(endIndexStart)
    }
  },
  methods: {

    visitUserPage() {
      const cleanAddress = this.address.toLowerCase()
      this.$router.push({ name: 'user', params: {userAddress: cleanAddress} })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
