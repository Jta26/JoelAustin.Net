import React, {Component} from 'react';
import '../css/imgtext.css';

class ImgText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='imgText'>
                <div className='img-wrapper'>
                    <img src={this.props.img}/>
                </div>
                <div className='text-wrapper'>
                <p>{this.props.text}</p>
                </div>
            </div>
        )
    }


}

export default ImgText;