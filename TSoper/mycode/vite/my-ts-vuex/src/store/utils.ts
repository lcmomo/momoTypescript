import { modules } from './modules';

// 获取单个getters
type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown;
// 获取所有的modules中的getters
type GetGetters<M> = {
  [K in keyof M]: GetGetter<M[K]>;
}
// 测试 找到每一个模块里的getters
type ModulesGetters = GetGetters<typeof modules>;
//user/isLogin
type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`;
type GetSpliceKey<Module, Key> = AddPrefix<Key, keyof Module>;

type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<Modules[K], K>;
}[keyof Modules]
//k ==> user  Modules指代下面的对象
// user: {
//     isLogin: (state: {
//         loading: boolean;
//     }) => string;
// };
// type xx = GetSpliceKeys<ModulesGetters>;
type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>];
}

export type Getters = GetSpliceObj<ModulesGetters>;