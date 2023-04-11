<template>
    <div class="storeDetail">
        <h2>🍽 {{ store.storeName }} 🍽</h2>
        <!-- <strong>[ 메뉴 리스트 ]</strong>
        <div v-for="(menu, index) in menus" :key="index">
            {{ index + 1 }}.{{ menu.menuName }}
        </div> -->
        <div v-if="reviews.length == 0">아직 이 가게의 리뷰가 1도 없습니다. 어서 작성해보세요.</div>
        <div class="boardWrap">
            <ul>
                <li>No.</li>
                <li>이름</li>
                <li>평가</li>
                <li>평가</li>
            </ul>
            <ul v-for="(review, idx) in reviews">
                <li>{{ idx + 1 }}</li>
                <li>{{ review.username }}</li>
                <li>
                    <span v-for="cnt in 5">
                        {{ cnt <= review.star ? '🧡' : '🤍' }} </span>
                </li>
                <li>
                    <button @click="moveDetail(idx)"> 자세히 보기 </button>
                </li>
            </ul>
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
        moveDetail: function (idx) {
            var id = this.$route.params.id;
            var num = this.reviews[idx].review_id;
            this.$router.push({ name: 'reviewDetail', params: { id, num } })
        },
        delReview: function (idx) {
            var num = this.reviews[idx].review_id;
            if (!confirm("정말 삭제하시나요?")) {
                return
            } else {
                this.$http.delete(`/api/reviews/delete/${num}`, {})
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
.boardWrap {
    margin: 30px auto;
}
.boardWrap ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 0px;
    margin: 0;
}

.boardWrap ul li {
    width: 250px;
    min-height: 50px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
}


.boardWrap ul:first-child {
    font-weight: bold;
}
</style>