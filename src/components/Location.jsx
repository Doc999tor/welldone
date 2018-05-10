import React, {Component} from 'react'
import LocationForm from './LocationForm'
import GoogleMapReact from 'google-map-react';

export default class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			locationShown: false,
			initialMapSettings: {
				center: {
					lat: 32.111767,
					lng: 34.801361
				},
				zoom: 11
			},
		}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	toggleLocation = e => {
		console.log(e.target);
		console.log(e.target);
		this.setState(Object.assign(this.state, {locationShown: !this.state.locationShown}));
	}

	onDelete = () => { this.props.onDelete(this.props.location_id) }
	edit = (e) => {
		this.setState(Object.assign(this.state, {editing: true}));
	}
	onUpdate = (newName) => {
		this.props.onUpdate(this.props.location_id, newName);
		this.setState(Object.assign(this.state, {editing: false}));
	}
	abortEditing = () => {
		this.setState(Object.assign(this.state, {editing: false}));
	}

	render () {
		console.log(this.props.coordinates || this.state.initialMapSettings.center);
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
								<GoogleMapReact
								  bootstrapURLKeys={{key: "AIzaSyClU7UQTjtzZzc-vm966CT73XNoCaGYA-I"}}
								  center={this.props.coordinates || this.state.initialMapSettings.center}
								  zoom={this.state.initialMapSettings.zoom}
								></GoogleMapReact>
							</div>
						)
					}
					<button className="location-edit-btn" onClick={this.edit} >✎</button>
					<button className="location-delete-btn" onClick={this.onDelete} >✖</button>
				</li>
			:
				<li data-location_id={this.props.location_id}>
					<LocationForm
						onUpdate={this.onUpdate}
						blur={this.abortEditing}
						action="editing"
						autofocus
						value={this.props.text} />
				</li>
		)
	}
}