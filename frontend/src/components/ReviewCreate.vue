<template>
    <div class="reviewDetail">
        <h2>π½ {{store.storeName}} π½ - λ¦¬λ·° μμ±</h2>
        <div class="newReview">
            <label>μμ΄λ
                <input type="text" name="userid" v-model="form.username"/>
            </label>
            <label> λ³μ 
                <select v-model="form.star">
                    <option :value="1">π§‘π€π€π€π€</option>
                    <option :value="2">π§‘π§‘π€π€π€</option>
                    <option :value="3">π§‘π§‘π§‘π€π€</option>
                    <option :value="4">π§‘π§‘π§‘π§‘π€</option>
                    <option :value="5">π§‘π§‘π§‘π§‘π§‘</option>
                </select>
            </label>
            <div>
                <form action="/api/reviews/imgUpload" method="post" enctype="multipart/form-data">
                <label><button @click="$refs.reviewImg.click()"> μ΄λ―Έμ§ μ ν</button> 
                    <input type="file" name="image" ref="reviewImg" @change="imgChanged" accept="image/*" multiple="multiple" style="display: none;">
                </label>
                <span>{{form.img.name}}</span>
                <button type="submit" class="primary">μ΄λ―Έμ§ μ¬λ¦¬κΈ°</button>
                </form>
            </div>
            <textarea style="margin-top:20px" placeholder="μμμ λ§, κ°κ²©, μ¨μ΄ν μ¬λΆ λ±" v-model="form.content"></textarea>
            <button class="primary" @click="createReview">λ¦¬λ·° μ¬λ¦¬κΈ°</button>
        </div>
        <div style="margin-top: 30px;">
            <router-link :to="`/store/${$route.params.id}`">BACK</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        createReview: function (event) {
            var id = this.$route.params.id;
            this.form.storeid = id
            console.log(this.form)
            this.$http.post("/api/reviews/create", {
                form: this.form
            })
                .then((res) => {
                    if (res.data.success == true) {
                        alert(res.data.message);
                        this.$router.go(-1);
                    }
                })
                .catch(function (error) {
                    alert("error");
                });
        },
        imgChanged: function () {
            console.log('img changed')
            this.form.img = this.$refs.reviewImg.files[0]
            console.log(this.form.img)
        },
        // imgUpload: function (file) {
        //     console.log('img upload...')

        //     const formData = new FormData();
        //     formData.append('file', file);
        //     const url = "/api/reviews/imgUpload";
        //     this.$http.post(url, formData,{
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }, onUploadProgress 
        //     });
        // }
    },
    data() {
        return {
          reviews: {},
          store: {},
          form: {
            username: '',
            storeid: '',
            star: '1',
            content: '',
            img: ''
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