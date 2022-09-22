<template>
    <div class="reviewDetail">
        <div v-for="(review, index) in reviews" :key="index">
          {{index + 1}}. {{users[review.user_id].userid}}의 평가 : {{review.content}}
        </div>
        <div class="newReview">
            <hr>
            <div class="title"><h3>새로운 리뷰를 아래에 작성하세요.</h3></div>
            <label>아이디
                <input type="text" name="userid" value=""/>
            </label>
            <textarea style="margin-top:20px" placeholder="음식의 맛, 가격, 웨이팅 여부 등"></textarea>
            <button class="primary">리뷰 올리기</button>
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
          reviews: {},
          users: {},
        }
      },
    created: function () {
        var id = this.$route.params.id;
        this.$http.get(`/api/reviews/${id}`)
            .then((response) => {
                this.reviews = response.data
            })

        this.$http.get("/api/users").then((response) => {
            this.users = response.data;
        });
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