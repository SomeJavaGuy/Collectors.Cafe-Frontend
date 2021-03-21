<template>
<div>
<v-container fluid class="cover-banner pt-5">
  <v-layout row>
    <v-flex xs12 md6 pa-5 class="hidden-sm-and-down">
      <div class="text-center">
        <!--
        <v-icon dark color="#b0f9b2" style="font-size: 300px">home</v-icon>
      -->
      <v-img :aspect-ratio="1/1"
        class="mx-auto"
        style="padding: 50px; max-width: 450px;"
        src="https://ipfs.rarible.com/ipfs/QmPERfp8rcsLnhCar2JxeRikWMNX7W9VHPapkCpcsjwBoj/image.gif" />
      </div>
    </v-flex>
    <v-flex xs12 md6 pa-5>
      <div class="mx-auto" style="max-width: 500px">
        <h1 style="color: #444; margin-top: 40px; margin-bottom: 20px">Discover, Exhibit and Trade NFTs (Non-fungible Tokens) Across Multiple Platforms</h1>
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


<div style="max-width: 900px; margin-top: 10px; margin-bottom: 30px; padding-top: 30px; padding-bottom: 30px" class="mx-auto mb-4" >
  <v-row>
    <v-col class="px-3 py-5 text-center green accent-1 mx-2">
      <h1 class="mb-3">Discover</h1>
      <h3>Discover fun or beautiful NFTs</h3>
      <h3>Discover cool NFT creators and collectors</h3>
    </v-col>
    <v-col class="pa-5 text-center green accent-1 mx-2">
      <h1 class="mb-3">Exhibit</h1>
      <h3>Show off your NFTs by creating your own showroom</h3>
    </v-col>
    <v-col class="pa-5 text-center green accent-1 mx-2">
      <h1 class="mb-3">Trade</h1>
      <h3>Buy, sell or swap NFTs across multiple marketplaces</h3>
    </v-col>
  </v-row>
</div>

<div class="grey mx-auto text-center my-4" style="margin-top: 30px; padding-top: 60px; padding-bottom: 60px">
  <h1 class="white--text mb-5">Our Parteners</h1>
  <v-row style="max-width: 900px;" class="mx-auto">
    <v-col class="px-3 py-5 text-center mx-2">
      <v-img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9c5d4e46-3f6a-4ee3-a636-5ecc90d89d54%2FUntitled.png?table=block&id=f0011967-1083-4625-8b7f-6c851e38b21b&width=670&userId=&cache=v2" style="max-width: 200px"></v-img>
    </v-col>
    <v-col class="px-3 py-5 text-center mx-2">
      <v-img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F819a0480-11cd-4472-baf3-69b708dcdb4c%2FUntitled.png?table=block&id=0f1864d8-17ae-463c-b9b9-966aaf269a5b&width=3060&userId=&cache=v2" style="max-width: 200px"></v-img>
    </v-col>
    <v-col class="px-3 py-5 text-center mx-2">
      <v-img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/IPFS_logo.png" style="max-width: 200px"></v-img>
    </v-col>
  </v-row>
</div>


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
  background-color: #ffe8db;
  /*background: linear-gradient(0deg, rgba(52,176,222,1) 0%, rgba(13,104,171,1) 100%);*/
}
</style>
