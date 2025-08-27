import type { Product } from './06-function-destructuring';
import { taxCalculation } from './06-function-destructuring';

const shoppingCart: Product[] = [
    {
        description: 'Nokia A1',
        price: 100,
    },
    {
        description: 'iPad Air',
        price: 149.99,
    },
];

const [ total, tax ] = taxCalculation({ products: shoppingCart, tax: 0.15 });
console.log('Total:', total);
console.log('Tax:', tax);