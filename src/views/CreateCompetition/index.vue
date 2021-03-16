<template>
  <transition appear mode="in-out" class="animate__animated animate__zoomInUp">
    <div class="viewForms">
      <h1 class="font-bold text-center text-3xl py-10 text-white">
        Crie uma nova competição
      </h1>

      <form
        class="border-4 border-lightseagreen-400 rounded max-w-5xl mx-auto p-3"
        @submit.prevent="generateCompetition"
      >
        <h3 class="font-bold text-lightseagreen-900 text-2xl text-center pb-8">
          Informe os dados
        </h3>

        <label
          for="title"
          class="font-bold mx-2 text-center text-lightseagreen-400"
        >
          Nome do Campeonato
        </label>
        <input
          type="text"
          id="titulo"
          placeholder="Taça das bolinhas"
          class="border-2 border-gray-100 py-4 px-2 w-full font-medium text-lightseagreen-900 placeholder-lightseagreen-200 mb-4 animate__animated"
          v-model="state.title"
          required
          @blur="handleChange($event)"
        />

        <label
          for="title"
          class="font-bold mx-2 text-center text-lightseagreen-400"
        >
          Nome do Organizador
        </label>
        <input
          type="text"
          id="productOwner"
          placeholder="João Havelange"
          class="border-2 border-gray-100 py-4 px-2 w-full font-medium text-lightseagreen-900 placeholder-lightseagreen-200 mb-4 animate__animated"
          v-model="state.productOwner"
          required
          @blur="handleChange($event)"
        />
        <label
          for="qtd"
          class="font-bold mx-2 text-center text-lightseagreen-400 diff-label"
        >
          Qtd Times
        </label>
        <div
          class="flex flex-col sm:flex-row justify-center items-center font-medium text-lightseagreen-900 w-full"
        >
          <select
            id="qtd"
            v-model="state.qtdSelected"
            class="border-2 border-gray-100 py-4 px-2 flex-1 w-full sm:flex-auto sm:w-auto"
          >
            <option
              class="border-2 border-gray-100 py-4 px-2 bg-lightseagreen-400 font-medium text-lightseagreen-900"
              v-for="option in state.qtdOptions"
              v-bind:value="option.value"
              :key="option.value"
            >
              {{ option.text }}
            </option>
          </select>

          <label
            for="roundTrip"
            class="mx-8 underline block m-5 sm:my-0 sm:mx-8"
          >
            <input type="checkbox" id="roundTrip" v-model="state.roundTrip" />
            Jogos de ida e volta
          </label>
        </div>

        <div class="flex flex-col sm:flex-row items-center py-4">
          <div class="w-full">
            <label
              for="inputTeam"
              class="font-bold mx-2 text-center text-lightseagreen-400 diff-label"
            >
              {{ countTeam }}
            </label>
            <input
              type="text"
              id="inputTeam"
              ref="inputTeam"
              maxlength="15"
              placeholder="Tabajara FC"
              class="border-2 border-gray-100 py-4 px-2 w-full font-medium text-lightseagreen-900 placeholder-lightseagreen-200 mb-4 animate__animated"
              v-model="state.team"
              @focus="handleFocusInput($event)"
            />
          </div>
          <button
            id="btn-add-new-team"
            class="add"
            :class="
              state.timeCountText <= state.qtdSelected ? 'enable' : 'disabled'
            "
            :disabled="countTeam === 'Ok'"
            @click.stop.prevent="handleAddTeam($event)"
            @keyup.enter="handleAddTeam($event)"
          >
            {{ countTeam === 'Ok' ? 'Times já adicionados' : 'Adicionar' }}
          </button>
        </div>

        <div class="my-5">
          <label
            for="qtd"
            class="font-bold mx-2 text-center text-lightseagreen-400"
          >
            Times adicionados
          </label>
          <transition name="no-mode-fade" mode="out-in">
            <ul
              v-if="state.teams.length > 0"
              class="flex flex-wrap border-2 py-3"
              id="teams"
            >
              <li
                v-for="(item, index) in state.teams"
                :key="item"
                class="p-2 diff-li"
              >
                <span class="px-2 font-bold">Time {{ index + 1 }}:</span>
                {{ item }}
                <span
                  ><i
                    class="far fa-trash-alt text-brand-danger pointer cursor-pointer"
                    @click="teamDelete(index)"
                  ></i
                ></span>
              </li>
            </ul>
            <ul v-else class="flex border-2 py-3">
              <li class="p-2 diff-li">Nenhum time adicionado.</li>
            </ul>
          </transition>
        </div>

        <transition name="no-mode-fade" mode="out-in">
          <button
            v-if="state.teams.length === state.qtdSelected && state.buttonNew"
            class="confirm"
            key="confirm"
            @click="handleValidation"
          >
            Criar
          </button>
          <div
            v-else
            class="p-4 my-16 font-medium text-center bg-lightseagreen-900 text-white"
            key="text"
          >
            Adicione a quantidade exata de times para gerar o Campeonato.
          </div>
        </transition>
      </form>
    </div>
  </transition>
