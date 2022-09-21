<template>
    <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/signUp">Sign Up</router-link> |
        <router-link to="/store">Stores</router-link>
    </div>
</template>

<script>
export default {

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
</style>