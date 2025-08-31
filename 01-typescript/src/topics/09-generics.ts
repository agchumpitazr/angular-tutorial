
import { Hero, Person } from "./08-classes";

export function whasMyType<T>(argument: T): T {
    return argument;
}

const tony = new Person('Tony Stark', 'Malibu, CA');
const ironman = new Hero('Iroman',40, 'Tony', tony);

const amIString = whasMyType('Hello World'); // ? string is inferred
const amINumber = whasMyType<number>(123); // ? number is explicity defined
const amIArray = whasMyType<number[]>([1,2,3,4,5]); // ? number[] is explicity defined
const amIObject = whasMyType<Hero>(ironman); // ? object is explicity defined

console.log(amIString.split(' '));
console.log(amINumber.toFixed(2));
console.log(amIArray.join('-'));
console.log(amIObject.age);
