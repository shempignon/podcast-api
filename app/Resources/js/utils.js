export const buildParams = fields => {
  let params = new FormData()
  for (let field in fields) {
    params.append(field, fields[field])
  }

  return params
}

export const extractTimesFromAudio = (event) => {
  const { currentTime, duration } = event.path[0]

  return {
    currentTime,
    duration,
    completed: parseFloat((currentTime / duration * 100 || 0).toFixed(1))
  }
}
