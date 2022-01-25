import GymGradeLine from '@/models/GymGradeLine'

export const GymGradeLineConcern = {
  data () {
    return {
      gymGradeLine: null,
      loadingGymGradeLine: true
    }
  },

  created () {
    if (
      this.$route.params.gymGradeLineId &&
      this.$route.params.gymGradeId &&
      this.$route.params.gymId
    ) {
      this.getGymGradeLine()
    }
  },

  methods: {
    getGymGradeLine () {
      this.loadingGymGradeLine = true
      new GymGradeLine({ axios: this.$axios, auth: this.$auth })
        ._find(
          this.$route.params.gymId,
          this.$route.params.gymGradeId,
          this.$route.params.gymGradeLineId
        )
        .then((resp) => {
          this.gymGradeLine = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGradeLine')
        }).finally(() => {
          this.loadingGymGradeLine = false
        })
    }
  }
}
