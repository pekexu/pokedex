import { State } from "./state.js";

export async function commandPokedex(state: State):Promise<void>{
    if (state.pokedex.size === 0){
        throw new Error("Pokedex is empty!");
    }
    console.log("Your Pokedex:");
    state.pokedex.forEach((pokemon) => {
        console.log(` - ${pokemon.name}`);
    });

}