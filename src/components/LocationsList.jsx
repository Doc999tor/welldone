import React, {Component} from 'react';
import Location from './Location';
import LocationForm from './LocationForm';

export default class LocationsList extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	onAdd = newLocation => {
		console.log(newLocation);
		newLocation.id = 1 + Math.max(
			...this.props.locations.map(loc => loc.id)
		);
		console.log(newLocation);
		const {locations} = this.state;
		locations.push(newLocation);

		this.props.onUpdate(locations)
	}

	onDelete = locationId => {
		const {locations} = this.state;

		const index = locations.findIndex(loc => loc.id === locationId);
		locations.splice(index, 1);
		this.props.onUpdate(locations);
	}

	onUpdate = (locationId, updatedLocation) => {
		const {locations} = this.state;

		const index = locations.findIndex(loc => loc.id === locationId);
		locations[index] = Object.assign(locations[index], updatedLocation);
		console.log(locations);
		this.props.onUpdate(locations);
	}

	static getDerivedStateFromProps = newProps => newProps;

	render () {
		console.log(this.props);
		return (
			<main>
				<ul>
					{
						this.props.locations && this.props.locations.map(
							(location, index) => (
								<Location
									key={index}
									location_id={location.id}
									name={location.name}
									address={location.address}
									coordinates={location.coordinates}
									category={location.category}
									categories={this.props.categories}
									onDelete={this.onDelete}
									onUpdate={this.onUpdate}
								></Location>
							)
						)
					}
				</ul>
				<LocationForm onAdd={this.onAdd} action="adding" categories={this.props.categories} />
			</main>
		)
	}
}