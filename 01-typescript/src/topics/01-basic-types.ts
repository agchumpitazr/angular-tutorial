const name = 'Tonny';
// const name: String | number = 'Tonny';
// name = 123; // Error: Type 'number' is not assignable to type 'string'

let hpPoints: number | 'FULL' = 95;
hpPoints = 'FULL'; // Valid
// hpPoints = true; // Error: Type 'boolean' is not assignable to type 'number | "FULL"'

const isAlive: boolean = true;
// isAlive = false; // Error: Cannot assign to 'isAlive' because it is a constant.

console.log({ name, hpPoints, isAlive });

export {}; // ! to convert this file into a module and avoid errors with variables with the same name in other files