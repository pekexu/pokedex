import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]):Promise<void>{
    if (!args) {
        throw new Error("Wrong syntax. Use 'inspect pokemon'");
    }
    const inspectPokemon = args[0];
    if (!state.pokedex.has(inspectPokemon) || state.pokedex.get(inspectPokemon) === undefined || state.pokedex.size === 0){
        throw new Error("you have not caught that pokemon");
        
    }
    const pokemon = state.pokedex.get(inspectPokemon) as Pokemon;
    console.log(`Name: ${pokemon.name}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
Stats:`);
        for (const stat of pokemon.stats){
        console.log(`\t-${stat.stat.name}: ${stat.base_stat}`);
        }
    console.log("Types:");
        for (const type of pokemon.types){
        console.log(`\t-${type.type.name}`);
        }
        
        
        
        





}