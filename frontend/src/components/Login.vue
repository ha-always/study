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
            if(res.data.success) {    //로그인 성공
              alert(res.data.message);
              window.sessionStorage.setItem("id", res.data.user.id)
              window.sessionStorage.setItem("pw", res.data.user.pw)
              this.$router.push("/");
              this.$router.go(0)
            } else {    //로그인 실패
              alert(res.data.message);
              return
            }
          }
        )
        .catch((err) => {
          alert(err);
        });
    }
  }
};
</script>