import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const sortedAnecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()

  const onVote = ({ id, content }) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(addNotification(`Anecdote '${content}' has been upvoted`))
  }

  return (
    <div>
    {filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => onVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList