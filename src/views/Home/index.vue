<template>
  <div id="appContainer" class="w-full h-full flex justify-center items-center">
    <div
      class="flex flex-col lg:flex-row items-center justify-center max-w-5xl py-4 mx-4 lg:mx-auto bg-lightseagreen-50 rounded border-solid border-4 border-lightseagreen-900"
    >
      <div class="p-4 flex flex-col justify-center items-center flex-1">
        <h2 class="font-semibold text-gray-800 text-2xl">
          Competições eliminatórias
        </h2>
        <p class="font-normal pt-4">
          Sorteie chaves de torneios e ligas eliminatórias ou mata-mata. Crie
          duplas de competidores em base de pontuações ou faça sorteio
          aleatório. Personalize as chaves do torneio ou liga de acordo com as
          suas necessidades, adicionando jogadores / equipas, encomendando os
          jogos e publicando-os em tempo real.
        </p>

        <button
          id="btn-new-competition"
          class="cursor-pointer p-5 bg-mediumslateblue-500 rounded mt-10 text-white font-medium transform-gpu hover:scale-110"
          @click="router.push({ name: 'CreateCompetition' })"
        >
          Criar Nova Competição
        </button>
      </div>
      <img
        class="rounded border-double border-lightseagreen-900 border-4 mx-4"
        src="../../assets/imagens/trofeu.jpg"
        alt="Troféu"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup () {
    const router = useRouter()

    return {
      router
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  max-width: 500px;
  width: 100%;
  height: auto;
}
#appContainer {
  background: url('../../assets/imagens/campo.jpg') no-repeat center center;
  background-size: cover;
}
</style>
