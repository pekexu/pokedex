import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};


export type State = {    
    rl: Interface,
    commands: Record<string, CLICommand>,
    pokedex: Map<string, Pokemon>,
    pokeapi: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
};

export function initState(cacheInterval: number): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return { rl: rl,
        commands: getCommands(),
        pokedex: new Map<string, Pokemon>(),
        pokeapi: new PokeAPI(cacheInterval),
        nextLocationsURL: "",
        prevLocationsURL: "",
        };
}
