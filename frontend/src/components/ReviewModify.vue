<template>
    <div class="reviewDetail">
        <h2>🍽 {{store.storeName}} 🍽 - 리뷰 수정</h2>
        <div class="newReview">
            <label>아이디
                <input type="text" name="userid" v-model="reviews.username"/>
            </label>
            <label> 별점
                <select v-model="reviews.star">
                    <option :value="1">🧡🤍🤍🤍🤍</option>
                    <option :value="2">🧡🧡🤍🤍🤍</option>
                    <option :value="3">🧡🧡🧡🤍🤍</option>
                    <option :value="4">🧡🧡🧡🧡🤍</option>
                    <option :value="5">🧡🧡🧡🧡🧡</option>
                </select>
            </label>
            <div>
                <label> 이미지 
                    <input type="file"/>
                </label>
            </div>
            <textarea style="margin-top:20px" placeholder="음식의 맛, 가격, 웨이팅 여부 등" v-model="reviews.content"></textarea>
            <button class="primary" @click="modiReview">리뷰 수정하기</button>
            <button class="primary" @click="delReview">리뷰 삭제하기</button>
        </div>
        <div style="margin-top: 30px;">
            <router-link :to="`/store/${$route.params.id}`">BACK</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        modiReview: function (event) {
            var num = this.$route.params.num;
            this.$http.put(`/api/reviews/update/${num}`, {
                reviews: this.reviews
            })
                .then((res) => {
                    if (res.data.success == true) {
                        alert(res.data.message);
                        // this.$router.go();
                    }
                })
                .catch(function (error) {
                    alert("error");
                });
        },
        delReview: function () {
            var num = this.$route.params.num;
            if (!confirm("정말 삭제하시나요?")) {
                return
            } else {
                this.$http.delete(`/api/reviews/delete/${num}`,{})
                    .then((res) => {
                        if (res.data.success == true) {
                            alert(res.data.message);
                            this.$router.go(-1);
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
          reviews: {},
          store: {},
        }
      },
    created: function () {
        var id = this.$route.params.id;
        var num = this.$route.params.num;
        this.$http.get(`/api/reviews/${num}`)
            .then((res) => {
                this.reviews = res.data[0]
            })
        this.$http.get(`/api/stores/${id}`)
            .then((res) => {
                this.store = res.data[0]
            })
    }
};
</script>

<style>
.newReview {
    max-width: 600px;
    margin: 10px auto;
}

textarea {
    display: block;
    width: 80%;
    height: 140px;
    margin: 0 auto;
}
</style>