

function addNumbers (a:number, b: number){
    return a+b;
}

const addNumbersArrow = (a:number, b: number): string => {
    return `${a + b}`; // en vez de hacer un toString()
}

function multiply( first : number, second? : number , base: number = 2){
    return first * base;
}

const result: number = addNumbers(1, 3);
const result2: string = addNumbersArrow (1,4);
const multiplyResult = multiply(5);
console.log( { result, result2, multiplyResult } ); // cool

interface Character{
    name: string;
    hp: number;
    showHp: () => void;
}
const healCharacter = (charater: Character, amount: number) =>{
    charater.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp(){
        console.log(`Puntos de vida ${this.hp}`);
    }
}

healCharacter(strider, 13);
strider.showHp;
