
export interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia',
    price: 134
}
const tablet : Product = {
    description: 'iPad',
    price: 140
}

interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}

export function taxCalculation( options: TaxCalculationOptions): [number, number] {
    let total = 0;
    options.products.forEach( ({price}) => {
        total += price;
    });
    return [total, total * options.tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.21;

const result = taxCalculation(
    {
        products: shoppingCart,
        tax: tax
    }
)

const [total, taxTotal] = taxCalculation(
    {
        products: shoppingCart,
        tax: tax
    }
)

console.log( 'total: ', result[0]);
console.log('taxes: ',result[1]);

console.log( 'total: ', total);
console.log('taxes: ',taxTotal);