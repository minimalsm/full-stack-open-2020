const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: ++anecdoteToChange.votes
      }

      return state.map(anecdote => {
        return anecdote.id === id ? changedAnecdote : anecdote
      })

    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data
  
    default:
      return state
  }
}

export default anecdoteReducer