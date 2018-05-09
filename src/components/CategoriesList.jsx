import React, {Component} from 'react';
import Category from './Category';
import CategoryForm from './CategoryForm';

export default class CategoriesList extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.onAdd = this.onAdd.bind(this);
	}

	onAdd (newCategory) {
		newCategory.id = 1 + Math.max(
			...this.props.categories.map(cat => cat.id)
		);
		console.log(newCategory);
		const {categories} = this.state;
		categories.push(newCategory);

		this.props.onUpdate(categories)
	}



	static getDerivedStateFromProps (newProps, prevState) {
		return newProps
	}

	render () {
		return (
			<main>
				<ul>
					{
						this.props.categories && this.props.categories.map(
							(category, index) => (
								<Category
									key={index}
									category_id={category.id}
									text={category.name}
								></Category>

							)
						)
					}
				</ul>
				<CategoryForm onAdd={this.onAdd} />
			</main>
		)
	}
}