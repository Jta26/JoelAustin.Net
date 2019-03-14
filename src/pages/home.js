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
import profimg from '../img/prof.jpg';
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
                <Fade bottom>
                    {/* <div className='about' id='about'>
                        <ImgText img={profimg} text='I am currently a student at the University of Pittsburgh who also works remotely for IPC Systems Inc, a mid-size company headquartered in the Jersey City and Manhattan Area. At IPC Systems, I contribute towards a large Javascript desktop and mobile application. My hobbies (besides coding) include cooking and playing of the guitar.'/>
                    </div> */}
                    <div className='about' id='about'>
                            <div className='img-wrapper'>
                                <img src={profimg}/>
                            </div>
                            <p>I am a student at the University of Pittsburgh who also works remotely for IPC Systems Inc, a mid-size company headquartered in the Jersey City and Manhattan Area. At IPC Systems, I contribute towards a large Javascript desktop and mobile application. My hobbies (besides coding) include cooking and playing of the guitar.</p>
                        </div>

                </Fade>  
                    <div className='skills'  id='skills'>
                        
                        <div className='skill'>
                            <Fade bottom>
                            <div className='img-wrapper'>
                                <img src={csharp}/>
                            </div>
                            <p>Knowledgeable in .NET applications including console, form, and ASP, and Xamarin.</p>

                            </Fade>
                        </div>
                        <div className='skill'>
                            <Fade bottom>
                            <div className='img-wrapper'>
                                <img src={jsimg}/>
                            </div>
                            <p>Specialty in Javascript Apps. React, React-Native, Angular, as well as Node.js.</p>                            
                            </Fade>

                        </div>
                        <div className='skill'>
                            <Fade bottom>
                            <div className='img-wrapper'>
                                <img src={pyimg}/>
                            </div>
                            <p>Excellent Python skills using packages such as Numpy, Pandas, BeautifulSoup, and Flask.</p>
                            </Fade>

                        </div>
                        {/* <ImgText img={csharp} text='Knowledgeable in .NET applications including console, form, and ASP, and Xamarin.'/>
                        <ImgText img={jsimg} text=''/>
                        <ImgText img={pyimg} text='Excellent Python skills using packages such as Numpy, Pandas, BeautifulSoup, and Flask.'/> */}
                    </div>
                 
                 
                
            </div>
        )
    }
}

export default Home