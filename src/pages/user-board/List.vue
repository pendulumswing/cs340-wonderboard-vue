<template lang="pug">
  div
    v-card(:color="list.color" min-height="800").mb-4
      v-card-title.pb-0
        span.title.white--text {{ list.name }}
        v-spacer

        // Edit User
        EditListButton(:list="list" :lists="lists" :users="users").pr-2

        // Delete User
        DeleteListButton(:list="list" :lists="lists")

      v-card-text

        // Attributes
        v-expansion-panels(flat)
          v-expansion-panel.elevation-0
            v-expansion-panel-header(:color="list.color" @click.prevent).pl-5
              span(:class="attributeClass").body-2 attributes
              template(v-slot:actions)
                v-icon(:class="attributeClass") $expand
            v-expansion-panel-content(:color="list.color" :class="attributeClass").text-start
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div id:
                v-col
                  div {{ list.id }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div board:
                v-col
                  div {{ list.board }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div creator:
                v-col
                  div {{ list.creator || 'NULL' }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div index:
                v-col
                    div {{ list.index }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div name:
                v-col
                  div {{ list.name }}

        // Tasks
        v-card(v-for="task in tasks")
          Task(
            :key="task.creator"
            :user="user"
            :task="task"
            :list="list"
            :lists="lists"
          ).my-3
</template>

<script>
import Task from './Task/index'
import DeleteListButton from './DeleteListButton'
import EditListButton from './EditListButton'
import _ from 'lodash'

export default {
  name: 'list',

  components: {
    Task,
    DeleteListButton,
    EditListButton
  },

  props: {
    list: {
      type: Object,
      default: undefined
    },
    lists: {
      type: [Array, Object],
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    },
    users: {
      type: [Array, Object],
      default: undefined
    }
  },

  computed: {
    attributeClass () {
      return `${this.list.color.split(' ')[0]}--text text--darken-5`
    },

    tasks () {
      return this.$store.state.tasks.tasks.filter(task => {
        return task.list === this.list.id
      })
    },

    taskUsers () {
      return this.$store.state.taskUsers.taskUsers.filter(taskUser => {
        return taskUser.task === Number(this.$route.params.userId)
      })
    },

    boards () {
      return this.$store.state.boards.boards.filter(board => {
        return _.find(this.boardUsers, { board: board.id })
      })
    }

  }
}
</script>
