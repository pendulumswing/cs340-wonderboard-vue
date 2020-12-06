export default {
  props: {
    noEnter: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      show: true,
      request: undefined,
      data: {},
      error: false,
      errorMessage: ''
    }
  },

  computed: {
    /* eslint-disable key-spacing */
    // ...mapState({
    //   _request: function (state) {
    //     if (this.request) {
    //       return this.getRequest(this.request)
    //     }
    //   }
    // })
  },

  watch: {
    _request: function (newModel, oldModel) {

    }
  },

  mounted () {
    // Submit form on pressing 'Enter'
    // SOURCE: https://github.com/vuetifyjs/vuetify/issues/1545
    if (!this.noEnter) {
      window.addEventListener('keyup', this.onEnter)
    }

    // Close dialog on pressing 'Esc'
    window.addEventListener('keyup', this.onEsc)
  },

  methods: {
    onClose () {
      this.removeEventListeners()
      this.show = false
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    },

    getRequest (request) {

    },

    onSuccess () {

    },

    // eslint-disable-next-line handle-callback-err
    onError (error, errorMessage) {

    },

    onSubmit () {

    },

    onEnter (event) {
      const that = this
      if (event.key === 'Enter') {
        that.onSubmit()
      }
    },

    onEsc (event) {
      const that = this
      if (event.key === 'Escape') {
        that.onClose()
      }
    },

    removeEventListeners () {
      window.removeEventListener('keyup', this.onEnter)
      window.removeEventListener('keyup', this.onEsc)
    }
  }
}
