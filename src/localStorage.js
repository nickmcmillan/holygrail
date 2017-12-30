/* global localStorage, console, window */
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined // let the reducers initialise it instead
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // localstorage can fail
    console.error(err)
  }
}

export const resetState = () => {
  try {
    localStorage.removeItem('state')
    window.alert('State reset')

    window.setTimeout(() => {
      window.location.href = '/'
    }, 500)
  } catch (err) {
    // localstorage can fail
    console.error(err)
  }
}