</template>

<script>
import { computed, reactive, ref } from 'vue'

import { setCompetition } from '../../store/competition'
import { randomTeams } from '../../utils/randomTeams'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const toast = useToast()
    const router = useRouter()
    const state = reactive({
      title: '',
      productOwner: '',
      qtdSelected: 4,
      qtdOptions: [
        { text: '4 times', value: 4 },
        { text: '8 times', value: 8 },
        { text: '16 times', value: 16 },
        { text: '32 times', value: 32 }
      ],
      roundTrip: false,
      timeCountText: 1,
      team: '',
      teams: [],
      objTeams: [],
      buttonNew: true
    })
    const inputTeam = ref(null)
    const countTeam = computed(() => {
      if (state.timeCountText <= state.qtdSelected) {
        return `Time: ${state.timeCountText}`
      } else {
        return 'Ok'
      }
    })
    function handleChange (e) {
      if (e.currentTarget.value.length < 2) {
        e.currentTarget.classList.contains('green')
        e.currentTarget.classList.remove('green')
        e.currentTarget.classList.add('red', 'animate__shakeX')
      } else {
        e.currentTarget.classList.contains('red')
        e.currentTarget.classList.remove('red', 'animate__shakeX')
        e.currentTarget.classList.add('green')
      }
    }

    function handleAddTeam (e) {
      if (state.team.length > 2 && !state.teams.includes(state.team)) {
        countTeam.value !== 'Ok' && state.timeCountText++
        state.teams.push(state.team)
        state.team = ''
        return
      }
      inputTeam.value.classList.add('red', 'animate__shakeX')
    }

    function handleFocusInput (e) {
      e.currentTarget.classList.contains('red') &&
        e.currentTarget.classList.remove('red', 'animate__shakeX')
    }

    function teamDelete (index) {
      state.teams.splice(index, 1)
      state.timeCountText--
    }

    function handleValidation () {
      if (state.competition !== '' && state.productOwner !== '' && state.teams.length === state.qtdSelected) {
        state.buttonNew = false
      }
    }

    function generateCompetition () {
      state.teams.forEach(t => {
        const team = { name: t, goals: Number(0), balance: Number(0) }
        state.objTeams.push(team)
      })
      setCompetition(state.objTeams, {
        competition: state.title,
        productOwner: state.productOwner,
        roundTrip: state.roundTrip,
        randomTeams: randomTeams(state.teams)
      })
      toast.clear()
      toast.success('Tudo ok, você será redirecionado, boa sorte...')
      waitAndRedirect(3000, 'Competition')
    }

    function waitAndRedirect (time, path) {
      setTimeout(() => {
        router.push({ name: `${path}` })
      }, time)
    }

    return {
      state,
      countTeam,
      inputTeam,
      handleChange,
      handleAddTeam,
      handleFocusInput,
      teamDelete,
      handleValidation,
      generateCompetition
    }
  }
}
</script>

<style lang="postcss" scoped>
.viewForms {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: url('../../assets/imagens/bg-forms.jpg') no-repeat center center;
  background-size: cover;
}
form {
  background: #ffffff;
}
label {
  display: block;
  max-width: 180px;
  margin-bottom: -12px;
  position: relative;
  z-index: 2;
  background: #ffff;
}
.add {
  @apply text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray font-medium transition-all duration-300;
  height: 60px;
  margin-top: -5px;
  max-width: 218px;
  min-width: 84px;
  width: 100%;
}
.diff-label {
  max-width: 100px;
}
.disabled {
  background: #f3f4f6;
  border-color: #f3f4f6;
  color: gray;
  cursor: unset;
}
.disabled:hover {
  border-color: #f3f4f6;
  color: gray;
}
.enable {
  background: #63c3be;
  border-color: #eaf7f5;
}
.green {
  @apply border-brand-success;
}
.red {
  @apply border-brand-danger;
}
.confirm {
  @apply text-white border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray font-medium p-3 my-14 transition-all duration-300 bg-brand-success w-full;
}
.diff-li {
  flex: 1 1 243px;
}
.no-mode-fade-enter-active,
.no-mode-fade-leave-active {
  transition: all 0.5s;
}

.no-mode-fade-enter-from,
.no-mode-fade-leave-to {
  opacity: 0;
}
</style>
