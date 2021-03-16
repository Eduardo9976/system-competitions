<template>
  <loading time="3000" />
  <transition
    mode="in-out"
    appear
    class="animate__animated animate__zoomInRight animate__delay-3s"
  >
    <div class="start">
      <h1 class="font-bold text-white text-3xl text-center py-8">
        Seja bem vindo a campetição {{ store.competition }}...
      </h1>

      <div
        class="mx-auto p-4 max-w-screen-lg bg-brand-gray border-4 border-lightseagreen-400 rounded"
      >
        <p>
          {{ store.competition }}
          {{ store.roundTrip ? '- Jogos de ida' : '' }} :
        </p>
        <ul class="py-2">
          <template v-for="(time, index) in store.randomTeams" :key="index">
            <li
              v-if="index % 2 === 0"
              class="border-2 py-6 flex justify-center items-center flex-col font-medium my-4"
            >
              <transition
                appear
                mode="in-out"
                class="animate__animated animate__zoomInRight"
              >
                <div
                  v-if="!store.roundTrip"
                  :id="`penal-${index}`"
                  class="p-2 text-white rounded penal hidden"
                ></div>
              </transition>
              <div class="flex justify-center">
                <p
                  class="time1 order-1 flex flex-col justify-center items-center py-4 text-center sm:text-right order-2 sm:block sm:w-80"
                >
                  {{ time }}
                  <span class="hidden sm:inline pr-2">- (Casa) </span>
                  <input
                    @change="haveGoal(time, $event.target, 'going')"
                    class="w-14 mx-2 py-4 text-center focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    :id="`result-time1-${index}-go`"
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
                    @change="
                      haveGoal(store.randomTeams[index + 1], $event.target)
                    "
                    class="w-14 mx-2 py-4 text-center order-2 sm:order-1 focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    :id="`result-time2-${index}-go`"
                    placeholder="99"
                  />
                  <span class="hidden sm:inline">(Visitante) -</span>
                  {{ store.randomTeams[index + 1] }}
                </p>
              </div>
              <button
                :id="`button-${index}-go`"
                @click="
                  handleClick($event, time, store.randomTeams[index + 1], index)
                "
                class="py-2 mx-auto mt-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray transition-all duration-500 focus:outline-none disabled:opacity-50"
              >
                Confirmar resultado
              </button>
            </li>
          </template>
        </ul>
      </div>

      <ModalConfirm @handleAnswer="handleAnswer" v-if="state.confirm" />
      <Penalty
        v-if="state.modalPenalty"
        :team1="computedTeam1"
        :team2="computedTeam2"
        @handlePenals="handlePenals"
      />

      <div
        v-if="store.roundTrip"
        class="mx-auto p-4 max-w-screen-lg bg-brand-gray mt-8 border-4 border-lightseagreen-400 rounded"
      >
        <p>
          {{ store.competition }}
          {{ store.roundTrip ? '- Jogos de volta' : '' }} :
        </p>
        <ul class="py-2 w-full">
          <template v-for="(time, index) in store.randomTeams" :key="index">
            <li
              v-if="index % 2 == 0"
              class="border-2 py-6 flex justify-center items-center flex-col font-medium my-4"
            >
              <transition
                appear
                mode="in-out"
                class="animate__animated animate__zoomInRight"
              >
                <div
                  v-if="store.roundTrip"
                  :id="`penal-${index}`"
                  class="p-2 text-white rounded penal hidden"
                ></div>
              </transition>
              <div class="flex justify-center">
                <p
                  class="time1 order-1 flex flex-col justify-center items-center py-4 text-center sm:text-right order-2 sm:block sm:w-80"
                >
                  {{ store.randomTeams[index + 1] }}
                  <span class="hidden sm:inline pr-2">- (Casa) </span>
                  <input
                    @change="
                      haveGoal(
                        store.randomTeams[index + 1],
                        $event.target,
                        'return'
                      )
                    "
                    class="w-14 mx-2 py-4 text-center focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    :id="`result-time1-${index}-cm`"
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
                    @change="haveGoal(time, $event.target)"
                    class="w-14 mx-2 py-4 text-center order-2 sm:order-1 focus:outline-none border-2 animate__animated"
                    min="0"
                    type="number"
                    :id="`result-time2-${index}-cm`"
                    placeholder="99"
                  />
                  <span class="hidden sm:inline">(Visitante)</span>
                  {{ time }}
                </p>
              </div>
              <button
                @click="
                  handleClick($event, time, store.randomTeams[index + 1], index)
                "
                :id="`button-${index}-cm`"
                class="py-2 mx-auto mt-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-900 hover:bg-brand-gray transition-all duration-500 focus:outline-none disabled:opacity-50"
              >
                Confirmar resultado
              </button>
              <ModalConfirm
                @handleAnswer="
                  handleAnswer($event, {
                    team1: time,
                    team2: store.randomTeams[index + 1]
                  })
                "
                v-if="state.confirm"
              />
            </li>
          </template>
        </ul>
      </div>
      <transition appear mode="in-out" class="animate__animated animate__backInDown">
        <div
      v-if="state.nextP"
      id="nextPhase" class="text-center py-8 mt-6 max-w-screen-lg bg-lightseagreen-900 mx-auto rounded">
        <p class="font-medium text-white sm:text-xl text-center">Encerramos os confrontos, esperamos vocês na próxima fase...</p>
        <button
        @click="
          nextPhase
        "
        class="font-medium py-2 mx-auto my-4 w-1/2 text-white bg-lightseagreen-400 border-2 border-lightseagreen-400 rounded hover:text-lightseagreen-900 hover:border-lightseagreen-50 hover:bg-brand-gray transition-all duration-500 focus:outline-none transform-gpu hover:scale-110"
      >
        Avançar
      </button>
      </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Loading from '../../components/Loanding'
