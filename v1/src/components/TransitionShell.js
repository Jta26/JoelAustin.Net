import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TransitionShell = (RouteComp) => {
  
  return props =>
    <div className="RouteComp">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={'Fade'}
      >
      {console.log(props)}
        <RouteComp {...props} />
      </ReactCSSTransitionGroup>
    </div>;
};

export default TransitionShell;
