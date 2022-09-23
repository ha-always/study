<template>
    <div class="reviewDetail">
        <h2>🍽 {{store.storeName}} 🍽</h2>
        <div v-if="reviews.length == 0">
            아직 이 가게의 리뷰가 1도 없습니다.
        </div>
        <div v-for="(review, idx) in reviews" :key="idx">
          {{idx + 1}}. {{review.username}}의 평가 : {{review.content}} (
            <span v-for="idx in review.star" :key="idx">🧡</span>
          )<button @click="delReview">이 리뷰 삭제.</button>
        </div>
        <div class="newReview">
            <hr>
            <div class="title"><h3>이 가게의 새로운 리뷰를 아래에 작성하세요.</h3></div>
            <label>아이디
                <input type="text" name="userid" v-model="form.username"/>
            </label>
            <label> 별점
                <select v-model="form.star">
                    <option :value="1">🧡🤍🤍🤍🤍</option>
                    <option :value="2">🧡🧡🤍🤍🤍</option>
                    <option :value="3">🧡🧡🧡🤍🤍</option>
                    <option :value="4">🧡🧡🧡🧡🤍</option>
                    <option :value="5">🧡🧡🧡🧡🧡</option>
                </select>
            </label>
            <div>이미지도 첨부할수 있도록.. 하기</div>
            <textarea style="margin-top:20px" placeholder="음식의 맛, 가격, 웨이팅 여부 등" v-model="form.content"></textarea>
            <button class="primary" @click="createReview">리뷰 올리기</button>
        </div>
        <div style="margin-top: 30px;">
            <router-link to="/store">BACK</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        createReview: function (event) {
            var id = this.$route.params.id;
            this.form.storeid = id
            this.$http.post("/api/reviews/create", {
                form: this.form
            })
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
    },
    data() {
        return {
          reviews: {},
          store: {},
          form: {
            username: '',
            storeid: '',
            star: '1',
            content: ''
          }
        }
      },
    created: function () {
        var id = this.$route.params.id;
        this.$http.get(`/api/reviews/${id}`)
            .then((res) => {
                this.reviews = res.data
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