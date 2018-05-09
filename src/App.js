import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './components/Header';
import CategoriesList from './components/CategoriesList';
import Locations from './components/Locations';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const routerLinks = [
      {url: "/categories", text: 'Categories'},
      {url: "/locations", text: 'Locations'},
    ];
    this.state.links = routerLinks;
    this.state.data = {};

  }

  componentDidMount () {
    if (!localStorage.getItem('data')) {
       fetch('initial_data.json')
      .then(response => response.json())
      .then(data => this.setState({data}));
    }
  }

  render() {
    return (
      <Router>
        <div id="top_wrapper">
          <Header links={this.state.links}></Header>

          <Switch>
            <Redirect exact from="/" to="/categories" />

            <Route path="/categories" render={
              (props) => (
                <CategoriesList categories={this.state.data.categories} />
              )
            } />
            <Route path="/locations" render={
              (props) => (
                <Locations locations={this.state.data.locations} />
              )
            } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
