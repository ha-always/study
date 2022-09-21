<template>
    <div class="storeList">
        <div v-for="(menu, index) in menus" :key="index">
          {{ index + 1 }}.{{ menu.menuName }}
        </div>
        <div style="margin-top: 30px;">
            <router-link to="/store">BACK</router-link>
        </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        menus: {},
      }
    },
    created: function() {
      var id = this.$route.params.id;
      this.$http.get(`/api/stores/${id}`)
      .then((response) => {
        this.menus = response.data
      })
    }
  };
</script>

<style>

</style>