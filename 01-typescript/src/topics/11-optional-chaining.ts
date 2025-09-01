export interface Passanger {
    name: string;
    children?: string[];
}

const passanger1: Passanger = {
    name: 'Tonny',
};

const passanger2: Passanger = {
    name: 'Fernando',
    children: ['Sara', 'Ana'],
};

const printChildren = (passanger: Passanger): void => {
    // const howManyChildren = passanger.children!.length || 0; // ? Non-null assertion operator
    const howManyChildren = passanger.children?.length || 0; // ? Optional chaining
    console.log(howManyChildren);
}

printChildren(passanger1);
printChildren(passanger2);