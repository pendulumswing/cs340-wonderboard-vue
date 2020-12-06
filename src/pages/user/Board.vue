<template lang="pug">
  div
    router-link(:to="`/users/${user.id}/boards/${board.id}`")
      v-card(:color="board.color")

        // Header
        v-card-title.pb-0
          div.title.white--text {{ board.name }}
          v-spacer

          // Edit User
          EditBoardButton(:user="user" :board="board").pr-2

          // Delete User
          DeleteBoardButton(:user="user" :board="board")

        v-card-text.text-start.white--text

          // Task Count
          v-row.no-gutters
            TaskCount(:lists="lists")

          // Attributes
          v-row
            v-expansion-panels(flat)
              v-expansion-panel.elevation-0
                v-expansion-panel-header(:color="board.color" @click.prevent).pl-5
                  span(:class="attributeClass").body-2 attributes
                  template(v-slot:actions)
                    v-icon(:class="attributeClass") $expand
                v-expansion-panel-content(:color="board.color" :class="attributeClass").text-start
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div id:
                    v-col
                      div {{ board.id }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div creator:
                    v-col
                      div {{ board.creator }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div name:
                    v-col
                      div {{ board.name }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div color:
                    v-col
                      div {{ board.color }}
</template>

<script>
import DeleteBoardButton from './DeleteBoardButton'
import EditBoardButton from './EditBoardButton'
import TaskCount from './TaskCount'

export default {
  name: 'board',

  components: {
    DeleteBoardButton,
    EditBoardButton,
    TaskCount
  },

  props: {
    board: {
      type: Object,
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showDeleteBoardDialog: false,
      showUpdateBoardDialog: false
    }
  },

  computed: {

    lists () {
      const lists = this.$store.state.lists.lists.filter(list => {
        return list.board === this.board.id
      })

      const listArray = []
      lists.forEach(list => {
        listArray.push(list.id)
      })
      return listArray
    },

    attributeClass () {
      return `${this.board.color.split(' ')[0]}--text text--darken-5`
    }
  }
}
</script>
