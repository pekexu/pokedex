import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]):Promise<void>{
    const captPokemon = args[0];
    console.log(`Throwing a Pokeball at ${captPokemon}...`);
    const pokemon = await state.pokeapi.catchPokemon(captPokemon) as Pokemon;
    
    
    const random = Math.random() * 1000;

    if (random < pokemon.base_experience){
        console.log(`${captPokemon} escaped!`);
    } else {
        console.log(`${captPokemon} was caught!`);
        state.pokedex.set(captPokemon, pokemon);
    }
}