// interface Result {
//     title: string;
// }

// interface ImomoData {
//     data: string;
//     result: Result;
// }

// class Test {
//     private data;
//     constructor(str: ImomoData ) {
//         this.data = str.data;
//     }
//     log () {
//         console.log(this.data)
//     }
// }

// const test = new Test({
//     data: 'momo',
//     result: {
//         title: '小菜鸟'
//     }
// })

// test.log()

import * as React from 'react';
import * as  ReactDOM from 'react-dom'

import App from './pages/app'

ReactDOM.render(<App />, document.getElementById('main'))
