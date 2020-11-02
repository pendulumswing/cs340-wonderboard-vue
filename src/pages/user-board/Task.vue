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
          v-row.no-gutters.flex-nowrap.text-start
            div.subtitle-2 description:
            div {{ task.description }}

          // Assigned to
          v-row.no-gutters.flex-nowrap.text-start
            div.subtitle-2 assigned to:
            div {{ task.description }}

        // Buttons
        v-row.no-gutters
          v-col.d-flex.align-center
            // Left Button
            v-btn(
              v-show="hasListLeft()"
              icon
              @click="moveLeft()"
            )
              v-icon(style="transform:rotate(-90deg)") mdi-triangle

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
// import DeleteBoardButton from './DeleteBoardButton'
import EditTaskButton from './EditTaskButton'
import _ from 'lodash'

export default {
  name: 'task',

  components: {
    // DeleteBoardButton,
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
    list: {
      type: [Array, Object],
      default: undefined
    },
    lists: {
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
    boards () {
      return this.$store.state.boards.filter(board => {
        return _.find(this.boardUsers, { board: board.id })
      })
    },

    taskusers () {
      return this.$store.state.task_users.filter(taskUser => {
        return taskUser.task === this.task.id
      })
    },
  },

  methods: {
    moveRight () {
      if (this.hasListRight()) {
        // console.log('index: ', this.list.index, ' is < ', this.lists.length)
        const newList = this.lists.find(list => {
          return list.index === this.list.index + 1
        })
        // console.log('newList: ', newList.index)
        this.task.list = newList.id
      }
    },

    moveLeft () {
      if (this.hasListLeft()) {
        // console.log('index: ', this.list.index, ' is ', this.lists.length)
        const newList = this.lists.find(list => {
          return list.index === this.list.index - 1
        })
        // console.log('newList: ', newList.index)
        this.task.list = newList.id
      }
    },

    hasListRight () {
      return this.list.index < this.lists.length
    },

    hasListLeft () {
      return this.list.index > 1
    },

    deleteTask () {
      // TODO - make call to delete user here
      console.log('DELETE task submitted')
    },
  }
}
</script>
