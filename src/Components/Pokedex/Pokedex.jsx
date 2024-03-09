import React from 'react'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

//Css import
import './Pokedex.css'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>

      <Search />
      <PokemonList />
    </div>
  )
}

export default Pokedex
