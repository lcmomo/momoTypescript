import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  atom,
  useRecoilValue,
  useRecoilState,
  selector
} from './recoil';

const textState = atom({
  key: 'textState',
  default: '11111'
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

const App: React.FC = () => {
  const value = useRecoilValue(charCountState);
  const [text, setText] = useRecoilState();
  const onClick = () => {
    console.log('点击执行了');
    setText(Math.random().toString());
  }
   return (
   <>
    <h1>{value}</h1>
   <h2>{text}</h2>
   <button onClick={onClick}>修改数据</button>
   </>
  );
}

export default App;
