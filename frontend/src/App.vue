<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

button {
    padding: 5px 20px;
    margin: 5px;
    background: #fff;
    border: 1px solid;
}

button:hover {
    opacity: 0.5;
    cursor: pointer;
}

button.primary {
    background: #42b983;
    border: none;
    color: #fff;
}

</style>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
  
}
</script>