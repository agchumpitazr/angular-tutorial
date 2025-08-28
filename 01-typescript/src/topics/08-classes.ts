export class Person {
    public name: string; // ! error si no se inicializa
    private address: string; // ? public: we can access from outside the class and private: only inside the class

    constructor(name: string, address: string = 'No address') {
        this.name = name;
        this.address = address;
    }
    // ? shorthand for defining and initializing properties
    // ! error because the syntax is erasable
    // constructor(public name: string, private address: string) { }
}


// const ironman = new Person(); // ! error, we need to pass the parameters
const captainAmerica = new Person('Steve Rogers', 'Brooklyn, NY');
// console.log(ironman.address); // ! error, address is private
// console.log(captainAmerica.name); // ? works, name is public
console.log(captainAmerica);

// ** ---------------------------------------------------------- ** //

// export class Hero extends Person {
//     public age: number;
//     public alterEdo: string;
//     public realName: string;

//     constructor(
//         alterEdo: string,
//         age: number,
//         realName: string,
//     ) {
//         super(realName);
//         this.alterEdo = alterEdo;
//         this.age = age;
//         this.realName = realName;   
//     }
// }

export class Hero {
    public age: number;
    public alterEgo: string;
    public realName: string;

    public person: Person;

    constructor(
        alterEgo: string,
        age: number,
        realName: string,
        person: Person
    ) {

        this.person = person;
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;   
    }
}
const tony = new Person('Tony Stark', 'Malibu, CA');
const ironman = new Hero('Iroman',40, 'Tony', tony);
console.log(ironman); // ? works, name is public
// console.log(ironman.address); // ! error, address is private