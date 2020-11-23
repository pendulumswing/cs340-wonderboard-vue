<template lang="pug">
  // div(id="app")
  v-app
    // v-container
    v-container
      h1.text-center.pt-5.grey--text.text--darken-2 Wonderboard
      div(id="nav").pt-2.grey--text.text--darken-2
        // p {{ this.$store.state.users.users[0].id }}
        router-link(to="/") Users
        span  |
        router-link(:to="boardsUrl")  Boards
        span  |
        router-link(:to="listsUrl")  Lists
        span  |
        router-link(to="/dev")  Dev
        // API
          span  |
          router-link(to="/api") API Sample
      router-view
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      // boardsUrl: `/users/${this.$store.state.users.users[0].id || 1}`,
      // listsUrl: `/users/${this.$store.state.users.users[0].id || 1}/boards/${this.$store.state.boards.boards[0].id || 1}`
    }
  },

  mounted () {
    this.getUsers()
    this.getBoards()
  },

  computed: {
    boardsUrl () {
      if (this.$store.state.users.users.length > 0) {
        return `/users/${this.$store.state.users.users[0].id}`
      }
      return '/'
    },

    listsUrl () {
      if (this.$store.state.users.users.length > 0 && this.$store.state.boards.boards.length > 0) {
        return `/users/${this.$store.state.users.users[0].id || 1}/boards/${this.$store.state.boards.boards[0].id}`
      }
      return '/'
    },

    users () {
      return this.$store.state.users.users
    },

    boards () {
      return this.$store.state.boards.boards
    }
  },

  methods: {
    ...mapActions([
      'getUsers',
      'getBoards'
    ])
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
