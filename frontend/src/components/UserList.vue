<template>
  <div class="userList">
    <div v-for="(user, index) in users" :key="index" class="userWrap">
      <ul>
        <li><span>{{ index + 1 }}. </span>{{ user.userid }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.userWrap {
  width: 150px;
  margin: 0 auto;
}

.userWrap ul {
  list-style: none;
  text-align: left;
}
</style>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.$http.get("/api/users").then((response) => {
      this.users = response.data;
    });
  }
};
</script>
 