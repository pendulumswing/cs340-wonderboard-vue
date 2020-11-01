<template lang="pug">
  div
    v-card
      v-card-title
        span.subtitle-2.grey--text.text--darken-2 {{ task.name }}
        v-spacer
        // Delete Task
        v-btn(
          color="grey white--text"
          x-small
          depressed
          icon
          @click.stop.prevent="deleteTask()"
        )
          v-icon(small) mdi-delete
      v-card-text
        div lists length: {{ lists.length }}
        div list: {{ list.id }}
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
            div description:
          v-col
            div {{ task.description }}

        // Buttons
        v-row.no-gutters
          v-col.d-flex.justify-end
            // Left Button
            v-btn(
              icon
              @click="moveLeft()"
            )
              v-icon(style="transform:rotate(-90deg)") mdi-triangle

            // Right Button
            v-btn(
              icon
              @click="moveRight()"
            )
              v-icon(style="transform:rotate(90deg)") mdi-triangle


</template>

<script>
// import DeleteBoardButton from './DeleteBoardButton'
// import EditBoardButton from './EditBoardButton'

export default {
  name: 'task',

  components: {
    // DeleteBoardButton,
    // EditBoardButton
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

  // computed: {
  //   list () {
  //     return this.$store.state.list.find(list => {
  //       return list.id === this.task.list
  //     })
  //   }
  // },

  methods: {
    moveRight () {
      if (this.list.index < this.lists.length) {
        // console.log('index: ', this.list.index, ' is < ', this.lists.length)
        const newList = this.lists.find(list => {
          return list.index === this.list.index + 1
        })
        // console.log('newList: ', newList.index)
        this.task.list = newList.id
      }
    },

    moveLeft () {
      if (this.list.index > 1) {
        // console.log('index: ', this.list.index, ' is ', this.lists.length)
        const newList = this.lists.find(list => {
          return list.index === this.list.index - 1
        })
        // console.log('newList: ', newList.index)
        this.task.list = newList.id
      }
    },

    deleteTask () {
      // TODO - make call to delete user here
      console.log('DELETE task submitted')
    },
  }
}
</script>
