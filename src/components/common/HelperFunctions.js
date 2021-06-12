// helper functions that can be used anywhere in app

export function milisecondsToTime(ms) {
  const date = new Date(ms)
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}