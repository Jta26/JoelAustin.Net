import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import './css/App.css';
import history from './history';

import TransitionShell from './components/TransitionShell';

import Home from './pages/home';
import Content from './pages/Content';
import Blog from './pages/blog';



class App extends Component {
  initializeReactGA() {
    console.log('GA initialized');
    ReactGA.initialize('UA-136074176-1');
    ReactGA.pageview('/homepage');
  }
  componentDidMount() {
    
    this.initializeReactGA();
    history.listen(location => ReactGA.pageview(location.pathname));
  }
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
