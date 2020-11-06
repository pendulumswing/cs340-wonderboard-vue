<template lang="pug">
  TaskUsers(
    :task="task"
    :user="user"
    :users="users"
    :list="list"
    :lists="lists"
    :taskUsers="taskUsers"
    :key="taskUsers.length"
  )
</template>

<script>
import { mapState } from 'vuex'
import TaskUsers from './TaskUsers'
import _ from 'lodash'

export default {
  name: 'taskIndex',

  components: {
    TaskUsers
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

  computed: {
    ...mapState({
      taskUsers () {
        return this.$store.state.taskUsers.taskUsers.filter(taskUser => {
          return taskUser.task === this.task.id
        })
      },

      users () {
        return this.$store.state.users.users
      }
    })
  }
}
</script>
