<template lang="pug">
  div
    v-row.no-gutters.text-start
      v-col
        div.subtitle-1 Members:
    v-row.no-gutters.text-start.pl-3
      v-col
        v-row(v-for="user in assignedUsers").no-gutters
          span {{ user.first_name }} {{ user.last_name }}
          v-spacer
          v-btn(
            v-show="user.id !== board.creator"
            color="grey lighten-1 white--text"
            x-small
            depressed
            icon
            @click.stop.prevent="onRemoveUser(user)"
          )
            v-icon(small) mdi-minus
    v-row.no-gutters
      v-col.pb-0
        v-select(
          v-show="assignedUsers.length < users.length"
          :items="unassignedUsers"
          label="add member"
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
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'boardUsers',

  props: {
    board: {
      type: Object,
      default: undefined
    },
    boards: {
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
    },
    boardUsers: {
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
    ...mapState({
      assignedUsers () {
        return this.$store.state.users.users.filter(user => {
          return _.find(this.boardUsers, { user: user.id })
        })
      },

      unassignedUsers () {
        return this.$store.state.users.users.filter(user => {
          return _.find(this.boardUsers, { user: user.id }) === undefined
        })
      }
    }),

    ...mapGetters({
      getBoardUsersAutoId: 'getBoardUsersAutoId'
    })
  },

  methods: {
    ...mapActions([
      'createBoardUser',
      'deleteBoardUser'
    ]),

    onAddUser (user) {
      const id = this.getBoardUsersAutoId + 1
      const payload = { id: id, board: this.board.id, user: user.id }
      this.createBoardUser(payload)
    },

    onRemoveUser (user) {
      const boardId = this.board.id
      const userId = user.id
      const payload = { boardId, userId }
      this.deleteBoardUser(payload)
    }
  }
}
</script>

<style scoped>
.v-input >>> .v-label {
  font-size: 0.9em;
}
</style>
