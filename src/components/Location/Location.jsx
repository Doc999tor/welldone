import React, {Component} from 'react'
import LocationForm from '../LocationForm/LocationForm'
import MapWrapper from '../MapWrapper/MapWrapper';
import Vibration from '../../services/Vibration';
import './Location.css'

export default class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			locationShown: false,
		}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	/**
	 * opens a map for a click on an address bar
	 * sends a vibration call to the Vibration service
	 *
	 * @param      {event proxy}  click event
	 */
	toggleLocation = e => {
		Vibration.vibrate();
		this.setState(Object.assign(this.state, {locationShown: !this.state.locationShown}));
	}

	onDelete = () => { this.props.onDelete(this.props.location_id) }
	edit = (e) => {
		const formData = {
			id: this.props.location_id,
			name: this.props.name,
			address: this.props.address,
			coordinates: this.props.coordinates,
			category: this.props.category,
		};
		this.setState(Object.assign(this.state, {editing: true}, {formData}));
	}
	onUpdate = (newName) => {
		this.props.onUpdate(this.props.location_id, newName);
		this.setState(Object.assign(this.state, {editing: false}));
	}

	/**
	 * removes a form and render the location bar back
	 * the data remains unchanged
	 */
	abortEditing = () => {
		this.setState(Object.assign(this.state, {editing: false}));
	}

	render () {
		return (
			(!this.state.editing)
			?
				<li data-location_id={this.props.location_id}>
					<div className="location-text-fields" onClick={this.toggleLocation}>
						<span className="location-name">{this.props.name}</span>
						<span className="conj"> at </span>
						<span className="location-address">{this.props.address}</span>
						{
							this.state.locationShown && <span>. Did you feel the vibration? Click again on the address for closing the map</span>
						}
					</div>
					{
						this.state.locationShown && (
							<div className="map-wrapper" >
								<MapWrapper coordinates={this.props.coordinates} />
							</div>
						)
					}
					<button className="action-btn location-edit-btn" onClick={this.edit} >✎</button>
					<button className="action-btn location-delete-btn" onClick={this.onDelete} >✖</button>
				</li>
			:
				<li data-location_id={this.props.location_id}>
					<LocationForm
						formData={this.state.formData}
						categories={this.props.categories}
						onUpdate={this.onUpdate}
						onBlur={this.abortEditing}
						action="editing"
						autofocus
						value={this.props.text}
					/>
				</li>
		)
	}
}