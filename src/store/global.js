import { reactive } from 'vue'

const state = reactive({
  isLoading: false,
  isConfirm: false
})

export default state

export function setGlobalLoading (status) {
  state.isLoading = status
}

export function setGlobalConfirm (status) {
  state.isConfirm = status
}
