import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const onVote = (anecdote) => {
    props.vote(anecdote)
    props.addNotification(`Anecdote '${anecdote.content}' has been upvoted`, 5)
  }

  return (
    <div>
    {props.anecdotesToShow.map(anecdote =>
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

const sortedAndFilteredAnecdotes = ({anecdotes, filter}) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return filteredAnecdotes
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotesToShow: sortedAndFilteredAnecdotes(state)
  }
}

const mapDispatchToProps = {
  vote,
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)