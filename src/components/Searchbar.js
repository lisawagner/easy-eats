import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Searchbar.css'

export default function Searchbar() {
  const [term, setTerm] = useState('')
  const history = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    // send user to search page - including their search term
    history(`/search?q=${term}`)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSearch} >
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  )
}
