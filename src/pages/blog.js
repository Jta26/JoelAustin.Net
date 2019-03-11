import React, { Component } from 'react';
import Fade from 'react-reveal';
import LightBox from 'react-images';
import parse from 'html-react-parser';
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
        this.getInitialState = this.getInitialState.bind(this);
        this.storeData = this.storeData.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
    }
    getInitialState() {
        
        var title =  this.props.location.state.title || localStorage.getItem('title');
        var date = this.props.location.state.date || localStorage.getItem('date');
        var paragraphs = this.props.location.state.paragraphs || localStorage.getItem('paragraphs');
        var images = this.props.location.state.images || localStorage.getItem('images');
        console.log('INDATA:', title, date, paragraphs, images);
        this.setState({
            title: title,
            date: date,
            paragraphs: Array.from(paragraphs),
            images: Array.from(images)
        });
        
        
    }
    storeData() {
        window.onbeforeunload = () => {
            console.log('Storing STATE');
            localStorage.setItem('title', this.state.title);
            localStorage.setItem('date', this.state.date);
            localStorage.setItem('paragraphs', this.state.paragraphs);
            localStorage.setItem('images', this.state.images);
        }
    }
    componentDidMount() {
        this.storeData()
        this.getInitialState();

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
                            <h1>{this.state.title}</h1>
                            <h2>{this.state.date}</h2>
                        </div>
                    </div>
                    <div className='blog-content'>
                    {
                        this.state.paragraphs.map(paragraph => {
                        
                            return <p className='paragraph'>{parse(paragraph)}</p>
                        })
                    }
                     <div className='blog-content-imgs'>
                        {this.state.images.map((img, i) => {
                            return <img src={img.src} onClick={this.openLightbox.bind(this, i)}/>                     
                            })
                        }
                     </div>
                     <LightBox images={this.state.images}
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