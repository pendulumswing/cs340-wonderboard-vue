<template lang="pug">
  div
    v-card
      v-card-title.pb-0
        v-col(cols="8").pa-0.d-flex.justify-start.align-start
          span.title.grey--text.text--darken-2 {{ task.name }}
        v-col(cols="4").pa-0.d-flex.justify-end.align-end
          v-row.no-gutters.d-flex.justify-end.align-end

            // Edit Task
            EditTaskButton(
              :task="task"
              :lists="lists"
              :users="users"
            )

            // Delete Task
            div.pa-0.ma-0
              v-btn(
                color="grey lighten-1 white--text"
                small
                depressed
                icon
                @click.once="onSubmitDelete"
              )
                v-icon(small) mdi-delete

      v-card-text
        // Creator
        div.pt-3.pb-0.text-start
          v-row.no-gutters
            v-col
              div.subtitle-2 creator:
          v-row.no-gutters
            v-col.pl-5
              div {{ taskCreator }}

        // Description
        div.py-3.text-start
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
                return-object
                dense
                single-line
                item-color="grey"
                prepend-inner-icon="mdi-plus"
                @change="onAddUser"
                height="20"
                solo
                flat
                append-icon=""
              ).pb-0.grey--text.text--lighten-1
                template(v-slot:item="{ item }")
                  span.grey--text {{ item.first_name }} {{ item.last_name }}
                template(v-slot:label)
                  span.grey--text add user

        // Attributes
        v-expansion-panels(flat).pa-0
          v-expansion-panel.elevation-0.pa-0.grey--text.text--lighten-1
            v-expansion-panel-header.pa-0.body-2
              span.body-2 attributes
              template(v-slot:actions)
                v-icon(class="grey--text").text--lighten-1 $expand
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
                v-col(cols="6" md="5" lg="4")
                  div creator:
                v-col
                  div {{ task.creator }}
              v-row.no-gutters
                v-col(cols="6" md="6" lg="4")
                  div description:
                v-col
                  div {{ task.description }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div creator:
                v-col
                  div {{ task.creator }}

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
import { mapActions, mapGetters } from 'vuex'
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
      showUpdateBoardDialog: false
    }
  },

  computed: {
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
    },

    taskCreator () {
      if (!this.task.creator) {
        return 'Null'
      }
      const user = this.$store.state.users.users.find(user => {
        return user.id === this.task.creator
      })
      return `${user.first_name} ${user.last_name}`
    },

    ...mapGetters({
      getTaskUsersAutoId: 'getTaskUsersAutoId'
      // getTaskUsersLength: 'getTaskUsersLength',
      // getTaskUsersNextId: 'getTaskUsersNextId'
    })
  },

  methods: {
    ...mapActions([
      'deleteTask',
      'createTaskUser',
      'deleteTaskUser',
      'updateTask'
    ]),

    // TODO - Update to use store
    moveRight () {
      if (this.hasListRight()) {
        const targetList = this.lists.find(list => {
          return list.index === this.list.index + 1
        })
        this.task.list = targetList.id
        this.updateTask(this.task)
      }
    },

    moveLeft () {
      if (this.hasListLeft()) {
        const targetList = this.lists.find(list => {
          return list.index === this.list.index - 1
        })
        this.task.list = targetList.id
        this.updateTask(this.task)
      }
    },

    hasListRight () {
      return this.list.index < this.lists.length
    },

    hasListLeft () {
      return this.list.index > 1
    },

    onAddUser (user) {
      // console.log('taskUsersNextId: ', this.getTaskUsersNextId)
      // const taskUserId = this.getTaskUsersAutoId + 1
      const payload = { task: this.task.id, user: user.id }
      this.createTaskUser(payload)
    },

    onRemoveUser (user) {
      // const payload = { task: this.task.id, user: user.id }
      // // TODO - find taskUser id
      const payload = this.taskUsers.find(taskUser => {
        return taskUser.user === user.id
      })
      this.deleteTaskUser(payload)
    },

    onSubmitDelete () {
      // TODO - make call to delete user here
      this.deleteTask(this.task)
      console.log('DELETE task submitted')
    }
  }
}
</script>

<style scoped>
.v-input >>> .v-label {
  font-size: 0.9em;
}
</style>

<style scoped>
.v-expansion-panel >>> .v-expansion-panel-content__wrap {
  padding: 1px !important;
}

>>> .v-input__icon--prepend-inner .v-icon {
  color: #BDBDBD;
}
</style>
