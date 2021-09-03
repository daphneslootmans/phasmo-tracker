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
$enable-rounded: false;
$checked-color: #28a745;
$disabled-color: #dc3545;

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

#app {
  font-family: Mukta, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0a0a0a;
  margin-top: 20px;
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
