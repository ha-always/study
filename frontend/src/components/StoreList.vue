<template>
    <div class="storeList">
        <div v-for="(store, index) in stores" :key="index">
            {{index + 1}}. {{ store.storeName }} ( {{store.address}} )
            <router-link :to="`/store/${store.store_id}`">MENU</router-link> / 
            <router-link :to="`/review/${store.store_id}`">REVIEW</router-link>
        </div>
    </div>
</template>
  
  <script>
    export default {
      data() {
        return {
          stores: [],
        }
      },
      created() {
        this.$http.get("/api/stores").then((response) => {
          this.stores = response.data;
        });
      }
    };
  </script>
  
  <style>
  
  </style>