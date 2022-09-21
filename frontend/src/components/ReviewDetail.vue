<template>
    <div class="reviewDetail">
            작성자: {{ reviews.user_id }} / 평가 : {{reviews.content}}
        <div style="margin-top: 30px;">
            <router-link to="/store">BACK</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number
    },
    data() {
        return {
          reviews: [],
        }
      },
      created() {
        var id = this.$route.params.id - 1
        this.$http.get("/api/reviews").then((response) => {
            this.reviews = response.data[id];
        });
    }
};
</script>

<style>

</style>