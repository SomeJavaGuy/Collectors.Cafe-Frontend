<template>
<div>
<v-container fluid class="cover-banner">
  <v-layout row>
    <v-flex xs12 md6 pa-5 class="hidden-sm-and-down">
      <div class="text-center">
        <v-icon dark color="#b0f9b2" style="font-size: 300px">home</v-icon>
      </div>
    </v-flex>
    <v-flex xs12 md6 pa-5>
      <div class="mx-auto" style="max-width: 400px">
        <h1 style="color: white; margin-top: 40px; margin-bottom: 20px">Discover, Exhibit and Trade NFTs (Non-fungible Tokens) Across Multiple Platforms</h1>
        <LoginForm />
      </div>
    </v-flex>
  </v-layout>
</v-container>

<v-container>
  <div class="mx-auto text-center my-4" style="max-width: 800px; color: rgb(155, 155, 155);">
    <h2>Collectors.Cafe is a social network to discover, exhibit and trade NFTs (non-fugible tokens) across multiple platforms.</h2>
  </div>
</v-container>
</div>
</template>

<script>
import LoginForm from "@/components/LoginForm"
export default {
  components: {
    LoginForm
  }

};
</script>

<style scoped>
.cover-banner {
  background: linear-gradient(0deg, rgba(52,176,222,1) 0%, rgba(13,104,171,1) 100%);
}
</style>
