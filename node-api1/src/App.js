// React
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import Home from './components/Home';
import UserList from './components/UserList';
// Styling
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={UserList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;