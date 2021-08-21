import { parseScript } from 'esprima'
import { Pattern } from 'estree';
import 'reflect-metadata'
import CreateIoc from './ioc';

const container = new CreateIoc();

interface ITypes {
  [key: string]: Symbol;
}

const TYPES: ITypes = {
  indexService: Symbol.for('indexService')
}

interface IIndexService {
  log(str: string): void
}

class IndexService implements IIndexService {
  public log(str: string) {
    console.log(str);
  }
}

container.bind(TYPES.indexService, () => new IndexService());
// 获取函数参数名
function getParams(fn: Function) {
  const ast = parseScript(fn.toString());
 
  const node = ast.body[0];
  console.log('ast: ', node);
  let fnParams: Pattern[] = [];
  if (node.type === 'FunctionDeclaration') {
    fnParams = node.params;
  }
  let validParams: string[] = [];
  fnParams.forEach((obj) => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name);
    }
  });
  console.log('validParams: ', validParams);
  return validParams;
}

// 判断对象是否有对应的key
function hasKey<O extends Object>(obj: O, key: keyof any):  key is keyof O {
  return obj.hasOwnProperty(key);
}

function inject(serviceIdentifier: Symbol): Function {
  console.log('step 1:  enter inject.... ')
  return (target: Function, targetKey: string, index: number) => {
    console.log('step 2: ', '对具体构造函数的装饰')
    if (!targetKey) {
      // 这里就可以劫持了
      // target['indexService'] = new IndexService();
      Reflect.defineMetadata(serviceIdentifier, container.get(serviceIdentifier), target);
    }
  }
}

function controller<T extends { new (...args: any[]): {} }> (constructor: T) {
  console.log('step3: ', '对类进行修饰的函数');
  class Controller extends constructor {
    
    constructor(...args: any[]) {
      console.log('step4: ', '真正的修饰类')
      console.log("constructor: ", constructor.toString());
      // getParams(controller);
      super(args);
      const _params = getParams(constructor);
      let _identity: string;
      for (_identity of _params) {
        const _meta = Reflect.getMetadata(TYPES[_identity], constructor);
        if (hasKey(this, _identity)) {
          // this[_identity] = new IndexService();
          console.log("_identity: ", _identity)
          // this[_identity] = container.get(TYPES[_identity]);
          this[_identity] = _meta;
        }
      }
    }
  }
  return Controller;
}
@controller
class IndexController {
  private indexService: IIndexService;
  constructor (@inject(TYPES.indexService) indexService: IIndexService) {
    this.indexService = indexService;
    console.log("我是原来的构造函数")
  }
  info () {
    this.indexService.log('llc');
  }
}
// 1. controller + indexService 耦合在一起了（傻瓜写法）
// const indexService = new IndexService();
// const indexController = new IndexController(indexService);
// indexController.info()

// 2. 需要的参数透传出来

const indexService = new IndexService();
const index = new IndexController(indexService);

index.info();

// 3 DI 进行更深层次的代码托管 IOC 流程，缓存等
