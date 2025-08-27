function addNumbers(a: number, b: number): number {
  return a + b; // Retorna la suma de a y b
}

const addNumbersArrow = (a: number, b: number): string => `${a + b}`; // Retorna la suma de a y b como string

const result2: string = addNumbersArrow(3, 5);
const result: number = addNumbers(2, 4);
// const result: string = addNumbers(2, 4); // Error de tipo

function multiplyNumbers(a: number, b: number = 1): number {
  return a * b; // Si b no se proporciona, se usa el valor por defecto 1
}

const multiplyResult1: number = multiplyNumbers(5); // Usa el valor por defecto para b
const multiplyResult2: number = multiplyNumbers(5, 2); // Proporciona ambos argumentos

interface Character {
  name: string;
  health: number;
  showHealth: () => void; // Método para mostrar la salud
}

const healCharacter = (character: Character, amount: number): void => {
  character.health += amount;
};

const strider: Character = {
  name: 'Strider', //name2: Error: la propiedad debe ser 'name'
  health: 100,
  showHealth() {
    console.log(`Health: ${this.health}`);
  },
};

strider.showHealth();
healCharacter(strider, 20); // Incrementa la salud de Strider en 20
strider.showHealth();

export {}; // ! to convert this file into a module and avoid errors with variables with the same name in other files
