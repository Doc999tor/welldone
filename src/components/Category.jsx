import React, {Component} from 'react'
import CategoryForm from './CategoryForm'

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {editing: false}
	}

	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	onDelete = () => { this.props.onDelete(this.props.category_id) }
	edit = (e) => {
		this.setState(Object.assign(this.state, {editing: true}));
	}
	onUpdate = (newName) => {
		this.props.onUpdate(this.props.category_id, newName);
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
				<li data-category_id={this.props.category_id}>
					<span className="category-text">{this.props.text}</span>
					<button className="category-edit-btn" onClick={this.edit} >✎</button>
					<button className="category-delete-btn" onClick={this.onDelete} >✖</button>
				</li>
			:
				<li data-category_id={this.props.category_id}>
					<CategoryForm
						onUpdate={this.onUpdate}
						blur={this.abortEditing}
						action="editing"
						autofocus
						value={this.props.text} />
				</li>
		)
	}
}