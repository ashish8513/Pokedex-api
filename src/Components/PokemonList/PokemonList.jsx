import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Pokemonlist.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isloading, setIsLoading] = useState(true)

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';
    async function downloadPokemions() {
        const response = await axios.get(POKEDEX_URL)
        const pokemonResult = response.data.results;
        console.log(pokemonResult)
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData)
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            // const pokeData = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        console.log(res)
        setPokemonList(res)
        setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemions();
    }, []);


    return (
        <div className='pokemon-list-wrapper'>


            <div>Pokemon List</div>
            {(isloading) ? "loading...." :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
        </div>
    )
}

export default PokemonList
