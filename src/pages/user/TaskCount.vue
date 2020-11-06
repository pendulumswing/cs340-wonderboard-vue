<template lang="pug">
  v-row.no-gutters
    v-col(cols="12" md="5" lg="4")
      div tasks:
    v-col
      div {{ tasks.length }}
</template>

<script>

export default {
  name: 'taskCount',

  props: {
    lists: {
      type: Array,
      default: undefined
    }
  },

  computed: {
    tasks () {
      return this.$store.state.tasks.tasks.filter(task => {
        return this.lists.includes(task.list)
      })
    }
  },
}
</script>
