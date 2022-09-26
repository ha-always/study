<template>
    <div class="reviewDetail">
        <h2>🍽 {{store.storeName}} 🍽 - 리뷰 작성</h2>
        <div class="newReview">
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
            <div>
                <label> 이미지 
                    <input type="file"/>
                </label>
            </div>
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
        },
        delReview: function() {
            console.log("clicked delReview")
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