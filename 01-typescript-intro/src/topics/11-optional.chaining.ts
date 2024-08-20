
//encadenamiento opcional

export interface Passenger{
    name: string;
    children?: string[];
}

const pass1 : Passenger = {
    name: 'yo'
}

const pass2 : Passenger = {
    name: 'alguien',
    children: ['uno', 'dos']
}
const printChildren = (passenger : Passenger) : number =>{ // le seteo el tipo de retorno para que dé error

    const howManyChildren = passenger.children?.length || 0;

    // const howManyChildren = passenger.children!.length; //not null


    console.log(passenger.name,' tiene ', howManyChildren);

    return howManyChildren;
}

printChildren(pass1);
printChildren(pass2);