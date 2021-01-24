// import * as React from 'react';

// const Banner = () => {
//     return (
//       <span>Banner</span>
//     )
// }


//  export default Banner;

import * as React from 'react';

const { useRef, useCallback } = React;

import { observer, useObservable, useObserver } from 'mobx-react-lite';

const TodoList = () => {
  const todos = useObservable(new Map<string, boolean>());
  const todoRef = useRef();
  const addTodo = useCallback(
    () => {
      todos.set(todoRef.current.value, false);
      todoRef.current.value = ""
    },
    [],
  );

  const toggleTodo = useCallback(
    (todo: string) => {
      todos.set(todo, !todos.get(todo))
    },
    [],
  );

  return useObserver(() => (
    <div>
      {
        Array.from(todos).map(([todo, done]) => (
          <div onClick={ () => toggleTodo(todo)} key={ todo }>
            {todo}
            {todo ? "✅" : "❌"}
          </div>
        ))
      }
      <input ref={ todoRef } />
      <button onClick={ addTodo }>Add Todo</button>
    </div>
  ))
}

export default TodoList;