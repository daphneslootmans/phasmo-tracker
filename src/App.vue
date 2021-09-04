<template>
  <div id="app">
    <navbar></navbar>
    <tracker></tracker>
  </div>
</template>

<script>
import tracker from './components/tracker.vue'
import navbar from './components/navbar'

export default {
  name: 'App',
  components: {
    tracker, navbar
  }
}
</script>

<style lang="scss">
$enable-rounded: false;
$checked-color: #28a745;
$disabled-color: #dc3545;

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

body {
  color: #eee;
  background: #343a40;
}

#app {
  font-family: Mukta, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  &.light-mode {
    color: #0a0a0a;
  }
}

.slide-up-move {
  transition: transform 400ms;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 400ms;
}
.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.slide-up-leave-active {
  position: absolute;
}

.custom-control-label::before {
  background-color: #c1c3c5;
}

#evidence-group {
  .custom-control-input:checked ~ .custom-control-label::after {

  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: $checked-color;
    background-color: $checked-color;
  }
}

#evidence-disabled-group {
  .custom-control-input:checked ~ .custom-control-label::after {

  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: $disabled-color;
    background-color: $disabled-color;
  }
}
</style>
