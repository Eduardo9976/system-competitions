export function randomTeams (teams) {
  const newArray = []
  let i = 0
  while (i < teams.length) {
    const sort = teams[Math.floor(Math.random() * (teams.length - 0) + 0)]
    if (!newArray.includes(sort)) {
      newArray.push(sort)
      i++
    }
  }
  return newArray
}
