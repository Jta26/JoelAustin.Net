import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import '../css/blogItem.css';

class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paraBit: ''
        }

    }
    gotoBlog() {
        console.log('fired')
        history.push({
            pathname: '/blog',
            state: { 
                title: this.props.title,
                date: this.props.date,
                paragraphs: this.props.paragraphs,
                images: this.props.images
            }
          });
    }
    componentDidMount() {
        
    }
    render() {
        return(
            <div className='blog-item-wrapper' onClick={this.gotoBlog.bind(this)}>
                
                <div className='blog-item-content'>
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.date}</h2>
                    <p>{this.props.paragraphs[0].length > 200 ? this.props.paragraphs[0].slice(0,190) + '...' : this.props.paragraphs}</p>
                    <img src={this.props.images[0].src}/>
                </div>

            </div>
        )
    }
}

export default BlogItem;