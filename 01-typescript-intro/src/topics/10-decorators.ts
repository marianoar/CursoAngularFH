
//Decorators:
// A Decorator is a special kind of declaration that can be attached to a class declaration, 
// method, accessor, property, or parameter.
// funciones que modifican el comportamiento de clases y otros.
function classDecorator<T extends { new (...args:any[]): {}}>(constructor:T){
    return class extends constructor{
        newProp = 'new prop'
    }
}
@classDecorator
export class SuperClass{

        public myProp : string = 'abc123';

        print(){
            console.log('Hola mundo');
        }
}

console.log(SuperClass)