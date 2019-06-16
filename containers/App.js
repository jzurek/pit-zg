import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../components/Input';
import { setMessage } from '../actions/message';

class App extends Component {
    onChange = (value) => {
      const { dispatch } = this.props;
      dispatch(setMessage(value));
    }

    render() {
      const { messageReducer } = this.props;
      const { message } = messageReducer;

      return (
        <Input value={message} onChange={this.onChange} />
      );
    }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messageReducer: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export default connect(state => state)(App);
