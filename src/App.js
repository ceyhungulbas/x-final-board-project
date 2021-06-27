import React from 'react';
import './App.css';
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Nav from "./components/Nav"

import WeeklySchedule from './components/WeeklySchedule';

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
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route exact path="/weeklyschedule" component={WeeklySchedule} />
    </Router>
    </div>
  );
}

export default App;