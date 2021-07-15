import React from 'react';
import './App.css';
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Nav from "./components/Nav"
import WeeklyBoard from "./components/WeeklyBoard"
import ClientsPage from './components/ClientsPage';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/about" component={About} />
      <Route exact path="/clientsPage/" component={ClientsPage} />
      <Route path="/weeklyBoard/:id" component={WeeklyBoard} />
    </Router>
    </div>
  );
}

export default App;