import React, {Component} from 'react';
import Location from '../Location/Location';
import LocationForm from '../LocationForm/LocationForm';
import './LocationsList.css'

export default class LocationsList extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	/**
	 * calculating autoincrement/identity id for a new location
	 *
	 * @param      {location object}
	 */
	onAdd = newLocation => {
		newLocation.id = 1 + Math.max(
			...this.props.locations.map(loc => loc.id)
		);
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