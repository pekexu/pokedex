import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  const [queryLoc, ...rest] = args;
  if (args === null || args[0] === undefined) {
    throw new Error("no argument provided. Use 'explore areaname'");
  }
  const location = await state.pokeapi.fetchLocation(queryLoc);
  console.log(`Exploring ${queryLoc}...`);
  console.log("Found pokemon:");
    for (const poke of location.pokemon_encounters) {
        console.log(poke.pokemon.name);
  }
}