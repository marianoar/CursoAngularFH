import { Product, taxCalculation } from './06-functions-destructuring';

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 135
    },
    {
        description: 'Samsung',
        price: 211
    }
];

const [ total, tax] = taxCalculation(
    {
        products: shoppingCart,
        tax: 0.15
        }
    );