import React, { Component } from 'react';
import Fade from 'react-reveal';
import LightBox from 'react-images';
import Img from 'react-images';
import parse from 'html-react-parser';
import {Image} from 'semantic-ui-react';
import history from '../history';
import '../css/blog.css';
import Header from '../components/Header';
import bkrnd from '../img/headerimg.png';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            title: '',
            date: '',
            paragraphs: ['',''],
            images: ['']
        }
        this.storeData = this.storeData.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
    }
    storeData() {
        window.onbeforeunload = () => {
            history.push({
                pathname: '/blog',
                state: { 
                    title: this.props.location.state.title,
                    date: this.props.location.state.date,
                    paragraphs: this.props.location.state.paragraphs,
                    images: this.props.location.state.images
                }
              });
        }
    }
    componentDidMount() {
        this.storeData()
        window.scrollTo(0,0);
    }

    openLightbox(index) {
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }
    goToPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }
    goToNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }
    render() {   
        return(
            <div className='blog-container'>
                <Header/>
                <Fade bottom>
                <div className='blog-wrapper'>
                    <div className='blog-header'>
                        <div className='blog-header-bkrnd'></div>
                        <div className='blog-header-content'>
                            <h1>{this.props.location.state.title}</h1>
                            <h2>{this.props.location.state.date}</h2>
                        </div>
                    </div>
                    <div className='blog-content'>
                    {
                        this.props.location.state.paragraphs.map((paragraph, i) => {
                        
                            return <div key={i}><p className='paragraph'>{parse(paragraph)}</p></div>
                        })
                    }
                     <div className='blog-content-imgs'>
                        {this.props.location.state.images.map((img, i) => {
                         
                            return <Image src={img.src} key={i} onClick={this.openLightbox.bind(this, i)}/>                     
                            })
                        }
                     </div>
                     <LightBox images={this.props.location.state.images}
                            onClose={this.closeLightbox}
                            onClickPrev={this.goToPrevious}
                            onClickNext={this.goToNext}
                            currentImage={this.state.currentImage}
                            isOpen={this.state.lightboxIsOpen}
                        />
                    </div>
                    
                    
                </div>
                </Fade>
            </div>
        )
    }
}

export default Blog;