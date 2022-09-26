<template>
  <div class="storeList">
    <div v-for="(store, index) in stores" :key="index" style="margin-bottom: 10px;">
      {{index + 1}}.
      <router-link :to="`/store/${store.store_id}`" class="link">{{store.storeName}}</router-link>( {{store.address}} )
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
.link {
  font-weight: bold;
  color: #42b983;
  margin: 0 5px;
}
.link:hover {
  color: orange;
}
</style>