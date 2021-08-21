## TS

为什么要学？

特点： 静态的（编译时报错），类型的。有利于多人协作，代码可读性。
Javascript的超集：

- TS里可以使用一些尚在提案阶段的语法特性，可以有访问控制符，与js最主要区别是，TS是静态语言
- coffeescript本质上是js的语法糖化，ES2015参考了大量coffeescript的内容进行了标准化，因此coffeescript优势就不存在了。TS的静态性是他立于不败之地的基础。


严谨但不失灵活

#### 缺点：
- 与实际框架结合会有很多坑
- 配置学习成本高
- TypeScript类型系统比较复杂

### 基础类型：base.ts

- any 多人协作项目的大忌，不应该首先考虑此类型
- unknown 与any不同之处： unknown类型被确定是某个类型之前，不能被进行任何操作，如实例化，getter，函数执行等
- never: 表示永远不存在的值的类型，never类型是任何类型的子类型，也可以赋值给任何类型；但是没有类型是never类型的子类型或可以赋值给never类型（除了never本身之外）

#### 数组：
- 泛型定义： 
```js
const list: Array<number> = [1, 2, 3]
```
- []:
```js
const list: number[] = [1, 2, 3]
```
-  元组（Tuple）
元组与数组类型非常相似,表示一个已知元素数量和类型的数组，各个元素的类型不必相同

```js
let x: [string, number]
x = ['hello', 10] // ok
x = [10, 'hello'] // error
```
元组类型  非常严格，即使类型顺序不一样，也会报错

元组可以看成是严格版的数组，    [string, number] 可以看成是：

```js
interface Tuple extends Array <string | number> {
    0: string;
    1: number;
    length: 2;
}
```

元组越界问题
```js
let x: [string, number];
x = ['hello', 10];
x.push(2);
console.log(x); // ['hello', 2] 
console.log(x[2]) ; // error 
```
### 枚举类型
用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型
- for in 遍历对象的可枚举属性
#### 数字枚举

当我们声明一个枚举类型时，虽未给他们赋值，但默认为数字类型且从0开始依次累加，当把第一个赋值后，后面也会跟着累加

```js
enum Direction {
    Up = 10;
    Down,
    Left,
    Right
}
```

#### 字符串枚举

```js
enum Direction {
    Up = 'Up';
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}
```

#### 反向映射
可以通过枚举名字获得枚举值，也可以通过枚举值获取枚举名字

```js
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction[0]); // Up
```

#### 常量枚举
性能提升

```js
 const enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction[0]); // Up
// 编译后 var Up = 0 
    ......
```

#### 联合枚举与枚举成员的类型
当所有枚举成员都拥有字面量枚举值时，就带有了一种特殊的语义，即枚举成员成为了类型

```js
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

const a = 0;
console.log(a === Direction.Up) // true
//  我们把成员当做值使用，看起来是没问题的，因为成员值本身就是0

type c = 0;
declare let b: c

b = 1 // 不可以，不能将类型 ”1“ 分配给类型 ”0“
b = Direction.Up // ok

```

#### 联合枚举类型

```js
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare let a: Direction

enum Animal {
    Dog,
    Cat
}

a = Direction.Up // ok
a = Animal.Dog // Error
```
我们把a 声明为Direction类型，可以看成我们声明了一个联合类型，Direction.up | Direction.Down ...
只有这四个类型其中的成员才符合要求

#### 枚举合并
```js
enum Direction {
    Up,
    Down,
    Left,
    Right
}

enum Direction {
    Center = 5
}
```
#### 为枚举添加静态方法

```js
enum Month {
    January,
    February,
    March,
    April,
    May,
    July,
    August,
    September,
    October,
    November,
    December
}
// 命名空间
namespace Month {
    export function isSummer(month: Month) {
        switch(month) {
            case Month.June:
            case Month.May:
            case Month.July:
                return  true;
            default:
                return false;
        }
    }
}

console.log(Month.isSummer(Month.January)) // false
```

### 接口（Interface）
Typescript 核心原则之一是对值所具有的结构进行类型检查，有时被称为”鸭式变形法“或”结构性子类型化“

TypeScript里，接口作用就是为这些类型命名和为你的代码或第三方代码定义规约

#### 接口的使用
可选属性 只读属性

