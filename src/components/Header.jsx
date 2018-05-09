import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
	render () {
		return (
		  <header>
				<nav>
					{
						this.props.links.map((link, index) => (
							<Link key={index} to={link.url}>{link.text}</Link>
						))
					}
				</nav>
		  </header>
		)
	}
}