import React, {Component} from 'react'
import LocationForm from './LocationForm'
import MapWrapper from './MapWrapper';

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

	toggleLocation = e => {
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
	abortEditing = () => {
		this.setState(Object.assign(this.state, {editing: false}));
	}

	render () {
		// console.log(this.props);
		return (
			(!this.state.editing)
			?
				<li data-location_id={this.props.location_id}>
					<div className="location-text-fields" onClick={this.toggleLocation}>
						<span className="location-name">{this.props.name}</span>
						<span className="location-address">{this.props.address}</span>
					</div>
					{
						this.state.locationShown && (
							<div style={{ height: '300px', width: '300px' }}>
								<MapWrapper coordinates={this.props.coordinates} />
							</div>
						)
					}
					<button className="location-edit-btn" onClick={this.edit} >✎</button>
					<button className="location-delete-btn" onClick={this.onDelete} >✖</button>
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