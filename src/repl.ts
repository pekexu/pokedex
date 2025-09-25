import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[]{
    let returnString = input.toLowerCase().trim().split(RegExp(/\s+/));
    return returnString as string[];
}

export async function startREPL(state: State){
    state.rl.prompt();
    state.rl.on('line', async (line) => {
        
        const words = cleanInput(line);
        if (words.length === 0){
            state.rl.prompt();
            return;
        } 
        const commandName = words[0];
        
        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command`);
            state.rl.prompt();
            return;
        } 
        try {
           await cmd.callback(state);
        } catch (e) {
            console.log((e as Error).message);
        }
        
     
        state.rl.prompt();
        
    });
}