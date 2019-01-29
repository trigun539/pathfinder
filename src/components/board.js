import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Board extends PureComponent {
  render() {
    const {squares} = this.props;

    return <div id="board" />;
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.object),
};

Board.defaultProps = {
  squares: [],
};

export default Board;
