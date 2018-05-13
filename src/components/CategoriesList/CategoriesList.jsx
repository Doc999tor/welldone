import React, {Component} from 'react';
import Category from '../Category/Category';
import CategoryForm from '../CategoryForm/CategoryForm';
import './CategoriesList.css'

export default class CategoriesList extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	onAdd = newCategory => {
		newCategory.id = 1 + Math.max(
			...this.props.categories.map(cat => cat.id)
		);
		console.log(newCategory);
		const {categories} = this.state;
		categories.push(newCategory);

		this.props.onUpdate(categories)
	}

	onDelete = categoryId => {
		const {categories} = this.state;

		const index = categories.findIndex(cat => cat.id === categoryId);
		categories.splice(index, 1);
		this.props.onUpdate(categories);
	}

	onUpdate = (categoryId, updatedCategory) => {
		const {categories} = this.state;

		const index = categories.findIndex(cat => cat.id === categoryId);
		categories[index] = Object.assign(categories[index], updatedCategory);
		console.log(categories);
		this.props.onUpdate(categories);
	}

	static getDerivedStateFromProps = newProps => newProps;

	render () {
		return (
			<main>
				<ul className="categories-list">
					{
						this.props.categories && this.props.categories.map(
							(category, index) => (
								<Category
									key={index}
									category_id={category.id}
									text={category.name}
									onDelete={this.onDelete}
									onUpdate={this.onUpdate}
								></Category>
							)
						)
					}
				</ul>
				<CategoryForm onAdd={this.onAdd} action="adding" />
			</main>
		)
	}
}