
console.log("sarasa");

/*
    ===== Código de TypeScript =====
*/

interface SuperHero {
    name: string;
    age: number;
    address: Address;
    showAddress: ()=> string;
}
interface Address{
    calle: string;
    country: string;
    ciudad: string;
}

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        calle: 'Main St',
        country: 'USA',
        ciudad: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.ciudad + ', ' + this.address.country;
    }
}


const address = superHeroe.showAddress();
console.log( address );




export {};