<template>
  <div class="hello">
    <div class="loginWrap">
      <div class="input_row">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="user.userid" />
      </div>
      <div class="input_row">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="user.userpw" />
      </div>
      <button @click="login" class="primary">로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {
        userid: "",
        userpw: "",
      }
    }
  },
  methods: {
    login: function (event) {
      this.$http
        .post("/api/users/login", {
          user: this.user,
        })
        .then(
          (res) => {
            //로그인 성공
            alert(res.data.message);
            this.$router.push("/");
          }
        )
        .catch((err) => {
          alert(err);
        });
    }
  }
};
</script>