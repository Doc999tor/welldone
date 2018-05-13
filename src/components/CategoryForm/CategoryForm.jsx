import React, {Component} from 'react';
import './CategoryForm.css'

export default class CategoryForm extends Component {
	constructor(props) {
		super(props)

		this.nameInput = React.createRef();

		this.submitLabel = '';
		switch (this.props.action) {
			case 'adding': this.submitLabel = 'Add a category'; break;
			case 'editing': this.submitLabel = 'Change the category'; break;
			default: console.error('undefined submit label');
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const form = e.target;
		var name = this.nameInput.current.value;
		console.log(name);

		if (name.length) {

			switch (this.props.action) {
				case 'adding': this.props.onAdd({name}); break;
				case 'editing': this.props.onUpdate({name}); break;
				default: console.error('undefined submit label');
			}

			form.reset();
		}
	}

	onBlur = e => {
		if (this.props.action === 'editing') {
			this.props.blur();
		}
	}

	render () {
		return (
			<form onSubmit={this.onSubmit}>
				<h2>{this.submitLabel} form</h2>
				<label>
					<span>Enter the category name:</span>
					<input
						ref={this.nameInput}
						defaultValue={this.props.value}
						placeholder={this.submitLabel}
						autoFocus={this.props.hasOwnProperty('autofocus')}
						onBlur={this.onBlur}
						type="text"
						name="category_name"
						required
					/>
				</label>
				<label>
					<input type="submit" value={this.submitLabel} className="action-btn" />
				</label>
			</form>
		)
	}
}