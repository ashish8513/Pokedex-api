import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './PokemonDetail.css'

function PokemonDetails() {
  const { id } = useParams();
  const navigate=useNavigate()
  const [pokemon, setPokemon] = useState({})
  console.log(id)

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
      // stats:response.data.stats
    })

    console.log(response.data)
  }

  useEffect(() => {
    downloadPokemon();
  }, [])
  return (
    <div className="pokemon-details-wrapper">
    <button className="navigate-btn" onClick={()=>navigate(-1)}>Back</button>
      <img className="pokemon-image" src={pokemon.image}  />
      <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
      <div className="pokemon-details-name">Height: {pokemon.height}</div>
      <div className="pokemon-details-name">Weight: {pokemon.weight} </div>
      <div className="pokemon-types">
        {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
    </div>
    </div>
  )
}

export default PokemonDetails
