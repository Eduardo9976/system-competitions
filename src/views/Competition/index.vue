<template>
  <loading  time="3000"/>
  <transition
    mode="in-out"
    appear
    class="animate__animated animate__zoomInRight animate__delay-3s"
  >
    <div class="start">
      <h1 class="font-bold text-white text-3xl text-center py-8">
        Seja bem vindo à primeira fase da {{ store.competition }}
      </h1>

      <div class="mx-auto p-4 max-w-screen-lg bg-brand-gray">
        <p>
          Fase 1
          {{ store.roundTrip ? '- Jogos de ida' : '' }} :
        </p>
        <ul class="py-2">
          <template v-for="(time, index) in store.randomTeams" :key="index">
            <li
              v-if="index % 2 == 0"
              class="border-2 py-6 flex justify-center items-center flex-col font-medium my-4"
            >
              <div class="flex justify-center">
                <p
                  class="time1 order-1 flex flex-col justify-center items-center py-4 text-center sm:text-right order-2 sm:block sm:w-80"
                >
                  {{ time }}
                  <span class="hidden sm:inline pr-2">- (Casa) </span>
                  <input
                    class="w-14 mx-2 py-4 text-center focus:outline-none"
                    min="0"
                    type="number"
                    id="result-time1"
                    placeholder="0"
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
                    class="w-14 mx-2 py-4 text-center order-2 sm:order-1 focus:outline-none"
                    min="0"
                    type="number"
                    id="result-time2"
                    placeholder="0"
                  />
                  <span class="hidden sm:inline">(Visitante) -</span>
                  {{ store.randomTeams[index + 1] }}
                </p>
              </div>
              <button
                class="py-2 mx-auto mt-4 bg-brand-info w-1/2 rounded-full text-white border-2 border-brand-info hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray transition-all duration-500 focus:outline-none"
              >
                Confirmar resultado
              </button>
            </li>
          </template>
        </ul>
      </div>

      <div
        v-if="store.roundTrip"
        class="mx-auto p-4 max-w-screen-lg bg-brand-gray mt-8"
      >
        <p>
          Fase 1
          {{ store.roundTrip ? '- Jogos de volta' : '' }} :
        </p>
        <ul class="py-2 w-full">
          <template v-for="(time, index) in store.randomTeams" :key="index">
            <li
              v-if="index % 2 == 0"
              class="border-2 py-6 flex justify-center items-center flex-col font-medium my-4"
            >
              <div class="flex justify-center">
                <p
                  class="time1 order-1 flex flex-col justify-center items-center py-4 text-center sm:text-right order-2 sm:block sm:w-80"
                >
                  {{ store.randomTeams[index + 1] }}
                  <span class="hidden sm:inline pr-2">- (Casa) </span>
                  <input
                    class="w-14 mx-2 py-4 text-center focus:outline-none"
                    min="0"
                    type="number"
                    id="result-time1"
                    placeholder="0"
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
                    class="w-14 mx-2 py-4 text-center order-2 sm:order-1 focus:outline-none"
                    min="0"
                    type="number"
                    id="result-time2"
                    placeholder="0"
                  />
                  <span class="hidden sm:inline">(Visitante)</span>
                  {{ time }}
                </p>
              </div>
              <button
                class="py-2 mx-auto mt-4 bg-brand-info w-1/2 rounded-full text-white border-2 border-brand-info hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray transition-all duration-500 focus:outline-none"
              >
                Confirmar resultado
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from '../../components/Loanding'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'

export default {
  name: 'Competition',
  components: { Loading },
  setup () {
    const store = useStore('Competition')
    const router = useRouter()

    onMounted(() => {
      if (
        (store.competition.length < 2,
        store.teams.length < 4,
        store.randomTeams.length < 4)
      ) {
        router.push({ path: '/' })
      }
    })

    return {
      store,
      router
    }
  }
}
</script>

<style lang="postcss" scoped>
.start {
  min-height: 100vh;
  background: url('../../assets/imagens/soccer-in-night.jpg') no-repeat center
    center;
  background-size: cover;
}
</style>
