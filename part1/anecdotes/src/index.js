import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (  
      <button onClick={onClick}>
        {text}
      </button>
  )

const Anecdote = ({ anecdote })  => (
  <div>
    <p>{anecdote}</p>
  </div>
)

const AnecdoteVotes = ({ votes, selected }) => (
    <div>
      <p>Votes: {votes[selected]}</p>
    </div>
  )



const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from(Array(anecdotes.length).fill(0))) //whats going on here

  const handleNextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
 
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]}/>
      <AnecdoteVotes votes={votes} selected={selected} />
      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={handleNextAnecdote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))