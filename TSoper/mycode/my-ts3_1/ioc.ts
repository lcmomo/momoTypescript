
declare function create<T extends new() => any>(c: T): InstanceType<T>;
interface IContainer{
  callback: () => {};
  singleton: boolean;
  instance?: {}
}
interface NewAble<T> {
  new (...args: any[]): T;
}

type TBind<T> = [
  key: string,
  Fn: NewAble<T>
]
class CreateIoc {
  private container: Map<PropertyKey, IContainer>;

  constructor() {
    this.container = new Map<string, IContainer>();
  }
  public bind<T>(...params: TBind<T>) {
    const [key, Fn] = params;
    const callback = () => new Fn();
    this.container.set(key, { callback, singleton: false });
  }

  public singleton<T>(...params: TBind<T>) {
    const [key, Fn] = params;
    const callback = () => new Fn();
    this.container.set(key, { callback, singleton: true });
  }

  public use<T>(namespace: string) {
    const item = this.container.get(namespace);
    if (item !== undefined) {
      if (item.singleton && !item.instance) {
        item.instance = item.callback();
      }
      // return item.singleton ? (item.instance as T) : (item.callback() as T);
      return item.singleton ? item.instance : item.callback();
    } else {
      throw new Error('没有找到item')
    }
  }
}

interface IUserService {
  test(str: string): void;
}

class UserService implements IUserService {
  test(str: string): void {
    console.log('[ str ]', str);
  }

}

const ioc = new CreateIoc();

ioc.bind('userService', UserService);
const user = ioc.use<IUserService>('userService');
// user.test('momo🏮');