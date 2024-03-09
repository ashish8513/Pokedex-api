import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Pokemonlist.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isloading, setIsLoading] = useState(true)

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';  // this download the list of 20 pokemoon the data 
    async function downloadPokemions() {
        const response = await axios.get(POKEDEX_URL)
        const pokemonResult = response.data.results;  //we get the array of the pokemoin from the results
        console.log(response.data)

        //iterating over the array of the pokemon data  and using their url to create an array of promises 
        // that will download those 20 pokemon data
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        //passing the aray promise to the array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData)

        //result of the list of pokemon
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


            {/* <div>Pokemon List</div> */}
            <div className='pokemon-wrapper'>
            {(isloading) ? "loading...." :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
            </div>
            <div className='controls'>
                <button>Prev</button>
                <button>Next</button>
            </div>
           
        </div>
    )
}

export default PokemonList
