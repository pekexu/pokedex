export function cleanInput(input: string): string[]{
    let returnString = input.toLowerCase().trim().split(RegExp(/\s+/));
    return returnString as string[];
}