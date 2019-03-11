import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/App.css';


import TransitionShell from './components/TransitionShell';

import Home from './pages/home';
import Content from './pages/Content';
import Blog from './pages/blog';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
        
             <Route exact path='/' component={TransitionShell(Home)}/>
              <Route path='/blogs' component={TransitionShell(Content)}/>
              <Route path='/portfolio' component={TransitionShell(Content)}/>
              <Route path='/blog' component={TransitionShell(Blog)}/>
          </div>
      </div>
    );
  }
}

export default App;
