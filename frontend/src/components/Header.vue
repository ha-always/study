<template>
  <div class="nav">
    <span class="navLink"><router-link to="/">Home</router-link></span>
    <span v-if="!didLogin" class="navLink"><router-link to="/login">Login</router-link></span>
    <span v-if="didLogin" class="navLink"><a href="javascript:;" @click="logout">Logout</a></span>
    <span v-if="!didLogin" class="navLink"><router-link to="/signUp">Sign Up</router-link></span>
    <span class="navLink"><router-link to="/store">Stores</router-link></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      didLogin: true,
    }
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      alert('로그아웃 되었습니다.')
      this.$router.go(0)
    }
  },
  created: function () {
    if (!window.sessionStorage.id && !window.sessionStorage.pw) { // 로그인 여부 체크
      this.didLogin = false
    } else {
      this.didLogin = true
    }
  }

}
</script>

<style>
.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.navLink:not(:last-child):after {
  content: '|';
  margin: 0 5px;
  color: #999;
}
</style>