import ModalConfirm from '../../components/ModalConfirm'
import Penalty from '../../components/Penalty'

import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'
import { copy, setGoals, setResults } from '../../store/competition'

export default {
  name: 'Competition',
  components: { Loading, ModalConfirm, Penalty },
  setup () {
    const store = useStore('Competition')
    const router = useRouter()
    const state = reactive({
      confirm: false,
      localTeams: [],
      team1: undefined,
      team2: undefined,
      inputTeam1: undefined,
      inputTeam2: undefined,
      btnConfirm: undefined,
      qtdGames: 0,
      qtdGamePerTeam: 0,
      winner: [],
      losers: [],
      modalPenalty: false,
      displayPenal: undefined,
      finish: 0,
      nextP: false
    })

    onMounted(() => {
      if (
        (store.competition.length < 2,
        store.teams.length < 2,
        store.randomTeams.length < 2)
      ) {
        router.push({ path: '/' })
      }
      state.localTeams = copy()
      if (store.roundTrip) {
        state.qtdGames = store.randomTeams.length
        state.qtdGamePerTeam = 2
      } else {
        state.qtdGames = store.randomTeams.length / 2
        state.qtdGamePerTeam = 1
      }
    })

    const computedTeam1 = computed(() => {
      return state.team1
    })
    const computedTeam2 = computed(() => {
      return state.team2
    })

    function haveGoal (team, event) {
      if (event.classList.contains('red')) {
        event.classList.remove('red', 'animate__shakeX')
      }
      const index = state.localTeams.findIndex(t => t.name === team)
      state.localTeams[index].goals = event.value
    }

    function handleClick (event, t1, t2, displayPenal) {
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

      state.inputTeam1 =
        event.target.previousElementSibling.children[0].children[1].id
      state.inputTeam2 =
        event.target.previousElementSibling.children[2].children[0].id
      state.btnConfirm = event.target.id
      state.team1 = t1
      state.team2 = t2
      state.displayPenal = displayPenal
      state.confirm = true
    }

    function handleAnswer (answer) {
      if (answer) {
        const it1 = state.localTeams.findIndex(t => t.name === state.team1)
        const it2 = state.localTeams.findIndex(t => t.name === state.team2)
        setGoals(state.localTeams[it1], state.localTeams[it2])
        const inpT1 = document.getElementById(state.inputTeam1)
        const inpT2 = document.getElementById(state.inputTeam2)
        const btConf = document.getElementById(state.btnConfirm)
        inpT1.setAttribute('disabled', true)
        inpT1.classList.add('disabled')
        inpT2.setAttribute('disabled', true)
        inpT2.classList.add('disabled')
        btConf.setAttribute('disabled', true)
        btConf.classList.add('disabled')
        btConf.innerText = 'Ok'
        state.finish++
        state.localTeams[it1].played = state.localTeams[it1].played + 1
        state.localTeams[it2].played = state.localTeams[it2].played + 1
        state.localTeams[it1][
          `game${state.localTeams[it1].played}`
        ].goals = Number(state.localTeams[it1].goals)
        state.localTeams[it2][
          `game${state.localTeams[it1].played}`
        ].goals = Number(state.localTeams[it2].goals)

        if (state.localTeams[it1].played === state.qtdGamePerTeam) {
          let t1SumGoals = 0
          let t2SumGoals = 0
          if (store.roundTrip) {
            t1SumGoals =
              Number(state.localTeams[it1].game1.goals) +
              Number(state.localTeams[it1].game2.goals)
            t2SumGoals =
              Number(state.localTeams[it2].game1.goals) +
              Number(state.localTeams[it2].game2.goals)
          } else {
            t1SumGoals = state.localTeams[it1].game1.goals
            t2SumGoals = state.localTeams[it2].game1.goals
          }
          if (t1SumGoals === t2SumGoals) {
            state.modalPenalty = true
          }
          if (t1SumGoals > t2SumGoals) {
            state.winner.push(state.localTeams[it1].name)
            state.losers.push(state.localTeams[it2].name)
          }
          if (t2SumGoals > t1SumGoals) {
            state.winner.push(state.localTeams[it2].name)
            state.losers.push(state.localTeams[it1].name)
          }
        }

        if (state.finish === state.qtdGames) {
          state.nextP = true
        }
      }

      state.confirm = false
      state.inputTeam1 = undefined
      state.inputTeam2 = undefined
    }

    function handlePenals (e) {
      const index = state.localTeams.findIndex(t => t.name === e.win)
      state.localTeams[index].game1.goals =
        state.localTeams[index].game1.goals + 1
      const displayPenal = document.getElementById(
        `penal-${state.displayPenal}`
      )
      store.roundTrip
        ? (displayPenal.innerText = `${e.t2} - ${e.t2r}  X  ${e.t1r} - ${e.t1}`)
        : (displayPenal.innerText = `${e.t1} - ${e.t1r}  X  ${e.t2r} - ${e.t2}`)

      if (e.t1r > e.t2r) {
        state.winner.push(e.t1)
        state.losers.push(e.t2)
      } else {
        state.winner.push(e.t2)
        state.losers.push(e.t1)
      }
      displayPenal.classList.remove('hidden')
      state.modalPenalty = false
    }

    function nextPhase () {
      setResults(state.winner, state.losers)
      router.push({ name: 'Congrats' })
    }

    return {
      store,
      state,
      computedTeam1,
      computedTeam2,
      router,
      haveGoal,
      handleClick,
      handleAnswer,
      handlePenals,
      nextPhase
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
.red {
  border-color: #f88676;
}
button.disabled {
  background: #c0bcb0;
  cursor: unset;
  border-color: #1b3d3c;
  color: #1b3d3c;
}
.penal {
  @apply bg-lightseagreen-400;
}
.penal::before {
  @apply rounded;
  content: 'Pênaltis';
  color: #ffff;
  font-size: 16px;
  display: block;
  width: 100%;
  text-align: center;
  background: #1b3d3c;
}
#nextPhase {
  background: linear-gradient(to top, transparent 5%, #1b3d3c 20%);
}
</style>
