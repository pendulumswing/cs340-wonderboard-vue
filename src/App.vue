<template lang="pug">
  // div(id="app")
  v-app
    // v-container
    v-container
      h1.text-center.pt-5.grey--text.text--darken-2 Wonderboard
      div(id="nav").pt-2.grey--text.text--darken-2
        router-link(to="/") Users
        span  |
        router-link(to="/users/1")  Boards
        span  |
        router-link(to="/users/1/boards/1")  Lists
        // API
          span  |
          router-link(to="/api") API Sample
      router-view
</template>

<script>
export default {

  computed: {
    users () {
      return this.$store.state.users.users
    },

    boards () {
      return this.$store.state.boards
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fbfbfb;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #616161;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#plus {
  padding: 0 20px 0 20px;
  display: inline-block;
  font-size: 50px;
  vertical-align: top;
  line-height: 100px;
}

</style>
