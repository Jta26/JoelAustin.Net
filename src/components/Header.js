import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';
import { Grid, Image, Divider, Container } from 'semantic-ui-react';

import githubimg from '../img/github.svg';
import githubwhite from '../img/githubwhite.png';
import linkedinimg from '../img/linkedin.svg';
import linkedinwhite from '../img/linkedinwhite.png';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: githubwhite,
      linkedin: linkedinwhite
    }
  }

  render() {
    return (
      <div className='header-wrapper'>
        <div className='nav-wrapper'>
              <Link to='/' className='nav-item'>Index</Link>
              <Link to='/blogs' className='nav-item'>Blog</Link>
              <Link to='/portfolio' className='nav-item'>Portfolio</Link>
          {/* <div className='nav-mobile'>
              <Link to='/' className='nav-mobile-item'>Index</Link>
              <Link to='/blogs' className='nav-mobile-item'>Blog</Link>
              <Link to='/portfolio' className='nav-mobile-item'>Portfolio</Link>
          </div> */}
        </div>
        <div className='social-wrapper'>
            <a href='http://github.com/jta26' target='_blank'>
              <img 
              src={this.state.github} 
              onMouseEnter={() => {this.setState({github: githubimg})}}
              onMouseLeave={() => {this.setState({github: githubwhite})}}/>
            </a>
            <a href='https://www.linkedin.com/in/joel-austin/' target='_blank'>
              <img 
              src={this.state.linkedin}
              onMouseEnter={() => {this.setState({linkedin: linkedinimg})}}
              onMouseLeave={() => {this.setState({linkedin: linkedinwhite})}}
              />
            </a>
            

        </div>
      </div>
    );
  }
}

export default Header;
