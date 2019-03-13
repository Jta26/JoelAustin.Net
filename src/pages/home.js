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
                    <div className='skills'  id='about'>

                        <Grid columns={3} stackable divided>
                            <Grid.Row>
                                {this.state.images.map((img, i) => {
                                return (
                                    <Grid.Column key={i}>
                                        <Grid columns={2}>
                                            <Grid.Row centered>
                                                <Grid.Column mobile={5}>
                                                    <Image src={img[0]} size='small'/>
                                                    
                                                </Grid.Column>
                                                <Grid.Column mobile={10}>
                                                <h1>{img[1]}</h1> 
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                    </Grid.Column>
                                )
                            })}
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div  className='about-wrapper'>
                            <Grid columns={2} stackable divided>
                                <Grid.Row>
                                    <Grid.Column computer={5} mobile={16} className='prof-img-wrapper'>
                                        <div 
                                            className='prof-img'
                                        >
                                            <Image src={profimg} size='medium' circular bordered hidden={this.state.abtimghidden} centered 
                                            onMouseEnter={() => {this.setState({abtimghidden: !this.state.abtimghidden})}}
                                            />
                                            <Image src={profimg2} size='medium' circular bordered hidden={!this.state.abtimghidden} centered
                                            
                                            onMouseLeave={() => {this.setState({abtimghidden: !this.state.abtimghidden})}}/>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column computer={9} mobile={16} >
                                        <div className='abt-text'>
                                            <h1>I am currently a student at the University of Pittsburgh who also works remotely for IPC Systems Inc, a mid-size company headquartered in the Jersey City and Manhattan Area. At IPC Systems, I contribute towards a large Javascript desktop and mobile application. My hobbies (besides coding) include cooking and playing of the guitar.</h1>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                 
                </Fade>    
                
            </div>
        )
    }
}

export default Home