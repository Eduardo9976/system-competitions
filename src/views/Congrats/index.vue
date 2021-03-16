<template>
  <transition
    appear
    mode="in-out"
    class="animate__animated animate__zoomInRight"
  >
    <div class="congrats px-2" v-if="store.winner.length > 1">
      <h1 class="font-bold text-white text-3xl text-center py-8 px-2">
        Dias de luta, dias de glória(pelo menos para alguns.) 😂 😂 💪
      </h1>
      <div
        class="text-center flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center py-8 px-2 mt-6 max-w-screen-lg bg-brand-gray mx-auto rounded border-4 border-lightseagreen-400"
      >
        <div class="mx-auto self-start py-2 lg:py-8">
          <h4 class="font-medium text-left text-xl px-2">
            Parábens os times abaixo avançam na competição:
          </h4>
          <ul class="my-8 text-left px-8 list-disc list-outside">
            <li v-for="team in store.winner" :key="team" class="font-medium">
              {{ team }}
            </li>
          </ul>
        </div>

        <img
          src="../../assets/imagens/comemorar.jpg"
          alt="Jogadores comemorando"
        />

        <div class="mx-auto self-start py-2 lg:py-8">
          <h4 class="font-medium text-left text-xl px-2 custom-h">
            Para alguém ganhar outro alguém precisa perder e no dia de hoje os
            times abaixo foram eliminados:
          </h4>
          <ul class="my-8 text-left px-8 list-disc list-outside">
            <li v-for="team in store.losers" :key="team" class="font-medium">
              {{ team }}
            </li>
          </ul>
        </div>

        <img src="../../assets/imagens/derrota.jpg" alt="Jogadores tristes" />
      </div>
      <div
        id="next"
        class="text-center py-8 mt-6 max-w-screen-lg bg-lightseagreen-900 mx-auto rounded"
      >
        <p class="font-medium text-white sm:text-xl text-center">
          Esperamos vocês na próxima fase...
        </p>
        <button
          @click="next"
          class="font-medium py-2 mx-auto my-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-50 hover:bg-brand-gray transition-all duration-500 focus:outline-none transform-gpu hover:scale-110"
        >
          Avançar
        </button>
      </div>
    </div>
    <div class="congrats px-2" v-else>
      <h1 class="font-bold text-white text-3xl text-center py-8 px-2">
        Dias de luta, dias de glória(pelo menos para alguns.) 😂 😂 💪
      </h1>
      <div
        class="text-center flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center py-8 px-2 mt-6 max-w-screen-lg mx-auto rounded"
      >
        <h4
          class="block w-full font-medium text-center text-xl px-2 py-4 text-white bg-lightseagreen-900 mx-auto rounded"
        >
          Não deu para o {{ store.losers[0] }} o {{ store.winner[0] }} é o
          grande Campeão da(o) {{ store.competition }} !!!
        </h4>
        <p
          class="block w-full font-medium text-center text-xl px-2 py-4 text-white bg-lightseagreen-400 mx-auto rounded"
        >
          A glória é toda sua {{ store.winner[0] }}
        </p>
        <img
          class="campeao"
          src="../../assets/imagens/campeao.png"
          alt="Troféu Campeão"
        />
        <p
          class="block w-full font-medium text-center text-xl px-2 py-4 text-white bg-lightseagreen-400 mx-auto rounded"
        >
          {{ store.winner[0] }} CAMPEÃO!!!
        </p>
      </div>
      <div
        id="next"
        class="text-center py-8 mt-6 max-w-screen-lg bg-lightseagreen-900 mx-auto rounded"
      >
        <p class="font-medium py-4 text-white sm:text-xl text-center">
          Receba seu prêmio diretamente das mãos da(o) {{ store.productOwner }}.
        </p>
        <p class="font-medium text-white sm:text-xl text-center">
          Muito obrigado por utilizar nossos sistemas.
        </p>
        <button
          @click="next"
          class="font-medium py-2 mx-auto my-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-50 hover:bg-brand-gray transition-all duration-500 focus:outline-none transform-gpu hover:scale-110"
        >
          Finalizar
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import useStore from '../../hooks/useStore'
import { setRandomTeams } from '../../store/competition'
import { randomTeams } from '../../utils/randomTeams.js'

import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
  name: 'Congrats',
  setup () {
    const store = useStore('Competition')
    const router = useRouter()

    onMounted(() => {
      if (store.winner.length < 1 || store.losers.length < 1) {
        router.push({ path: '/' })
      }
    })

    function next () {
      const newRandomTeams = randomTeams(store.winner)
      setRandomTeams(newRandomTeams)
      router.push({ name: 'Competition' })
    }
    return {
      store,
      next
    }
  }
}
</script>

<style lang="postcss" scoped>
.congrats {
  min-height: 100%;
  background: url('../../assets/imagens/bg-congrats.jpg') no-repeat center
    center;
}
.custom-h {
  max-width: 42ch;
}
img {
  @apply rounded border-double border-lightseagreen-400 border-4;
  max-width: 400px;
  width: 100%;
  height: 266px;
  margin: 20px 0px;
}
@media screen and (max-width: 500px) and (min-width: 10px) {
  img {
    max-width: 100%;
    height: auto;
    border: 3px solid red;
  }
}
#next {
  background: linear-gradient(to top, transparent 5%, #1b3d3c 20%);
}
.campeao {
  display: block;
  margin: 0 auto;
  padding: 20px;
  max-width: 50%;
  height: auto;
  border: none;
  position: relative;
}
</style>
