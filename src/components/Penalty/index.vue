<template>
  <teleport to="body">
    <transition
      appear
      mode="in-out"
      class="animate__animated animate__zoomInRight"
    >
      <div
        class="fixed top-0 left-0 z-50 flex-col flex items-center justify-center w-full h-full bg-black bg-opacity-90"
      >
        <h1 class="font-bold text-white text-3xl text-center py-1">
          É Penalty Galvão!!!!!!
        </h1>
        <p class="font-medium text-white text-xl text-center py-8">
          Haja coração...
        </p>
        <div class="mx-auto p-4 max-w-screen-lg bg-brand-gray border-4 border-lightseagreen-400 rounded">
          <p class="font-medium">Penalidade Máxima!!</p>
          <ul class="py-2">
            <li
              class="border-2 py-6 flex justify-center items-center flex-col font-medium my-4"
            >
              <div class="flex justify-center">
                <p
                  class="time1 order-1 flex flex-col justify-center items-center py-4 text-center sm:text-right order-2 sm:block sm:w-80"
                >
                  {{ team1 }}
                  <span class="hidden sm:inline pr-2"> </span>
                  <input
                    @change="haveGoal($event.target)"
                    class="w-14 mx-2 py-4 text-center focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    id="result-time1"
                    placeholder="99"
                  />
                </p>
                <span
                  class="w-14 text-center flex justify-center items-center order-2 text-4xl"
                >
                  X
                </span>
                <p
                  class="time2 flex flex-col justify-center items-center py-4 text-center sm:text-left order-3 sm:block sm:w-80"
                >
                  <input
                    @change="haveGoal($event.target)"
                    class="w-14 mx-2 py-4 text-center order-2 sm:order-1 focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    id="result-time2"
                    placeholder="99"
                  />
                  <span class="hidden sm:inline"> </span>
                  {{ team2 }}
                </p>
              </div>
              <button
                @click="handleClick"
                id="`button"
                class="py-2 mx-auto mt-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray transition-all duration-500 focus:outline-none disabled:opacity-50"
              >
                Confirmar resultado
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'Penalty',
  props: {
    team1: { type: String, default: 'Time1' },
    team2: { type: String, default: 'Time2' }
  },
  emits: ['handlePenals'],
  setup (props, { emit }) {
    function haveGoal (event) {
      if (event.classList.contains('red')) {
        event.classList.remove('red', 'animate__shakeX')
      }
    }

    function handleClick (event) {
      if (
        (event.target.previousElementSibling.children[0].children[1].value ===
          '') &
        (event.target.previousElementSibling.children[2].children[0].value ===
          '')
      ) {
        event.target.previousElementSibling.children[0].children[1].classList.add(
          'red',
          'animate__shakeX'
        )
        event.target.previousElementSibling.children[2].children[0].classList.add(
          'red',
          'animate__shakeX'
        )
        return
      }
      if (
        event.target.previousElementSibling.children[0].children[1].value === ''
      ) {
        event.target.previousElementSibling.children[0].children[1].classList.add(
          'red',
          'animate__shakeX'
        )
        return
      }
      if (
        event.target.previousElementSibling.children[2].children[0].value === ''
      ) {
        event.target.previousElementSibling.children[2].children[0].classList.add(
          'red',
          'animate__shakeX'
        )
        return
      }

      if (
        event.target.previousElementSibling.children[0].children[1].value >
        event.target.previousElementSibling.children[2].children[0].value
      ) {
        emit('handlePenals', { win: props.team1, t1: props.team1, t1r: event.target.previousElementSibling.children[0].children[1].value, t2: props.team2, t2r: event.target.previousElementSibling.children[2].children[0].value })
      }
      if (
        event.target.previousElementSibling.children[0].children[1].value <
        event.target.previousElementSibling.children[2].children[0].value
      ) {
        emit('handlePenals', { win: props.team2, t1: props.team1, t1r: event.target.previousElementSibling.children[0].children[1].value, t2: props.team2, t2r: event.target.previousElementSibling.children[2].children[0].value })
      }
    }

    return {
      haveGoal,
      handleClick
    }
  }
}
</script>

<style lang="postcss" scoped>
.red {
  border-color: #f88676;
}
</style>
