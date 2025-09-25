export type CacheEntry<T> = {
    createdAt: number,
    val: T,
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    #reap(){
        const now = Date.now();
        this.#cache.forEach((val, key) => {
            if (val.createdAt < now - this.#interval){
                this.#cache.delete(key);
            }});
    }
    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => {this.#reap()}, this.#interval);
    }
    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
    constructor(num: number){
        this.#interval = num;
        this.#startReapLoop();
    };
    add<T>(key: string, val: T) {
        const newEntry:CacheEntry<T> = {
            createdAt: Date.now(),
            val: val
        };
        this.#cache.set(key, newEntry);
    };

    get<T>(key: string): T | undefined{
        const entry = this.#cache.get(key);
        if (entry === undefined){
            return undefined;
        }
        return entry.val;
    };
    
}