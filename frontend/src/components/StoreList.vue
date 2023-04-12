<template>
  <div class="storeList">
    <div v-for="(store, index) in stores" :key="index" style="margin-bottom: 10px;">
      {{index + 1}}.
      <a href="javascript:;" @click="storeclick(store.store_id)" class="link">{{store.storeName}}</a>( {{store.address}} )
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
      methods: {
        storeclick: function(stordId) {
          this.$router.push({ name: "storeDetail", params:{ id : stordId}}) 
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