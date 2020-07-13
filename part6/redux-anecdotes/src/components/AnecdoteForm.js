import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const onAddAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.addAnecdote(content)
    props.addNotification(`Anecdote '${content}' has been created`, 5)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onAddAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  addNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)