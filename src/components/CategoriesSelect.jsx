import React, {Component} from 'react';

export default class CategoriesSelect extends Component {

	render () {
		return (
			<select
				name={this.props.nameAttr}
				defaultValue={this.props.selectedCategory && this.props.selectedCategory.id}
				onChange={this.props.onChange}
			>
			{
				this.props.categories && this.props.categories.map((category, index) => (
					<option
						key={index}
						value={category.id}
					>{category.name}</option>
				))
			}
			</select>
		)
	}
}