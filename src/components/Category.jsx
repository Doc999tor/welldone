import React, {Component} from 'react'

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	render () {
		console.log(this.props);
		return (
			<li
				data-category_id={this.props.category_id && this.props.category_id}
			>{this.props.text && this.props.text}</li>
		)
	}
}