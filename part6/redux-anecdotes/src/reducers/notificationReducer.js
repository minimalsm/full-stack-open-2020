const initialState = ''
let timer = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'CLEAR_NOTIFICATION':
      return initialState
      
    default:
      return state
  }
}

export const addNotification = (message, duration) => {
  clearTimeout(timer)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {message}
    })
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000 )
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}


export default notificationReducer