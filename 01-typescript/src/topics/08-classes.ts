export class Person {
    public name: string; // ! error si no se inicializa
    private address: string; // ? public: we can access from outside the class and private: only inside the class

    constructor() {
        this.name = 'Tonny';
        this.address = 'Okinawa, JP';
    }
}

const ironman = new Person();
// console.log(ironman.address); // ! error, address is private
console.log(ironman.name); // ? works, name is public
