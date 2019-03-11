import React, { Component } from 'react';
import '../css/blogs.css';
import Header from '../components/Header';
import BlogItem from '../components/blogItem';
import Fade from 'react-reveal';
import blogs from '../data/blogs.json';
import portfolio from '../data/portfolio.json';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            msg: ''
        }
        this.isBlogsOrPortfolio = this.isBlogsOrPortfolio.bind(this)
    }
    isBlogsOrPortfolio() {
        var path = this.props.location.pathname;
        console.log(path);
        if (path === '/blogs') {
            this.setState({content: blogs});
        }
        else if (path === '/portfolio') {
            this.setState({content: portfolio});
        }
        else {
            this.setState({
                content: [],
                msg: '404, There was Nothing Found'
            });
        }

    }
    componentDidMount() {  
        this.isBlogsOrPortfolio();
    }
    render() {
        return(
            <div className='blogs-container'>
                <Header/>
                <div className='blogs-wrapper'>
                    {this.state.content.map((item, i) => {
                        return(
                            <div key={i}>
                            <Fade bottom>
                            <BlogItem
                                title={item.title}
                                date={item.date}
                                week={item.week}
                                paragraphs={item.paragraphs}
                                images={item.images}
                            />
                            </Fade>
                            </div>
                            
                        )
                        
                    })}
                    <div className='phantom'>
                    <BlogItem
                    title={''}
                    date={''}
                    week={''}
                    paragraphs={['']}
                    images={['']}

                    />
                    </div>
                    <div className='phantom'>
                    <BlogItem
                    title={''}
                    date={''}
                    week={''}
                    paragraphs={['']}
                    images={['']}

                    />
                    </div>

                    
                </div>
            </div>
        )
    }
}

export default Content;