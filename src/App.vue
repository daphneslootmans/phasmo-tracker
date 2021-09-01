<template>
  <div id="app">
    <tracker></tracker>
  </div>
</template>

<script>
import tracker from './components/tracker.vue'

export default {
  name: 'App',
  components: {
    tracker
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
