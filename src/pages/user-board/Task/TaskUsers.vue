<template lang="pug">
  div
    v-card
      v-card-title.pb-0
        v-col(cols="8").pa-0.d-flex.justify-start.align-start
          span.subtitle-1.grey--text.text--darken-2 {{ task.name }}
        v-col(cols="4").pa-0.d-flex.justify-end.align-end
          v-row.no-gutters.d-flex.justify-end.align-end

            // Edit Task
            EditTaskButton(
              :task="task"
              :lists="lists"
            )

            // Delete Task
            div.pa-0.ma-0
              v-btn(
                color="grey lighten-1 white--text"
                small
                depressed
                icon
                @click.stop.prevent="deleteTask()"
              )
                v-icon(small) mdi-delete

      v-card-text

        // Attributes
        v-expansion-panels(flat).pa-0
          v-expansion-panel.elevation-0.pa-0.grey--text
            v-expansion-panel-header.pa-0.body-2 attributes
            v-expansion-panel-content.text-start.pa-0
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div id:
                v-col
                  div {{ task.id }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div list:
                v-col
                  div {{ task.list }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="12" md="6" lg="4")
                  div description:
                v-col(cols="12" md="6" lg="4")
                  div {{ task.description }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div creator:
                v-col
                  div {{ task.creator }}

        // Description
        div.pb-3.text-start
          v-row.no-gutters
            v-col
              div.subtitle-2 description:
          v-row.no-gutters
            v-col.pl-5
              div {{ task.description }}

        // Assigned to
        div.text-start
          v-row.no-gutters
            v-col
              div.subtitle-2 assigned to:
          v-row.no-gutters
            v-col.pl-5
              v-row(v-for="user in assignedUsers").no-gutters
                span {{ user.first_name }} {{ user.last_name }}
                v-spacer
                v-btn(
                  color="grey lighten-1 white--text"
                  x-small
                  depressed
                  icon
                  @click.stop.prevent="onRemoveUser(user)"
                )
                  v-icon(small) mdi-minus
          v-row.no-gutters
            v-col.pl-1.pb-0
              v-select(
                v-show="assignedUsers.length < users.length"
                :items="unassignedUsers"
                label="add user"
                item-text2="[first_name, last_name]"
                return-object
                dense
                single-line
                prepend-inner-icon="mdi-plus"
                @change="onAddUser"
                height="20"
                solo
                flat
                append-icon=""
              ).pb-0
                template(v-slot:item="{ item }")
                  span {{ item.first_name }} {{ item.last_name }}

        // Buttons
        v-row.no-gutters
          v-col.d-flex.align-center
            // Left Button
            v-btn(
              v-show="hasListLeft()"
              icon
              @click="moveLeft()"
            )
              v-icon(style="transform:rotate(-90deg)" ) mdi-triangle

            v-spacer

            // Right Button
            v-btn(
              v-show="hasListRight()"
              icon
              @click="moveRight()"
            )
              v-icon(style="transform:rotate(90deg)") mdi-triangle


</template>

<script>
import { mapState } from 'vuex'
import EditTaskButton from './EditTaskButton'
import _ from 'lodash'

export default {
  name: 'taskUsers',

  components: {
    EditTaskButton
  },

  props: {
    task: {
      type: Object,
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    },
    users: {
      type: [Array, Object],
      default: undefined
    },
    list: {
      type: [Array, Object],
      default: undefined
    },
    lists: {
      type: [Array, Object],
      default: undefined
    },
    taskUsers: {
      type: [Array, Object],
      default: undefined
    }
  },

  data () {
    return {
      showDeleteBoardDialog: false,
      showUpdateBoardDialog: false,
    }
  },

  computed: {
    ...mapState({
      boards () {
        return this.$store.state.boards.boards.filter(board => {
          return _.find(this.boardUsers, { board: board.id })
        })
      },

      assignedUsers () {
        return this.$store.state.users.users.filter(user => {
          return _.find(this.taskUsers, { user: user.id })
        })
      },

      unassignedUsers () {
        return this.$store.state.users.users.filter(user => {
          return _.find(this.taskUsers, { user: user.id }) === undefined
        })
      }
    })
  },

  methods: {
    moveRight () {
      if (this.hasListRight()) {
        const newList = this.lists.find(list => {
          return list.index === this.list.index + 1
        })
        this.task.list = newList.id
      }
    },

    moveLeft () {
      if (this.hasListLeft()) {
        const newList = this.lists.find(list => {
          return list.index === this.list.index - 1
        })
        this.task.list = newList.id
      }
    },

    hasListRight () {
      return this.list.index < this.lists.length
    },

    hasListLeft () {
      return this.list.index > 1
    },

    onAddUser (user) {
      const id = this.$store.state.task_users.length + 1
      const payload = { id: id, task: this.task.id, user: user.id }
      this.$store.commit('addTaskUser', payload)
    },

    onRemoveUser (user) {
      const taskId = this.task.id
      const userId = user.id
      const payload = { taskId, userId }
      this.$store.commit('removeTaskUser', payload)
    },

    deleteTask () {
      // TODO - make call to delete user here
      console.log('DELETE task submitted')
    },
  }
}
</script>

<style scoped>
.v-input >>> .v-label {
  font-size: 0.9em;
}
</style>
