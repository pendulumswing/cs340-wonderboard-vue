<template lang="pug">
  div
    v-row.no-gutters.text-start
      v-col
        div.subtitle-1 Members:

    // Assigned Members
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

    // Drop-Down Menu Select
    v-row.no-gutters
      v-col.pb-0
        v-select(
          v-show="assignedUsers.length < users.length"
          :items="unassignedUsers"
          label1="add member"
          return-object
          dense
          single-line
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
            span.grey--text add member
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    })
  },

  methods: {
    ...mapActions([
      'createBoardUser',
      'deleteBoardUser'
    ]),

    onAddUser (user) {
      const payload = { board: this.board.id, user: user.id }
      this.createBoardUser(payload)
    },

    onRemoveUser (user) {
      const payload = this.boardUsers.find(boardUser => {
        return boardUser.user === user.id
      })
      this.deleteBoardUser(payload)
    }
  }
}
</script>

<style scoped>
.v-input >>> .v-label {
  font-size: 0.9em;
}
>>> .v-input__icon--prepend-inner .v-icon {
  color: #BDBDBD;
}
</style>
