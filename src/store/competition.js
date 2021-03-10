import { reactive } from 'vue'

const competitionInicialState = {
  competition: '',
  productOwner: '',
  roundTrip: '',
  teams: [],
  randomTeams: []
}

let state = reactive(competitionInicialState)

export default state

export function resetCompetitionStore () {
  state = reactive(competitionInicialState)
}

export function setCompetition ({
  competition,
  productOwner,
  roundTrip,
  teams,
  randomTeams
}) {
  state.competition = competition
  state.productOwner = productOwner
  state.roundTrip = roundTrip
  state.teams = teams
  state.randomTeams = randomTeams

  console.log(state)
}
