import { useEffect, useState, useCallback } from 'react';

interface Disconnect {
  disconnect: () => void;
}

export class Stateful<T> {
  // 设置监听器
  private listeners = new Set<(value: T) => void>();
  constructor(protected value: T) {};
  public snapshot(): T {
    return this.value;
  }

  private emit () {
    console.log("[组件发生了变化]");
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  protected update (value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit()
    }
  }

  subscribe(callback: (value: T) => void): Disconnect{
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      }
    }
  }
}

export class Atom<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}

class Selector<T> extends Stateful<T> {
  constructor(private readonly generate) {
    super(undefined as any);
    this.value = generate({get: (dep) => this.addSub(dep)});
  }
  private registerDeps = new Set<Stateful<any>>();
  private addSub(dep) {
    if (!this.registerDeps.has(dep)) {
      dep.subscribe;
    }
  }

  public updateSelector () {

  }
}

type SelectorGenerator<T> = (content:  {get: <V>(dep: Stateful<T>) => V}) => T;

export function selector<T>(value: {
 key: string,
 get: SelectorGenerator<T>
}) {
  return new Selector(value.get)
}
export function atom<V> (value: {key: string, default: V }) {
  return new Atom(value.default);
}



export function useRecoilValue<T> (value: Stateful<T>) {
  // return value.snapshot();

  const [, updateState] = useState({});
  useEffect(() => {
     const {disconnect } = value.subscribe(() => updateState({}));
     return () => disconnect();
  }, [value]);
  return value.snapshot();
}

export function useRecoilState<T> (atom: Atom<T>): [T, (value: T) => void] {
 const value = useRecoilValue(atom);
 // 更新了订阅者 () => updateState({})
 return [value, useCallback((value) => atom.setState(value), [atom])];
}