```js
interface User {
    name: string,
    age ?: number, // 可选属性
    readonly isMale: boolean // 只读属性
    say: (hello: string) => string
}


// eg

interface Config {
  width?: number;
}
// 可索引类型

// interface Config {
//   width?: number;
//   [propName: string]: any
// }

function CalculateAreas(config: Config): {area: number} {
  let square = 100;
  if (config.width) {
    square = config.width * config.width;
  }
  return { area: square };
}


// 接口继承

interface VIPUser extends User {
    broadcast: () => void
}

interface VIPUser extends User, SupperUser {
    broadcast: () => void
}
```
### Class

#### 抽象类

抽象类作为其他派生类的基类使用，一般不会直接实例化(接口可以定义方法，但不能实现方法，抽象类可以)， 通常需要创建子类继承基类，实例化子类
```js
abstract class Animal {
  abstract makeSound (): void;
  move (): void {
    console.log('roaming the earth ')
  }
}

class Cat extends Animal {
  makeSound (): void {
    console.log('miao miao');
  }
}

const cat = new Cat ();
cat.makeSound(); // miao miao
cat.move() // roaming the earth 

```

#### 访问限定符

- public

TS中 成员默认为public，被此限定符修饰的成员是可以被外部访问

- private

只可以在类的内部访问

- projected

只可以被内部类以及该类的子类访问

### 函数

函数是Javascript应用程序的基础，帮助你实现抽象层，模拟类，信息隐藏和模块

#### 定义函数类型

```js
const add = (a: number, b: number): number => a + b

// 函数参数可选
const add = (a?: number, b: number): number => a + (b ? b : 0)

// 默认参数

const add = (a: number, b = 10): number => a + (b ? b : 0)
// 剩余参数
const add = (a: number, ...rest: number[]) => rest.reduce(((a,b) => a + b), b)
```
#### 重载
```js
// 重载
interface Direction2 {
  top: number,
  right: number,
  bottom: number,
  left: number
}

function assigned(all: number): Direction2
function assigned(topAndBottom: number, leftAndRight: number): Direction2
function assigned(top: number, right: number, bottom: number, left: number): Direction2

function assigned(a: number, b?: number, c?: number, d?: any) {
  
}
```


### 泛型（generjc）

#### 多个类型参数

```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]

```
#### 泛型变量

```js
function getArrayLength<T>(args: Array:<T>) {
    console.log(args.length) // ok
    return args;
}
```
#### 泛型接口

```js
interface ReturnItemFn<T> {
    (para: T): T
}
const returnTiem: returnItemFn<number> = para => para;
```

#### 泛型类

```js
class Stack <T> {
    private arr T[] = [];
    public push(item: T) {
        this.arr.push(item);
    }
    public pop() {
        this.arr.pop();
    }
}
```

#### 泛型约束

我们要设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回的这个属性的值

```js
function getValues<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key] // ok
}
let a2 = {
  a: 1,
  b: 2
}
getValues(a2, a);
```
#### 使用多重类型进行泛型约束
泛型与new

```js
function factory<T>(type: {new (): T}): T {
    return new type() //ok
}
```
### 装饰器

装饰器是一种特殊类型的声明，能够被附加到类声明，方法，访问符，属性或参数上。使用@expression形式，
expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入

#### 类装饰器

类装饰器在类声明之前被声明（紧靠类声明），应用于类构造函数，可以用来监视，修改或者替换类定义，类装饰器不能再声明文件中，也不能用在任何外部上下文（比如declare的类）
类装饰器表达式会在运行时当做函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，他会使用提供的构造函数来替换类的声明

<b>注意：</b> 如果你要返回一个新构造函数，你必须处理好原来的原型链

```js
function addAge(target: Function) {
  target.prototype.age = 18;
  target.prototype.say = () => { console.log('say') }
}

@addAge
class Person2 {
  name: string;
  age!: number;
  say!: Function;
  constructor() {
    this.name = 'll';
  }
}

let person = new Person2();
console.log(person.age);
person.say();

 // 装饰器工厂
 function color(value: string) { // 这是一个装饰器工厂
   return function (target) { // 这是装饰器
     // do sth with target and value...
   }
 }

```
#### 方法装饰器
方法装饰器声明在一个方法的声明之前（紧靠方法声明），会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义，方法装饰器不能用在声明文件（.d.ts），重载，或者任何外部上下文（比如declare类）中

方法装饰器表达式会在运行时当做函数被调用，传入三个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 成员的属性描述符（如果输出target版本小于ES5，属性描述符会是undefined）

