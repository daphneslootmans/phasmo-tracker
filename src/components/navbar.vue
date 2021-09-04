<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Phasmophobia Evidence Tracker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-checkbox v-model="lightMode" name="check-light-mode" switch class="mr-3">
              Light Mode
            </b-form-checkbox>
            <b-form-checkbox v-model="ghostInfo" name="check-ghost-info" switch>
              Ghost Info
            </b-form-checkbox>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {},
  data () {
    return {}
  },
  computed: {
    ghostInfo: {
      get () {
        return this.$store.state.ghostInfo
      },
      set () {
        this.$store.commit('toggleGhostInfo')
      }
    },
    lightMode: {
      get () {
        return this.$store.state.lightMode
      },
      set () {
        this.$store.commit('toggleLightMode')
      }
    }
  },
  methods: {
  },
  watch: {}
}
</script>

<style scoped lang="scss">
.navbar {
  border-bottom: 1px solid #1b1b1b;
}
</style>