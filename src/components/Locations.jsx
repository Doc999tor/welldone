import React, {Component} from 'react'

export default class Locations extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		console.log(newProps);
		return newProps
	}

	render () {
		console.log(this.props);
		return (
			<main>
				<ul>
					{
						this.props.locations && this.props.locations.map(
							(location, index) => (
								<li
									key={index}
									data-category_id={location.id}
								>{location.name}</li>
							)
						)
					}
				</ul>
			</main>
		)
	}
}