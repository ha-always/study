<template>
    <div class="storeDetail">
        <h2>🍽 {{store.storeName}} 🍽</h2>
        <strong>[ 메뉴 리스트 ]</strong>
        <div v-for="(menu, index) in menus" :key="index">
          {{ index + 1 }}.{{ menu.menuName }}
        </div>
        <hr/>
        <div v-if="reviews.length == 0">아직 이 가게의 리뷰가 1도 없습니다. 어서 작성해보세요.</div>
        <div v-for="(review, idx) in reviews">
          {{idx + 1}}. {{review.username}}의 평가 : {{review.content}} (
            <span v-for="cnt in 5">
                {{cnt < review.star ? '🧡' : '🤍'}}
            </span>
          )<button @click="delReview">이 리뷰 삭제.</button>
        </div>
        <router-link :to="`/reviewCreate/${$route.params.id}`"><button>새로운 리뷰 작성.</button></router-link>
        <div style="margin-top: 30px;">
            <router-link to="/store">BACK</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        delReview: function() {
            console.log("clicked delReview")
        }
    },
    data() {
        return {
          menus: {},
          reviews: {},
          store: {},
        }
      },
    created: function () {
        var id = this.$route.params.id;
        this.$http.get(`/api/stores/${id}`)
            .then((res) => {
                this.store = res.data[0]
            })
        this.$http.get(`/api/stores/menu/${id}`)
            .then((response) => {
                this.menus = response.data
            })
        this.$http.get(`/api/reviews/${id}`)
            .then((res) => {
                this.reviews = res.data
            })
    }
};
</script>

<style>
</style>