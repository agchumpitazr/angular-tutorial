const skills: string[] = ['Bash', 'Counter', 'Healing'];
// const skills: string[] = ['Bash', 'Counter', 'Healing', true, 123]; // Error: Type '(string | number | boolean)[]' is not assignable to type 'string[]'.

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string; // Optional property
}
const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
}
strider.hometown = 'Rivendell'; // Valid, because 'hometown' is optional
// strider.hometown = 123; // Error: Type 'number' is not assignable to type 'string | undefined'.

console.table({ strider });
// strider.hp = 'FULL'; // Error: Type 'string' is not assignable to type 'number'.

export {}; // ! to convert this file into a module and avoid errors with variables with the same name in other files
