
//let skills: string[] = ['bash', 'counter', 'otro', true, 123, new Array()];

const skills: string[] = ['bash', 'counter', 'otro'];

// INTERFACE es la respuesta a como hacemos para tipar un objeto de manera estricta

interface Character{
    name: string,
    hp: number,
    skills: string[],
    hometown?: string // el ? declara como optional
}

const batman: Character = {
    name: 'Batman',
    hp: 100,
    skills: ['vuela', 'nada']
};

batman.hometown="ciudad gotica";

console.table(batman);