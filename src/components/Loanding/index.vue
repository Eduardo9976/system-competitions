<template>
  <div
    v-if="state.isLoading"
    class="bg-cornflowerblue-50 my-72 mx-auto w-14 h-14 rounded-full border-l-4 border-t-4 border-lightseagreen-700 animate-spin"
  ></div>
</template>

<script>
import { onMounted, reactive } from 'vue'

export default {
  props: {
    time: { type: [String, Number], default: 2000 }
  },
  setup (props) {
    const state = reactive({
      isLoading: true
    })

    function loadingOff (time) {
      setTimeout(() => {
        state.isLoading = false
      }, time)
    }

    onMounted(() => {
      loadingOff(props.time)
    })

    return {
      state,
      loadingOff
    }
  }
}
</script>
