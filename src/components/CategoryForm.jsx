import React, {Component} from 'react';

export default class CategoryForm extends Component {
	constructor(props) {
		super(props)

		this.nameInput = React.createRef();
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount () {
		this.nameInput.current.setCustomValidity('Name has to be filled');
	}

	onSubmit (e) {
		e.preventDefault();
		const form = e.target;
		const name = form.querySelector('input[name=category_name]').value;

		if (name.length) {
			this.props.onAdd({name});
			form.reset();
		} else {
			form.classList.add('')
		}
	}

	render () {
		return (
			<form onSubmit={this.onSubmit}>
				<label>
					<input ref={this.nameInput} type="text" name="category_name" required />
					<input type="submit" value="Add a category" />
				</label>
			</form>
		)
	}
}