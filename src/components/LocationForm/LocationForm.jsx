import React, {Component} from 'react';
import CategoriesSelect from '../CategoriesSelect/CategoriesSelect';
import MapWrapper from '../MapWrapper/MapWrapper';
import './LocationForm.css'

export default class LocationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.form = React.createRef();
		this.nameInput = React.createRef();
		this.addressInput = React.createRef();

		this.submitLabel = '';
		switch (this.props.action) {
			case 'adding': this.submitLabel = 'Add a location'; break;
			case 'editing': this.submitLabel = 'Change the location'; break;
			default: console.error('undefined submit label');
		}
	}

	/**
	 * first render happens without any data
	 * the second happens asynchronously after getting the ajax response
	 *
	 * @param      {standard props object}
	 */
	static getDerivedStateFromProps = newProps => {
		return newProps.categories
			? Object.assign({
				category: newProps.formData ? newProps.formData.category.id : newProps.categories[0].id
			}, newProps)
			: newProps;
	}

	/**
	 * sets and after unmounting removes document.body click for closing the editing form on blur
	 */
	componentDidMount () {
		if (this.props.action === 'editing') {
			document.body.addEventListener('click', this.onBlur);
		}
	}
	componentWillUnmount () {
		document.body.removeEventListener('click', this.onBlur);
	}

	onSubmit = e => {
		e.preventDefault();
		const form = e.target;
		const name = this.nameInput.current.value;
		const address = this.addressInput.current.value;
		const category_id = Number(this.state.category);
		const category = this.props.categories.find(cat => cat.id === category_id)

		if (name && address && category_id) {
			const newLocation = {
				name,
				address,
				category_id,
				category,
				coordinates: this.state.coordinates || {lat: 0, lng: 0}
			};

			switch (this.props.action) {
				case 'adding': this.props.onAdd(newLocation); break;
				case 'editing': this.props.onUpdate(newLocation); break;
				default: console.error('undefined submit label');
			}

			form.reset();
		}
	}

	onBlur = e => {
		if (
			e.path
			&& !e.path.includes(this.form.current)
			&& this.props.action === 'editing'
		) {
			this.props.onBlur();
		}
	}

	getCoordinates = e => {
		const newCoordinates = {
			lat: e.lat,
			lng: e.lng,
		}
		this.setState(Object.assign(this.state, {coordinates: newCoordinates}));
	}

	changeCategory = e => {
		this.setState(Object.assign(this.state, {category: e.target.value}));
	}

	render () {
		return (
			<form
				ref={this.form}
				onSubmit={this.onSubmit}
			>
				<h2>{this.submitLabel} form. {this.props.action === 'editing' && <span>click outside the form for closing it</span>}</h2>
				<label>
					<span>Enter the location name:</span>
					<input
						ref={this.nameInput}
						defaultValue={this.props.value}
						placeholder="Enter a location name"
						autoFocus={this.props.hasOwnProperty('autofocus')}
						type="text"
						name="location_name"
						required
					/>
				</label>
				<label>
					<span>Enter the location address:</span>
					<input
						ref={this.addressInput}
						placeholder="Enter a location address"
						name="location_address"
						type="text"
					/>
				</label>
				<label>
					<span>Choose a category</span>
					<CategoriesSelect
						categories={this.props.categories}
						nameAttr="categories"
						selectedCategory={this.props.formData && this.props.formData.category}
						onChange={this.changeCategory}
					/>
				</label>
				<div className="map-wrapper">
					<span>Choose the coordinates by clicking the map below{this.state.coordinates && <span>. (coordinates saved)</span>}</span>
					<MapWrapper
						coordinates={this.props.coordinates}
						onClickHandler={this.getCoordinates}
					/>
				</div>
				<input type="submit" value={this.submitLabel} />
			</form>
		)
	}
}