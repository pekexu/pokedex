import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;
    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
      
    }
      closeCache() {
        this.cache.stopReapLoop();
      }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const fullUrl = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cached = this.cache.get<ShallowLocations>(fullUrl);
        if (cached) {
          return cached;
        }

      
        try {
        
          const response = await fetch (fullUrl);
        
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
        
      
        const locationData =(await response.json()) as ShallowLocations;
        this.cache.add(fullUrl, locationData);
        return locationData;
      } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
      }
  

  }

    async fetchLocation(locationName: string): Promise<Location> {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
      
      const cached = this.cache.get<Location>(url);
        if (cached) {
         return cached;
        }

        try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  } 
    
    
}

export type ShallowLocations = {
    count: number
    next: string
    previous: any
    results: {
      name: string;
      url: string;
    }[]
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};