如果方法装饰器返回一个值，它会被用作方法的属性描述符
```js
// 声明装饰器修饰方法/属性
 function method( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   console.log(target);
   console.log("desc: ", JSON.stringify(descriptor) + "\n\n" );
   descriptor.writable = false;
 }

 class Person3 {
  name: string;
  constructor() {
    this.name = 'lc';
  }

  @method
  say() {
    return 'instance method'
  },
  @method
  static run () {
    return 'static method'
  }
 
 }
 ```

 #### 属性装饰器
 属性装饰器声明在一个属性声明之前（紧靠着属性声明），不能用于声明文件（.d.ts）,或者任何外部上下文里
 属性装饰器表达式会在运行时当做函数被调用，传入两个参数
  1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  2. 成员的名字

#### 参数装饰器（使用最广）
```js
function logParameter(target: Object, propertyKey: string, index: number) {
  console.log(target, propertyKey, index);
}

class Person3 {
  greet(@logParameter message: string, @logParameter name: string): string {
    return `${message} ${name}`;
  }
}

const p = new Person3();
p.greet('hello', 'lc'); // =>  Person3 { greet: [Function] } 'greet' 1

```

#### 元编程库

npm ： reflect-metadata



## TS2

#### 交叉类型

交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```js

function mixin<T extends object, U extends object>(first: T, second: U): T & U {
  const result: <T & U> = {};
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
console.log(x.b)
```
#### 联合类型

js中，希望属性为多种类型之一，如字符串或者数组

```js
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }
}
```

#### 类型别名

```js
type some = boolean | string
const b: some = true // ok
const c: some = 'hello' // ok

const d: some = 123 // error

type Tree< T > = {
  value: T;
  left: Tree <T>;
  right: Tree<T>;
}

```

interface 只能用于定义对象类型，而type的声明方式除了对象之外还可以定义交叉，联合，原始类型等，类型声明方式适用范围显然更加广泛。
但interface有其特定的用处：
- interface 方式可以实现接口的extends和implements
- interface 可以实现接口合并声明

### 可辨识联合类型
#### 字面量类型
```js
const b: 0x1919n = 6425n; // ok
const c: 'llc' = 'llc'; // ok
const d: false = false; // ok
const g: 'github' = 'pronhub'; // error
```
当字面量类型与联合类型结合的时候，可以模拟一个类似于枚举的效果：
```js
type Direction = 'North' | 'East' | 'South' | 'West'

function move(distance: number, direction: Direction) {
    // ...
}
 ```
#### 类型字面量

类型字面量不同于字面量类型，与JavaScript中对象字面量语法很相似：

```js
type Foo = {
    baz: [
        number,
        'llc'
    ],
    toString(): string,
    readonly [Symbol.iterator]: 'github',
    0x1: 'foo',
    "bar": 12n
}
```
#### 可辨识联合类型
```js

class Person {
  name = 'll';
  age = 18;
}

class Animal {
  name: 'lc';
  color: 'pink';
}

function getSomething(args: Person | Animal) {
  if (args instanceof Person) {
    console.log(args.color); // error;
    console.log(args.age);
  }

  if (args instanceof Animal) {
    console.log(args.color);
    console.log(args.age); // error
  }
}

function getSomething(args: Person | Animal) {
  if ('age' in args) {
    console.log(args.color); // error;
    console.log(args.age);
  }

  if ('color' in args) {
    console.log(args.color);
    console.log(args.age); // error
  }
}

```
#### 类型断言

```js
const person = {};
person.name = 'lc'; // Error : 'name' 属性不属于 ’{}‘
person.age = 20  // error

// 由于类型推断，person 类型为 {}, 根本不存在后面添加的那些属性，这样的写法在js中没有问题，但是开发者知道这个person是有属性的，只是一开始没有声明而已，但是typescript不知道，此时需要用类型断言

interface Person {
    name: string,
    age: number
}

const person = {} as Person;
person.name = 'lc';
person.age = 20

// 双重断言

const person = 'lc' as any as Person // ok

```
### 类型兼容性

#### 结构类型
TypeScript 里的类型兼容性是基于”结构类型的“，结构类型是一种只使用其成员来描述类型的方式，基本规则是：如果x要兼容y，那么y至少具有与x相同的属性.
如下： Dog 属性Person 都有，还多了其他属性，这种情况下Dog 兼容了Person， 反过来就不行。

```js
class Person {
  constructor(public weight: number, public name: string, public born: string) {}
}

interface Dog {
  name: string;
  weight: number
}

let x2: Dog = new Person(120, 'll', 'xa') // ok
```
#### 函数类型兼容性

函数类型兼容性判断，要看x是否能赋值给y，首先看参数列表，x的每个参数必须能在y里找到对应的参数，注意的是参数名字相同与否无所谓，只看类型。

```js

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
```

#### 类的兼容
仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查
```js
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
```

