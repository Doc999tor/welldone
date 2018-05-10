import React, {Component} from 'react'
import LocationForm from './LocationForm'

export default class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {editing: false}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	showLocation = e => {
		console.log(e.target);
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
		console.log(this.props);
		return (
			(!this.state.editing)
			?
				<li data-location_id={this.props.location_id}>
					<div className="location-text-fields" onClick={this.showLocation}>
						<span className="location-name">{this.props.name}</span>
						<span className="location-address">{this.props.address}</span>
					</div>
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