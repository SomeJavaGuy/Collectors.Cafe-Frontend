<template>
  <v-chip :id="'user-summary-' + address" :to="{ name: 'user', params: {userAddress: address} }">
    <v-icon left color="success">mdi-account</v-icon>
      <span v-if="fulladdress">{{ address }}</span>
      <span v-else>{{ shortAddress }}</span>
    </v-chip>
</template>

<script>

export default {
  props: ['address', 'fulladdress'],
  data () {
    return {}
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
