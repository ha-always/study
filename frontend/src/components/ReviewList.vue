<template>
  <div class="reviewList">
    <div v-for="(review, index) in reviews" :key="index">
      작성자: {{review.user_id}} / 가게 : {{review.store_id}} /  평가 : {{review.content}}
    </div>
    <router-link to="/store">BACK</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reviews: [],
      }
    },
    created() {
      this.$http.get("/api/reviews").then((response) => {
        this.reviews = response.data;
      });
    }
  };
</script>

<style>

</style>