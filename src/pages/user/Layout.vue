
<template lang="pug">
  div
    v-card.elevation-0
      v-card-title
        div
          router-link(to="/")
            span.grey--text Home
          span.grey--text.mx-1 :
          span.grey--text.text--darken-2 {{ user.first_name }} {{ user.last_name }}
        v-spacer
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateBoardDialog=true"
        ) Add Board
      v-card-text
        v-row
          v-col(v-for="board in boards" cols="4" md="3")
            router-link(:to="`/users/${user.id}/boards/${board.id}`")
              v-card(:color="board.color")
                v-card-title.pb-0
                  p.title.white--text {{ board.name }}
                v-card-text
                  span Tasks: {{ board.tasks }}
    span
    CreateBoardDialog(
      v-if="showCreateBoardDialog"
      @close="showCreateBoardDialog = false"
    )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateBoardDialog from '@/dialogs/board/Create'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateBoardDialog
  },

  data () {
    return {
      showCreateBoardDialog: false,
    }
  },

  computed: {
    user () {
      return this.$store.state.users.find(user => {
        return user.id === Number(this.$route.params.userId)
      })
    },

    boards () {
      return this.$store.state.boards
    }
  }
}
</script>

<style lang="scss">

</style>
