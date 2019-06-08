import React, { Component } from 'react';
import '../css/home.css';
import Typed from 'react-typed';
import Fade from 'react-reveal';
import { Grid, Image, Divider, Container } from 'semantic-ui-react';

import Header from '../components/Header';

import csharp from '../img/csharp.png';
import jsimg from '../img/js.png';
import pyimg from '../img/py.png';
import arrow from '../img/arrow.png';
import profimg from '../img/prof3.jpg';
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
                <div id='about'>
                    <img id='about-image' src={profimg}/>
                    <p id='about-content'>Hi there! My name is Joel Austin, and this website isn't just a place for you to learn about me. It's also a passion project of my own. As a software engineer, I am dedicated to designing and developing the very best. My specialties lie mostly in front end development, but I also have expierence in mobile and backend development, as well as a bit of data science. Other than code my hobbies include cooking for others, playing guitar, and studying japanese.</p>
                </div>
                <div >

                </div>
                <div id='experience'>
                    <p>Experience</p>
                    <div class='exp-item'>
                        <div class='exp-header'>
                            <p>Title</p>
                            <p>Date</p>
                        </div>
                        <div class='exp-content'>
                            <ul>
                                <li>test</li>
                                <li>testtesttestsseafsdfasd</li>
                            </ul>
                        </div>
                        
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home