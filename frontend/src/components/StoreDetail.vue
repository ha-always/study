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
                {{cnt <= review.star ? '🧡' : '🤍'}}
            </span>
          )<button @click="modiReview(idx)">수정.</button><button @click="delReview(idx)">삭제.</button>
        </div>
        <router-link :to="`/reviewCreate/${$route.params.id}`"><button>새로운 리뷰 작성.</button></router-link>
        <div style="margin-top: 30px;">
            <router-link to="/store">BACK</router-link>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default {
    methods: {
        modiReview: function(idx){
            var id = this.$route.params.id;
            var num = this.reviews[idx].review_id;
            this.$router.push({name: 'reviewModify', params: {id, num}})
        },
        delReview: function (idx) {
            var num = this.reviews[idx].review_id;
            if (!confirm("정말 삭제하시나요?")) {
                return
            } else {
                this.$http.delete(`/api/reviews/delete/${num}`,{})
                    .then((res) => {
                        if (res.data.success == true) {
                            alert(res.data.message);
                            this.$router.go();
                        }
                    })
                    .catch(function (error) {
                        alert("error");
                    });
            }
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
            .then((res) => {
                this.menus = res.data
            })
        this.$http.get(`/api/stores/review/${id}`)
            .then((res) => {
                this.reviews = res.data
            })
    }
};
</script>

<style>
</style>