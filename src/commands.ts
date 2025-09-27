// typescript
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import type { CLICommand } from "./state.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
    return {
    catch: {
        name: "catch",
        description: "Tries to catch pokemon by name. Usage 'catch pokemon'",
        callback:commandCatch,
    },
    inspect: {
        name: "inspect",
        description: "Inspects a caught pokemon, telling information about it",
        callback:commandInspect,

    },
    pokedex: {
        name: "pokedex",
        description: "List all caught pokemons",
        callback:commandPokedex,
    },
    map: {
        name: "map",
        description: "Displays names of next 20 location areas",
        callback: commandMap,
    },
    mapb: {
        name: "mapb",
        description: "Displays names of previous 20 location areas",
        callback: commandMapBack,
    },
    explore: {
        name: "explore",
        description: "Displays in on location. Usage 'explore location'",
        callback: commandExplore,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    exit: {
        name: "exit",
        description: "Exit the Pokedex",
        callback: commandExit,
    },
    };
}