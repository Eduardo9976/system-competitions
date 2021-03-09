<template>
  <label for="title" class="font-bold mx-2 text-center text-lightseagreen-400">
    {{ title }}
  </label>
  <input
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :value="data"
    class="border-2 border-gray-100 py-4 px-2 w-full font-medium text-lightseagreen-900 placeholder-lightseagreen-200 mb-4"
    @blur="handleInput($event)"
  />

  {{ state.initialState }}
</template>

<script>
import { reactive } from 'vue'
export default {
  props: {
    title: { type: String, required: true },
    type: { type: String, default: 'text' },
    id: { type: [String, Number], required: true },
    placeholder: { type: String },
    data: { type: String, required: true }
  },
  emits: ['handleInput'],
  setup (props, { emit }) {
    const state = reactive({
      initialState: ''
    })
    function handleInput (event) {
      const key = props.id
      const value = event.target.value

      emit('handleInput', key, value)
    }

    return {
      state,
      handleInput
    }
  }
}
</script>
