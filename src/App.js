import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Header from './components/Header/Header';
import CategoriesList from './components/CategoriesList/CategoriesList';
import LocationsList from './components/LocationsList/LocationsList';
import './App.css';

class App extends Component {

	/**
	 * resets routerLinks and h1 titles for each route
	 *
	 * @param      {object}  props
	 */
	constructor(props) {
		super(props);
		this.state = {
			titles: {
				categories: 'Categories managing page',
				locations: 'Explore your locations',
			}
		};

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
			.then(data => {
				this.setState(Object.assign(this.state.data, {data: this.denormalizeState(data)}));
			});
		}

	}

	/**
	 * assumed as |categories| < |locations| -> reducing less categories array to a map for better (O(1)) access performance
	 *
	 * @param      {object of two arrays}  data
	 */
	denormalizeState (data) {
		const catObj = data.categories.reduce((obj, cat) => {
			obj[cat.id] = cat;
			return obj;
		}, {});
		data.locations.forEach(loc => {
			loc.category = catObj[loc.category_id];
		});

		data.locations.sort((a,b) => a.name > b.name)
		return data;
	}

	/**
	 * resets the this.state.categories on a change of every kind
	 *
	 * @param      {array of categories}  categories
	 */
	onUpdateCategories = categories => {
		this.setState(Object.assign(this.state.data, {categories}));
	}
	/**
	 * resets the this.state.locations on a change of every kind
	 *
	 * @param      {array of locations}  locations
	 */
	onUpdateLocations = locations => {
		this.setState(Object.assign(this.state.data, {locations}));
	}

	render() {
		return (
			<Router>
				<div id="top_wrapper">
					<Header links={this.state.links} title={this.state.titles[window.location.pathname.replace(/^\//, '')]} ></Header>

					<Switch>
						<Redirect exact from="/" to="/categories" />

						<Route path="/categories" render={
							(props) => (
								<CategoriesList categories={this.state.data.categories} onUpdate={this.onUpdateCategories} />
							)
						} />
						<Route path="/locations" render={
							(props) => (
								<LocationsList locations={this.state.data.locations} categories={this.state.data.categories} onUpdate={this.onUpdateLocations} />
							)
						} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
