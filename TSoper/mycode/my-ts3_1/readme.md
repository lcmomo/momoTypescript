## TS使用高级技巧

```ts
// 获取类的constructor的参数

class User {
  constructor(uname: string, age: number) {}
}

type TCtor = ConstructorParameters<typeof User>;

// use:

function init(...info: TCtor) {
  const [ uname ] = info;
  console.log('[uname]: ', uname);
}

init('momo', 20);


// 高级类型
// 1. 排除 Exclude
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>;

// 2. 两种类型中的共有属性
interface FirstType {
  id: number;
  firstName: string;
  lastName: string;
}

interface SecondType {
  id: number;
  address: string;
  city: string;
}

type ExtractType1 = Extract<keyof FirstType, keyof SecondType>;
type ExtractType2 = Exclude<keyof FirstType, keyof SecondType>;

// 3.

declare function create<T extends new() => any>(c: T): InstanceType<T>;

class MomoA {}
class MomoB {}

let a1 = create(MomoA);

// 4. IOC 见ioc.ts

// 5. NonNullable 从给定类型中剔除undefined和null类型
type TNon = NonNullable<string | number | undefined>;

// 6. 获取元素参数类型（Parameters）

type IFoo = (uname: string, uage: number) => { name: string, age: number }

type IBar = Parameters<IFoo>;

// 7. 取类型的一部分参数(Partial)变为可选
interface User {
  id: number;
  age: number;
}
type PartialUser = Partial<User>;

// 8. readonly

interface Person {
  readonly id: number
}

const data: Person = {
  id: 456
};
// data.id = 789

// 9. readonlyArray
// 10 Pick
interface User {
  id: number;
  age: number;
}
// type PartialUser = Partial<User>;
type PickUser = Pick<PartialUser, 'id'>;

// 11. Required 指定的类型的属性变为必须的
type PickUser2 = Required<PickUser>;

// 12. Record

type petGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petGroup, IPetInfo>;

// 13. returnType 参数返回值

// type IFoo = (uname: string, uage: number) => { name: string, age: number }

type T0 = ReturnType<IFoo>;


// ----------------------------------------------------------------------------

// 14. typeof、 keyof、 instanceof
// 15. [K in O]
// 16. + - ?

// 17.    ! // 非空声明

// 18. 变量 as number 和 <T> 变量  // 类型断言
// 19. is 函数返回类型的防护
```