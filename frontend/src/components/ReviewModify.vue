<template>
    <div class="reviewDetail">
        <h2>🍽 {{ store.storeName }} 🍽 - 리뷰 수정</h2>
        <div class="newReview">
            <label>아이디
                <input type="text" name="userid" v-model="form.username" />
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
            <div class="uploadWrap">
                <label><button @click="$refs.reviewImg.click()"> 이미지 선택</button>
                    <input type="file" name="image" ref="reviewImg" @change="imgChanged" accept="image/*"
                        style="display: none;">
                </label>
                <span>{{ images.name }}</span><a v-if="images.name" class="delBtn" href="javascript:;" @click="delImg">X</a>
            </div>
            <textarea style="margin-top:20px" placeholder="음식의 맛, 가격, 웨이팅 여부 등" v-model="form.content"></textarea>
            <button class="primary" @click="modiReview">리뷰 수정하기</button>
            <button class="primary" @click="delReview">리뷰 삭제하기</button>
        </div>
        <div style="margin-top: 30px;">
            <a href="javascript:;" @click="goBack()">BACK</a>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        modiReview: function (event) {
            let form = new FormData()
            var num = this.$route.params.num;
            form.append('image', this.$refs.reviewImg.files[0])
            form.append('star', this.form.star)
            form.append('content', this.form.content)
            form.append('id', num)
            for (let key of form.keys()) {
                console.log(key, ":", form.get(key));
            }
            this.$http.post('/api/reviews/update:' + num, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((res) => {
                    if (res.data.success == true) {
                        alert(res.data.message);
                        this.goBack()
                    }
                })
                .catch(err => console.log(err))
        },
        goBack: function () {
            this.$router.go(-1);
        },
        imgChanged: function () {
            this.images = this.$refs.reviewImg.files[0]
            console.log(this.images)
        },
        delReview: function () {
            var num = this.$route.params.num;
            if (!confirm("정말 삭제하시나요?")) {
                return
            } else {
                this.$http.delete(`/api/reviews/delete/${num}`, {})
                    .then((res) => {
                        if (res.data.success == true) {
                            alert(res.data.message);
                            this.goBack()
                        }
                    })
                    .catch(function (error) {
                        alert("error");
                    });
            }
        },
        delImg: function () {
            var num = this.$route.params.num;
            this.$http.post(`/api/reviews/delete/img/${num}`, {
                data: this.form.img
            })
                .then((res) => {
                    if (res.data.success == true) {
                        alert(res.data.message);
                    }
                })
                .catch(function (error) {
                    alert("error");
                });
        }
    },
    data() {
        return {
            store: {},
            images: {},
            form: {},
            id: this.$route.params.id
        }
    },
    created: function () {
        var id = this.$route.params.id;
        var num = this.$route.params.num;
        this.$http.get(`/api/reviews/${num}`)
            .then((res) => {
                this.form = res.data[0]
                this.images.name = this.form.img
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

.imgWrap {
    display: flex;
    justify-content: center;
    max-width: 150px;
    position: relative;
}

.imgWrap .button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    color: #fff;
}

.delBtn {
    margin-left: 10px;
    text-decoration: none;
    font-weight: bold;
    color: red;
}
</style>