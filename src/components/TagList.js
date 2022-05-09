import React, { useContext } from 'react';
import Tag from './Tag';
import { FilterContext } from '../context/FilterContext';

export default function TagList() {
	const {sidebarFilters, setSidebarFilters} = useContext(FilterContext);
	let tags = [];
	Object.keys(sidebarFilters).forEach(attr => {
		sidebarFilters[attr].forEach(val => tags.push([attr, val]));
	});
	console.log(tags)

	return (
		<div className="tag-list">
			{tags.map(tag => <Tag data={tag} key={tag[0] + tag[1]}></Tag>)}
		</div>
	);
}