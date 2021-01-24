import * as React from 'react';

import Routes from '../router';
import { BrowserRouter } from 'react-router-dom';
const App = () => {
return <BrowserRouter basename="/">{ Routes() }</BrowserRouter>
}
export default App;