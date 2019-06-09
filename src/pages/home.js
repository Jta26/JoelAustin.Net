import React, { Component } from 'react';
import '../css/home.css';
import Typed from 'react-typed';
import { Fade, Slide } from 'react-reveal';
import { Grid, Image, Divider, Container } from 'semantic-ui-react';


import Header from '../components/Header';

import csharp from '../img/csharp.png';
import jsimg from '../img/js.png';
import pyimg from '../img/python.png';
import androidimg from '../img/android.png';
import reactimg from '../img/react.png';
import nodeimg from '../img/nodejs.png';
import angularimg from '../img/angular.png';
import gitimg from '../img/git.png';
import mysqlimg from '../img/mysql.png';
import mongodbimg from '../img/mongodb.png';
import awsimg from '../img/aws.png';
import firebaseimg from '../img/firebase.png'
import arrow from '../img/arrow.png';
import profimg from '../img/prof4.jpg';
import profimg3 from '../img/prof3.jpg';
import { readFile } from 'fs';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                [csharp, 'Knowledgeable in .NET applications including console, form, and ASP, and Xamarin.' ],
                [jsimg, 'Specialty in Javascript Apps. React, React-Native, Angular, as well as Node.js.'],
                [pyimg, 'Excellent Python skills using packages such as Numpy, Pandas, BeautifulSoup, and Flask.']],
            aboutScroll: false,
            exp1Scroll: false,
            exp2Scroll: false,
            exp3Scroll: false,
            exp4Scroll: false,
            isAboutHover: false,
        }
        this.calculateScroll = this.calculateScroll.bind(this);
        this.onAboutImageHover = this.onAboutImageHover.bind(this);

    }
    componentDidMount() {
        this.cont.addEventListener('scroll', () => {
            let val = this.calculateScroll(this.aboutRef);
            if (val != this.state.aboutScroll) {
                this.setState({aboutScroll : val});
            }
            let exp1val = this.calculateScroll(this.exp1);
            if (exp1val != this.state.exp1Scroll) {
                this.setState({exp1Scroll : exp1val});
            }
            let exp2val = this.calculateScroll(this.exp2);
            if (exp2val != this.state.exp2Scroll) {
                this.setState({exp2Scroll: exp2val});
            }
            let exp3val = this.calculateScroll(this.exp3);
            if (exp3val != this.state.exp3Scroll) {
                this.setState({exp3Scroll: exp3val});
            }
            let exp4val = this.calculateScroll(this.exp4);
            if (exp4val != this.state.exp4Scroll) {
                this.setState({exp4Scroll: exp4val});
            }
        });
    }
    componentWillUnmount() {

    }
    calculateScroll(ref) {
        let currentScroll = this.cont.scrollTop * 2;
        let refTop = ref.offsetHeight + ref.offsetTop;
        // console.log('calculating scroll for ' + currentScroll, refTop, ref.offsetHeight, ref.offsetTop);
        if (currentScroll + 400  > refTop) {
            return true;
        }
        else {
            return false;
        }
    }
    onAboutImageHover() {
        this.setState({isAboutHover: !this.state.isAboutHover});
    }
    componentDidUpdate() {
        // console.log('update ' + this.state.scrollHeight, window.scrollY, window.innerHeight);
    }
    render() {
        return(
            
            <div className='container' ref={elem => this.cont = elem}>
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
                        <div onClick={() => this.cont.scrollTop = this.aboutRef.offsetTop}>
                                <p>Dive Deeper</p>
                    
                        </div>
                    </div>
                </div>
                <br/>
                <h1 id='about-me' ref={ref => this.aboutRef = ref}>About Me</h1>
                <div>
                <div id='about'>
                    <Fade left duration={1000} appear when={this.state.aboutScroll}>
                        <div>
                        <img onMouseEnter={this.onAboutImageHover} onMouseLeave={this.onAboutImageHover} id='about-image' src={this.state.isAboutHover ? profimg3 : profimg}/>
                        </div>
                        
                    </Fade>
                    <Fade right duration={1000} appear when={this.state.aboutScroll}>
                        <p id='about-content'>Hi there! My name is Joel, and this website isn't just a place for you to learn about me. It's also a passion project of my own. As a software engineer, my specialties lie mostly in front end web development, but I also have experience in mobile and backend development, as well as a bit of data science. Other than code, my hobbies include cooking for others, playing guitar, and studying japanese.</p>
                    </Fade>
                   
                </div>
                </div>

                
                <div id='content-wrapper'>
                    <div className='content-item'>
                        <h2>My Best Experiences</h2>
                        <div id='experiences'>
                        <Fade bottom duration={1000} when={this.state.exp1Scroll}>

                            <div className='exp-item' ref={ref => this.exp1 = ref}>
                            <a href='https://www.ipc.com/' target='__blank'>
                                <div className='title'>
                                    <div className='left'>
                                        <div className='comp'>IPC Systems Inc.</div>
                                        <div className='job'>Front-End Software Engineer Intern</div>
                                    </div>
                                    <div className='right'>
                                        <p>2018 - Present</p>
                                    </div>
                                </div>
                                <ul>
                                    <li>Collaborated with a small team to design, develop, and demo feature using Angular that pulled and parsed online calendar data for conference call information.</li>
                                    <li>Created full-stack system to analyze/visualize company user data in excel with Python, MySQL, and JavaScript.</li>
                                    <li>Utilized test-driven development practices using Jest.</li>
                                    <li>Worked closely with product and UX teams to deliver and maintain code.</li>
                                    <li>Hired After initial internship to work remotely.</li>
                                </ul> 
                            </a>
                            </div> 
                        </Fade>
                        <Fade bottom duration={1000} delay={250} when={this.state.exp2Scroll}>
                                <div className='exp-item' ref={ref => this.exp2 = ref}>
                            <a href='https://github.com/Jta26/Pitt-Menu' target='__blank'>
                                <div className='title'>
                                    <div className='left'>
                                        <div className='comp'>Undergraduate Capstone Project</div>
                                        <div className='job'>Full-Stack System w/ React, Node.JS, MySql, and Python</div>
                                    </div>
                                    <div className='right'>
                                        <p>2017 - 2018</p>
                                    </div>
                                </div>
                                <ul>
                                    <li>Developed full-stack system dedicated to parsing and visualizing university cafeteria menus.</li>
                                    <li>Parsed PDF files of menus for food info organized by date using Python.</li>
                                    <li>Created mobile friendly React app for users to view menu for the day, as well as rate, comment, and post images.</li>
                                    <li>Developed Restful API with Node.js for transacting data between MySQL database and multiple front-end clients.</li>
                                    <li>Integrated Google Home support so users could ask what the menu was a given day.</li>
                                </ul> 
                            </a>
                            </div> 
                        </Fade>
                        <Fade bottom duration={1000} delay={500} when={this.state.exp3Scroll}>
                                <div className='exp-item' ref={ref => this.exp3 = ref}>
                                <a href='https://www.technology.pitt.edu/software/2018-pitt-mobile-app-challenge-winners' target='__blank'>
                                    <div className='title'>
                                        <div className='left'>
                                            <div className='comp'>Pitt Mobile App Challenge Winner</div>
                                            <div className='job'>2 Consecutive Years</div>
                                        </div>
                                        <div className='right'>
                                            <p>2017 - 2018</p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>2nd place Winner of university-wide mobile app development competition 2 years in a row.</li>
                                        <li>Developed Android app around matching people tinder-style based on languages they know or want to learn.</li>
                                        <li>Created social experience for Android and iOS centered around hosting events in university dorm communities using React-Native and Google Firebase.</li>
                                        <li>$2000 prize each years.</li>
                                    </ul> 
                                </a>
                                
                            </div>
                            </Fade>
                            <Fade bottom duration={1000} delay={750} when={this.state.exp4Scroll}>
                                <div className='exp-item' ref={ref => this.exp4 = ref}>
                                <a href='https://upb.pitt.edu' target='__blank'>
                                    <div className='title'>
                                        <div className='left'>
                                            <div className='comp'>University of Pittsburgh at Bradford</div>
                                            <div className='job'>Web Programming Assistant</div>
                                        </div>
                                        <div className='right'>
                                            <p>2017 - 2018</p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>Managed ASP.NET based CMS for university website making changes in C#, HTML, CSS, and JavaScript.</li>
                                        <li>Communicated with university departments to tailor web content to their needs.</li>
                                        <li>Updated old content to be modern and mobile-oriented.</li>
                                    </ul> 
                                </a>
                                
                            </div> 
                            </Fade>
                        </div>
                        
                     
                      
                        
          

                    </div>
                    <div className='content-item'>
                        <div className='skills'>
                            <h2>Some Tech I Love!</h2>
                            <div className='skill'>
                            <Fade right when={this.state.expScroll} cascade>
                                <ul>
                                    <li><a href='https://reactjs.org/' target='__blank'><img src={reactimg}/></a></li>
                                    <li><a href='https://angular.io/' target='__blank'><img src={angularimg}/></a></li>
                                    <li><a href='https://nodejs.org/en/' target='__blank'><img src={nodeimg}/></a></li>
                                   
                                    <li><a href='https://www.python.org/' target='__blank'><img src={pyimg}/></a></li>
                                    <li><a href='https://www.android.com/' target='__blank'><img src={androidimg}/></a></li>
                                    <li><a href='https://firebase.google.com/' target='__blank'><img src={firebaseimg}/></a></li>
                                    <li><a href='https://aws.amazon.com/' target='__blank'><img src={awsimg}/></a></li>
                                    <li><a href='https://www.mysql.com/' target='__blank'><img src={mysqlimg}/></a></li>
                                    <li><a href='https://www.mongodb.com/' target='__blank'><img src={mongodbimg}/></a></li>
                                    <li><a href='https://git-scm.com/' target='__blank'><img src={gitimg}/></a></li>
                                    <li><img/></li>   
                                    <li><img/></li>  
                                </ul>
                            </Fade>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 id='projects' >Projects</h1>
                <div id='projects'>
                    <div className='project'>
                        <img src={reactimg}/>
                        <h3>title</h3>
                    </div>
                    <div className='project'>
                        <img src={reactimg}/>
                        <h3>title</h3>
                    </div>
                    <div className='project'>
                        <img src={reactimg}/>
                        <h3>title</h3>
                    </div>
                    <div className='project'>
                        <img src={reactimg}/>
                        <h3>title</h3>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home