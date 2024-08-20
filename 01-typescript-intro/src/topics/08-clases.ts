
export class Person{
    
    public name : string;
    public address: string;
    
    constructor(name: string, address: string){
        this.name = name;
        this.address = address;
    }
}

// export class Hero extends Person{
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super(realName, 'algo'); // es el contructor del padre
//     }
// }

export class Hero{
    constructor(
                public alterEgo: string,
                public age: number,
                public realName: string,
                public person: Person
    ){
       
    }
}

const tony = new Person('Tony Stark', 'NY');
const ironman = new Hero('Batman', 33,'bruno', tony);

console.log(ironman);
