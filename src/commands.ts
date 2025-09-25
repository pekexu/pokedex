// typescript
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import type { CLICommand } from "./state.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map.js";

export function getCommands(): Record<string, CLICommand> {
    return {
    
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