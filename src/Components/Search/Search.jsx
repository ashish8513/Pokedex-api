import React, { useState } from 'react'
import './Search.css'
function Search() {
  const [search, setSearch] = useState("")
  return (
    <div className='search-wrapper'>
      <input
        id='pokemon-name-search'
        type="text"
        placeholder='search pokemon name...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
