import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './MapWrapper.css'

export default class MapWrapper extends Component {
	/**
	 * simple wrapper for incapsulating api key and default settings
	 */
	constructor (props) {
		super(props)

		this.state = {
			center: {
				lat: 32.111767,
				lng: 34.801361
			},
			zoom: 11,
			apiKey: 'AIzaSyClU7UQTjtzZzc-vm966CT73XNoCaGYA-I',
		};
	}

	render () {
		return (
			<GoogleMapReact
			  bootstrapURLKeys={{key: this.state.apiKey}}
			  center={this.props.coordinates || this.state.center}
			  zoom={this.state.zoom}
			  onClick={this.props.onClickHandler}
			></GoogleMapReact>
		)
	}
}