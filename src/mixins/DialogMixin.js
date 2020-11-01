import { mapState } from 'vuex'

function getErrorMessage (error) {
  const keys = Object.keys(error)
  const key = keys[0]

  if (key) {
    return `${key}: ${error[key][0]}`
  }

  return 'Unknown error'
}

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
      // if (newModel.state === PayloadStates.RESOLVED ||
      //   newModel.state === PayloadStates.DELETING ||
      //   newModel.state === PayloadStates.DELETED) {
      //   this.onSuccess()
      //   this.onClose()
      // }
      // if (
      //   newModel.state === PayloadStates.ERROR_CREATING ||
      //   newModel.state === PayloadStates.ERROR_UPDATING ||
      //   newModel.state === PayloadStates.ERROR_DELETING
      // ) {
      //   this.error = true
      //   this.errorMessage = getErrorMessage(newModel.error)
      //   this.onError(newModel.error, this.errorMessage)
      // }
    }
  },

  mounted () {
    const that = this

    // Submit form on pressing 'Enter'
    // SOURCE: https://github.com/vuetifyjs/vuetify/issues/1545
    if (!this.noEnter) {
      window.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          that.onSubmit()
        }
      })
    }

    // Submit form on pressing 'Escape'
    window.addEventListener('keyup', function (event) {
      if (event.key === 'Escape') {
        that.onClose()
      }
    })
  },

  methods: {
    onClose () {
      this.show = false
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    },
    getRequest (request) {

    },
    onSuccess () {

    },
    onError (error, errorMessage) {

    },
    onSubmit () {

    }
  }
}
