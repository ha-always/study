<template>
    <div class="storeDetail">
        <h2>π½ {{store.storeName}} π½</h2>
        <strong>[ λ©λ΄ λ¦¬μ€νΈ ]</strong>
        <div v-for="(menu, index) in menus" :key="index">
          {{ index + 1 }}.{{ menu.menuName }}
        </div>
        <hr/>
        <div v-if="reviews.length == 0">μμ§ μ΄ κ°κ²μ λ¦¬λ·°κ° 1λ μμ΅λλ€. μ΄μ μμ±ν΄λ³΄μΈμ.</div>
        <div v-for="(review, idx) in reviews">
          {{idx + 1}}. {{review.username}}μ νκ° : {{review.content}} (
            <span v-for="cnt in 5">
                {{cnt <= review.star ? 'π§‘' : 'π€'}}
            </span>
          )<button @click="modiReview(idx)">μμ .</button><button @click="delReview(idx)">μ­μ .</button>
        </div>
        <router-link :to="`/reviewCreate/${$route.params.id}`"><button>μλ‘μ΄ λ¦¬λ·° μμ±.</button></router-link>
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
            if (!confirm("μ λ§ μ­μ νμλμ?")) {
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