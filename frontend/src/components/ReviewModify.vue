<template>
    <div class="reviewDetail">
        <h2>π½ {{store.storeName}} π½ - λ¦¬λ·° μμ </h2>
        <div class="newReview">
            <label>μμ΄λ
                <input type="text" name="userid" v-model="reviews.username"/>
            </label>
            <label> λ³μ 
                <select v-model="reviews.star">
                    <option :value="1">π§‘π€π€π€π€</option>
                    <option :value="2">π§‘π§‘π€π€π€</option>
                    <option :value="3">π§‘π§‘π§‘π€π€</option>
                    <option :value="4">π§‘π§‘π§‘π§‘π€</option>
                    <option :value="5">π§‘π§‘π§‘π§‘π§‘</option>
                </select>
            </label>
            <div>
                <label> μ΄λ―Έμ§ 
                    <input type="file"/>
                </label>
            </div>
            <textarea style="margin-top:20px" placeholder="μμμ λ§, κ°κ²©, μ¨μ΄ν μ¬λΆ λ±" v-model="reviews.content"></textarea>
            <button class="primary" @click="modiReview">λ¦¬λ·° μμ νκΈ°</button>
            <button class="primary" @click="delReview">λ¦¬λ·° μ­μ νκΈ°</button>
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
            if (!confirm("μ λ§ μ­μ νμλμ?")) {
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