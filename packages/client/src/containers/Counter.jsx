import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { increment, decrement } from '../reducers/counterDuck';

import './Counter.css';
import Button from '../components/Button';
import { Grid } from 'semantic-ui-react';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count, incrementAction, decrementAction } = this.props;

    return (
      <Grid stretched centered container className="counter-container">
        <Grid.Column width={4}>
          <Button icon="arrow-down" onClick={decrementAction} />
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          {count}
        </Grid.Column>
        <Grid.Column width={4}>
          <Button icon="arrow-up" onClick={incrementAction} />
        </Grid.Column>
      </Grid>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number,
  incrementAction: PropTypes.func,
  decrementAction: PropTypes.func,
};

const mapStateToProps = state => ({
  count: state.counter,
});

const mapDispatchToProps = dispatch => ({
  incrementAction: () => dispatch(increment()),
  decrementAction: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
