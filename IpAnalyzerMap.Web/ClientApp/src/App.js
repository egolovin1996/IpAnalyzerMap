import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Search } from './components/Search';
import { MultiSearch } from "./components/MultiSearch";
import { ScanUrl } from "./components/ScanUrl";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Search} />
            <Route exact path='/map/:ip' component={Search} />
            <Route exact path='/multi' component={MultiSearch} />
            <Route exact path='/url' component={ScanUrl} />
      </Layout>
    );
  }
}
