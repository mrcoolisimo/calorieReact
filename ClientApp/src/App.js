import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import './custom.css'
import Foods from './components/Foods';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";


/*
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}*/

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Foods />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;