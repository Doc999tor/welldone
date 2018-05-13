import React, {Component} from 'react';
import CategoriesSelect from './CategoriesSelect';
import MapWrapper from './MapWrapper';

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

	static getDerivedStateFromProps = newProps => {
		return newProps.categories
			? Object.assign({
				category: newProps.formData ? newProps.formData.category.id : newProps.categories[0].id
			}, newProps)
			: newProps;
	}

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
		console.log(name, address, category_id);

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
		console.log(this.props);
		return (
			<form
				ref={this.form}
				onSubmit={this.onSubmit}
			>
				<label>
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
				<div style={{ height: '300px', width: '300px', display: 'block' }}>
					<span style={{position: 'absolute', zIndex: 1, backgroundColor: 'white' }}>Choose the coordinates by clicking the map below</span>
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