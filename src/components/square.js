import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Square extends PureComponent {
  render() {
    const {
      type,
      clickHandler
    } = this.props;
    // Square states
    // 0 = none
    // 1 = wall
    // 2 = start
    // 3 = end
    
    const theClass = `square square-${type}`;

    return <div className={theClass} onClick={ clickHandler } />;
  }
}

Square.propTypes = {
  type: PropTypes.number,
  clickHandler: PropTypes.func
};

Square.defaultProps = {
  type: 0,
  clickHandler () {}
};

export default Square;
