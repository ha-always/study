<template>
  <div class="app">
    <div class="loginWrap">
      <div class="input_row">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="user.userid" />
      </div>
      <div class="input_row">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="user.userpw" />
      </div>
      <button @click="signUp" class="primary">가입하기</button>
    </div>
  </div>
</template>
<script>
export default {
methods: {
    signUp: function (event) {
      if (!this.user.userid) {
          alert("아이디를 입력하세요.");
          return
      }
      if (!this.user.userpw) {
          alert("비밀번호를 입력하세요.");
          return
      }
      console.log(this.user)
      this.$http.post("/api/users/signUp", {
          user: this.user,
        })
        .then((res) => {
          if (res.data.success == true) {
            alert(res.data.message);
            this.$router.push("/login");
          }
          if (res.data.success == false) {
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
      user: {
        userid: "",
        userpw: "",
      },
    }
  }
}
</script>