### is  关键字
```js
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
```
#### 可调用类型注解
```js
interface ToString {
   (): string;  // 注释掉这一行
   new(): string;
}

declare const somethingToString: ToString;
somethingToString()  // 这里就会报错
new somethingToString()
```
#### 索引类型

```js
 // TypeScript 简陋版

interface Obj {
    [key: string]: any
}

function pick(o: Obj, names: string[]) {
    return names.map( n => o[n]);
}

// 高级框架版

function pick <T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

const res = pick(user, ['token', 'id',])
```
#### 映射类型

现有一个User接口，有一个需求是： 把User接口中成员全部变成可选的，怎么做？ 这时候可以使用映射类型
语法： [K in keys]
- K: 类型变量，依次绑定到每个属性上，对应每个属性名的类型
- Keys: 字符串字面量构成的联合类型，表示一组属性名（的类型）
```js
type partial<T> = { [K in keyof T ]?: T[K]}

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
```

#### 条件类型与联合类型
条件类型有一个特征，就是「分布式有条件类型」，但是分布式有条件类型类型有前提，条件类型里待检查的类型必须是naked type parameter,

naked type parameter 指的是裸类型参数，「裸」指类型参数没有被包装在其他类型里，比如没有被数组，元祖，函数，Promise等等包裹
```js
// 裸类型参数
type NakedUsage<T> = T extends boolean ? "YES" : "NO"

// 参数被包裹在元祖内
type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO"

type Diff<T, U> = T extends U ? never : T;
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // 'b', 'd'
type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | (() => void), Function>;

// 删除null 和undefined
type NonNullable2<T> = Diff<T, null | undefined>;
type R2 = NonNullable2<string | number | undefined>;

```
### infer 关键字

infer 是工具类型和底层库中非常常用的关键字，表示在extends 条件语句中待推断的类型变量。
returnType 函数可以用于获取函数返回类型，你将如何设计一个returnType
```js
interface User {
  id: number,
  name: string,
  form?: string
}

type Foo = () => User
type ReturnType1<T> = T extends (...args: any[]) => infer P ? P : any;
type R5 = ReturnType1<Foo>  // User
```

####  类型递归
```js
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
```

#### 关键字
像 keyof，typeof ，type， inference,infer 关键字使用，还有Conditional Type 条件类型，
”+“, ”-"  这两个关键字用于映射类型中，给属性加上修饰符，比如 -？ 就代表将可选属性变为必选，-readonly代表将只读属性变为非只读。 TS 内置了一个工具Required<T> 将传入的属性变为必选项。

```js
type Required<T> = { [P in typeof T] -?: T[P] };
```

#### 常见工具类型
Exclude<T> : 作用是从T中排除出可分配给U的元素
可分配即assignable， T extends U 指得是T 是否可分配给U

```js
type Exclude<T,U> = T extend U ? never : T;
type T = Exclude< 1 | 2, 1 | 3> // -> 2
```
##### Omit 

Omit = Exclude + Pick
```js
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Foo = Omit<{name: string, age: number}, 'name'>
// Omit <T,K>  作用是忽略T中某些属性
```

##### Record

Record 允许从Union类型中创建新类型，Union类型中的值用作新类型的属性

```js

type Car = 'Audi' | 'BMW' | 'MercedesBenz';
type CarList = Record<Car, {age: number}>;

const cars: CarList = {
  Audi: { age: 119 },
  BMW: { age: 113},
  MercedesBenz: { age: 133 }
}

// 实战中尽量多用Record， 会帮助你规避很多错误，在Vue或者react中有很多场景选择record是更优解
```

### TypeScript 编译原理
#### 编译器组成
TypeScript有自己的编译器，主要由以下部分组成：
- Scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Emitter 发射器
- Checker 检查器

#### 编译器的处理

- 扫描器通过扫描源码生成Token流：（源码 + 扫描器 =》 Token流）
- 解析器将Token流解析为抽象语法树（AST）：（Token流 + 解析器 =》 AST抽象语法树）
- 绑定器将AST中的声明节点与相同实体的其他声明相连形成符号（Symbols），符号是语义系统的主要构造块： （AST + 绑定器 =》 Symble符号
- 检查器通过符号和AST来验证源代码的语义：（AST + 符号 + 检查器 =》 类型验证）

最后我们通过发射器生成Javascript代码： （AST + 检查器 + 发射器 =》 JS代码）

#### 编译器处理流程
- 解析
- 转换
- 生成


### 元数据
reflect-metadata
#### Vue 中使用TS
npm : vue-property-decorator  vue 属性装饰器

