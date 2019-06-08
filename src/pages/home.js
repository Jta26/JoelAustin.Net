import React, { Component } from 'react';
import '../css/home.css';
import Typed from 'react-typed';
import Fade from 'react-reveal';
import { Grid, Image, Divider, Container } from 'semantic-ui-react';

import Header from '../components/Header';

import csharp from '../img/csharp.png';
import jsimg from '../img/js.png';
import pyimg from '../img/python.png';
import reactimg from '../img/react.png';
import nodeimg from '../img/nodejs.png';
import angularimg from '../img/angular.png';
import gitimg from '../img/git.png';
import mysqlimg from '../img/mysql.png';
import mongodbimg from '../img/mongodb.png';
import firebaseimg from '../img/firebase.png'
import arrow from '../img/arrow.png';
import profimg from '../img/prof4.jpg';
import profimg2 from '../img/prof2.jpg';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                [csharp, 'Knowledgeable in .NET applications including console, form, and ASP, and Xamarin.' ],
                [jsimg, 'Specialty in Javascript Apps. React, React-Native, Angular, as well as Node.js.'],
                [pyimg, 'Excellent Python skills using packages such as Numpy, Pandas, BeautifulSoup, and Flask.']],
            skillScroll: false,
            abtimghidden: false,

        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return(
            
            <div className='container'>
            <Header
            
            />
                <div className='top' >
                    
                    <div className='typed'>
                    <Typed
                        strings={['Developer', 'Programmer', 'Joel Austin^2000.Net']}
                        typeSpeed={80}
                        backspeed={50}
                    />
                    </div>
                    <div className='scrollto'>
                        <a href='#about'>
                        <Fade>
                            <p>Scroll</p>
                            <Image src={arrow} size='mini' centered/>
                        </Fade>
                        </a>
                    </div>
                </div>
                <br/>
                <div id='about'>
                    <img id='about-image' src={profimg}/>
                    <p id='about-content'>Hi there! My name is Joel, and this website isn't just a place for you to learn about me. It's also a passion project of my own. As a software engineer, my specialties lie mostly in front end development, but I also have expierence in mobile and backend development, as well as a bit of data science. Other than code, my hobbies include cooking for others, playing guitar, and studying japanese.</p>
                </div>
                <div id='content-wrapper'>
                    <div class='content-item'>
                        <h2>My Experiences</h2>
                        <div class='exp-item'>
                            <div class='title'>
                                <div class='right'>
                                    <div class='comp'>IPC Systems Inc.</div>
                                    <div class='job'>Software Engineer Intern</div>
                                </div>
                                <div class='left'>
                                    <p>2018 - Present</p>
                                </div>
                                
                            </div>
                            <ul>
                                <li>Contributed to to large Angular application.</li>
                                <li>Developed full-stack system for parsing excel data using Pandas, Flask, MySQL, and JavaScript. </li>
                                <li>Worked closely with product and UX teams to deliver and maintain code.</li>
                                <li>Hired after inital Internship to work remotely form school, returned second summer.</li>
                            </ul>   
                        </div>
                        <div class='exp-item'>
                            <div class='title'>
                                <div class='right'>
                                    <div class='comp'>University of Pittsburgh at Bradford</div>
                                    <div class='job'>Web Programming Assistant</div>
                                </div>
                                <div class='left'>
                                    <p>2017 - 2018</p>
                                </div>
                            </div>
                            <ul>
                                <li>Managed ASP.NET based CMS for university website making changes in C#, HTML, CSS, and JavaScript.</li>
                                <li>Communicated with university departments to tailor web content to their needs.</li>
                                <li>Updated old content to be modern and mobile-oriented.</li>
                            </ul> 
                        </div>
          
                    <div class='exp-item'>
                            <div class='title'>
                                <div class='right'>
                                    <div class='comp'>Pitt Mobile App Challenge Winner</div>
                                    <div class='job'>2 Consecutive Years</div>
                                </div>
                                <div class='left'>
                                    <p>2017 - 2018</p>
                                </div>
                            </div>
                            <ul>
                                <li>Winner of university-wide mobile app development competition 2 years in a row.</li>
                                <li>Developed Android app around matching people tinder-style based on languages they know or want to learn.</li>
                                <li>Created social experience for Android and iOS centered around hosting events in university dorm communities using React-Native and Google Firebase.</li>
                            </ul> 
                        </div>
                    </div>
                    <div class='content-item'>
                        <div class='skills'>
                            <h2>Some Tech I Love!</h2>
                            <div class='skill'>
                                <img src={reactimg}/>
                                <img src={angularimg}/>
                                <img src={nodeimg}/>
                                <img src={pyimg}/>
                                <img src={firebaseimg}/>
                                <img src={mysqlimg}/>
                                <img src={mongodbimg}/>
                                <img src={gitimg}/>
                                
                                <img/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home