import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Redirect, Route, Routes} from 'react-router-dom'
import Home from './layouts/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/home`} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
