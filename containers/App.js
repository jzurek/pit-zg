import React, { Component } from 'react';
import { connect} from 'react-redux';

import Input from '../components/Input';
import { setMessage } from '../actions/message';

class App extends Component {
    onChange = (value) => {
        this.props.dispatch(setMessage(value));
    }

    render () {
        const { message } = this.props.messageReducer;
        return (
            <Input value={message} onChange={this.onChange} />
        );
    }
}

export default connect(state => state)(App);