import { reactive } from 'vue'

const competitionInicialState = {
  competition: '',
  productOwner: '',
  roundTrip: '',
  teams: [],
  randomTeams: [],
  winner: [],
  losers: []
}

let state = reactive(competitionInicialState)

export default state

export function resetCompetitionStore () {
  state = reactive(competitionInicialState)
}

export function setCompetition (
  teams,
  { competition, productOwner, roundTrip, randomTeams }
) {
  state.competition = competition
  state.productOwner = productOwner
  state.roundTrip = roundTrip
  state.teams = teams
  state.randomTeams = randomTeams
}

export function setGoals (team1, team2) {
  const t1Index = state.teams.findIndex(t => t.name === team1.name)
  const t2Index = state.teams.findIndex(t => t.name === team2.name)

  state.teams[t1Index].goals =
    Number(state.teams[t1Index].goals) + Number(team1.goals)
  state.teams[t1Index].balance =
    Number(state.teams[t1Index].balance) + Number(team1.goals)
  state.teams[t1Index].balance =
    Number(state.teams[t1Index].balance) - Number(team2.goals)
  state.teams[t2Index].goals =
    Number(state.teams[t2Index].goals) + Number(team2.goals)
  state.teams[t2Index].balance =
    Number(state.teams[t2Index].balance) + Number(team2.goals)
  state.teams[t2Index].balance =
    Number(state.teams[t2Index].balance) - Number(team1.goals)
}

export function copy () {
  const teams = []
  state.teams.forEach(team => {
    teams.push({
      name: team.name,
      goals: team.goals,
      balance: team.balance,
      played: Number(0),
      game1: {
        goals: Number(0)
      },
      game2: {
        goals: Number(0)
      },
      penal: Number(0)
    })
  })
  return teams
}

export function setResults (winner, losers) {
  state.winner = winner
  state.losers = losers
}

export function setRandomTeams (payload) {
  state.randomTeams = payload
}
