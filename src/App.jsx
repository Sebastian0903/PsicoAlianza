import './App.css';
import {BrowserRouter as Router, Switch, Redirect, Route, Routes} from 'react-router-dom'
import Home from './layouts/home';
import Inbox from './layouts/inbox';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import Empleados from './layouts/empleados';

function App() {
  initializeIcons();
  return (
    <Router>
      <Routes>
        <Route path={`/home`} element={<Home />} />
        <Route path={`/inbox`} element={<Inbox />} />
      </Routes>
    </Router>
  );
}

export default App;
