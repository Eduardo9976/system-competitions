<template>
  <teleport to="body">
    <transition
      appear
      mode="in-out"
      class="animate__animated animate__zoomInRight"
    >
      <div
        class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      >
        <div
          class="flex flex-col justify-center items-center text-center bg-white rounded p-4 border-2 border-brand-warning m-4"
        >
          <p class="font-medium text-2xl text-lightseagreen-900">
            {{ title }}
          </p>
          <small class="text-brand-warning">
            {{ atentionText }}
          </small>

          <div class="flex flex-row flex-wrap justify-center items-center">
            <button
              @click.stop.prevent="() => $emit('handleAnswer', true)"
              class="m-3 w-28 p-2 font-medium text-white text-xl rounded focus:outline-none bg-brand-success border-2 border-brand-success hover:border-lightseagreen-900 hover:text-lightseagreen-900 transition-all duration-500"
            >
              {{ confirmButton }}
            </button>
            <button
              @click="() => $emit('handleAnswer', false)"
              class="m-3 w-28 p-2 font-medium text-white text-xl rounded focus:outline-none bg-brand-danger border-2 border-brand-danger hover:border-lightseagreen-900 hover:text-lightseagreen-900 transition-all duration-500"
            >
              {{ cancelButton }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'ModalConfirm',
  props: {
    title: { type: String, default: 'Deseja confirmar está operação?' },
    atentionText: {
      type: String,
      default:
        'Atenção, após confirmar não será possível desfazer as alterações'
    },
    confirmButton: { type: String, default: 'Confirmar' },
    cancelButton: { type: String, default: 'Cancelar' }
  },
  emits: ['handleAnswer'],
  setup (props, { emit }) {
    return {
      emit
    }
  }
}
</script>
