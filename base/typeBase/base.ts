function greeter(person) {
  return 'Hello,'+ person;
}

let user = "li";
console.log(greeter(user))


// let value: any;
// value = true;
// value = 1;
// value = "hello";
// value = Symbol("type");
// value = {};
// value = [];
// value.foo.bar;
// value();    // [[call]]
// new value(); //  [[constructor]]
// value[0][1]; // 以上都是OK的


// let value2: unknown;
// value2 = true;
// value2 = 1;
// value2 = "hello";
// value2 = Symbol("type");
// value2 = {};
// value2 = [];

// value2.foo.bar;  
// value2();    
// new value2(); 
// value2[0][1]; // 以上不ok ERROR

// interface Config {
//   width?: number;
// }

// // interface Config {
// //   width?: number;
// //   [propName: string]: any
// // }

// function CalculateAreas(config: Config) {
//   let square = 100;
//   if (config.width) {
//     square = config.width * config.width;
//   }
//   return { area: square };
// }

// // let mySquare = CalculateAreas({widdth: 5}) // 报错

// // let mySquare = CalculateAreas({ widdth: 5} as Config)

// abstract class Animal {
//   abstract makeSound (): void;
//   move (): void {
//     console.log('roaming the earth ')
//   }
// }

// class Cat extends Animal {
//   makeSound (): void {
//     console.log('miao miao');
//   }
// }

// const cat = new Cat ();
// cat.makeSound(); // miao miao
// cat.move() // roaming the earth 


// // 重载
// interface Direction2 {
//   top: number,
//   right: number,
//   bottom: number,
//   left: number
// }

// function assigned(all: number): Direction2
// function assigned(topAndBottom: number, leftAndRight: number): Direction2
// function assigned(top: number, right: number, bottom: number, left: number): Direction2

// function assigned(a: number, b?: number, c?: number, d?: any) {
  
// }

// 一个简单的TS  类装饰器

// function addAge(constructor: Function) {
//   constructor.prototype.age = 18;
//   constructor.prototype.say = () => { console.log('say') }
// }

// @addAge
// class Person2 {
//   name: string;
//   age!: number;
//   say!: Function;
//   constructor() {
//     this.name = 'll';
//   }
// }

// let person = new Person2();
// console.log(person.age);
// person.say();


// 联合类型（minxin）

function mixin<T extends object, U>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T> result)[id] = first[id];
  }

  for (let id in second) {
    if(!result.hasOwnProperty(id)) {
      (<U> result)[id] = second[id];
    }
  }
  return result;
}

const x = mixin({ a: 'hello'}, { b: 42 });
console.log(x.a);
console.log(x.b);

function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }
}

// type some = boolean | string
// const b: some = true // ok
// const c: some = 'hello' // ok

// const d: some = 123 // error

// type Tree< T > = {
//   value: T;
//   left: Tree <T>;
//   right: Tree<T>;
// }


// const b: 0x1919n = 6425n; // ok
// const c: 'llc' = 'llc'; // ok
// const d: false = false; // ok
// const g: 'github' = 'pronhub'; // error


// class Person {
//   name = 'll';
//   age = 18;
// }

// class Animal {
//   name: 'lc';
//   color: 'pink';
// }

// function getSomething(args: Person | Animal) {
//   if (args instanceof Person) {
//     console.log(args.color); // error;
//     console.log(args.age);
//   }

//   if (args instanceof Animal) {
//     console.log(args.color);
//     console.log(args.age); // error
//   }
// }

// function getSomething(args: Person | Animal) {
//   if ('age' in args) {
//     console.log(args.color); // error;
//     console.log(args.age);
//   }

//   if ('color' in args) {
//     console.log(args.color);
//     console.log(args.age); // error
//   }
// }


class Person {
  constructor(public weight: number, public name: string, public born: string) {}
}

interface Dog {
  name: string;
  weight: number
}

let x2: Dog = new Person(120, 'll', 'xa') // ok


let q = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = q; //ok
q = y; // error 不能将类型 (b: number, s: string) => number 分配给类型 (a: number) =>  number

let foo = (x: number, y: number) => { }
let bar = (x?: number, y?: number) => {}
let bas = (...args: number[]) => {}

foo = bar = bas; //ok
bas = bar = foo; //ok  
// 当把strictNullChecks 设置为false时，是兼容的

let foo2 = (x: number, y: number) => { }

let bar2 = (x?: number) => {}
foo2 = bar2 //ok
bar2 = foo2 // error

class Animal2 {
  feet: number;
  constructor(name: string, numFeet: number) {
    this.feet = numFeet
  }
}

class Size {
  feet: number;
  constructor (meters: number) {
    this.feet = meters;
  }
}

let a: Animal2 = new Animal2('a', 2);
let s: Size = new Size(1);

a = s; // ok
s = a; // ok

function isString (test: any): test is string {
   return typeof test === 'string';
}

function example(foo: number | string) {
  if(isString(foo)) {
    console.log('it is a string ' + foo);
    console.log(foo.length)
  }
}

example("hello world")

interface ToString {
   (): string;
   new(): string;
}

declare const somethingToString: ToString;
somethingToString()
new somethingToString()


interface User {
  username: string;
  id: number;
  token: string;
  avatar: string;
  role: string
}

type partial<T> = { [ K in keyof T]?: T[K] }
type partialUser = partial<User>
type readonlyUser = Readonly<User>

interface User {
  id: number,
  name: string,
  form?: string
}

type Foo = () => User
type ReturnType1<T> = T extends (...args: any[]) => infer P ? P : any;
type R5 = ReturnType1<Foo>  // User


interface Company {
  id: number;
  name: String;
}

interface Person {
  id: number;
  name: string;
  address: string;
  company: Company;
}
type R0 = Partial<Person>
type DeepPartial< T > = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}
type R9 = DeepPartial<Person>