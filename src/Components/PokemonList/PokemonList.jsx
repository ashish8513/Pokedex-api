import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Pokemonlist.css'
import Pokemon from '../Pokemon/Pokemon';
import Search from '../Search/Search';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isloading, setIsLoading] = useState(true)

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');  // this download the list of 20 pokemoon the data 

    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')



    async function downloadPokemions() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl)
        const pokemonResult = response.data.results;  //we get the array of the pokemoin from the results
        console.log(response.data)

        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        
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
    }, [pokedexUrl]);

    // const searchData = pokemonList.filter((pokedexUrl) => pokedexUrl.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='pokemon-list-wrapper'>


            {/* <div>Pokemon List</div> */}
            <div className='pokemon-wrapper'>
                {(isloading) ? "loading...." :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className='controls my-16'>
                <button disabled={prevUrl === null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button className='py-2 px-4 ml-4' disabled={nextUrl === null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>

        </div>
    )
}

export default PokemonList
