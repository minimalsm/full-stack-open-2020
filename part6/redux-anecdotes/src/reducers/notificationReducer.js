const initialState = ''


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

export const addNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {message}
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}


export default notificationReducer