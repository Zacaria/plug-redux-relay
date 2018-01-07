import React, { Component } from 'react';
import Counter from '../containers/Counter';
import { Grid, Header } from 'semantic-ui-react';

import logo from '../logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </Header>
        <Grid centered columns={2} container textAlign="center">
          <Grid.Column>
            <Counter />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
