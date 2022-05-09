import React, { useState, useContext } from 'react';
import { NFTContext } from '../../context/NFTContext';
import { Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowLeft,	faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Submenu from './Submenu';
import classNames from 'classnames';
import { FilterContext } from '../../context/FilterContext';

const attrIsInFilter = function(key, value, filter, strict = false) {
	if (!strict) return !Object.keys(filter).includes(key) || filter[key].includes(value);
	return filter[key].includes(value);
};

export default function Sidebar() {  
	const [ isOpen, setIsOpen ] = useState(true);
	const { NFTData, setNFTSelection } = useContext(NFTContext);
	const { sidebarFilters, setSidebarFilters } = useContext(FilterContext);

	const updateFilter = ({name, value, checked}) => {
		let sidebarFilterAux = Object.assign({}, sidebarFilters);  // creating copy of state variable filters
		
		if (!Object.keys(sidebarFilterAux).includes(name)) {
			sidebarFilterAux[name] = [];
		}

		checked && sidebarFilterAux[name].push(value);
		!checked && sidebarFilterAux[name].splice(sidebarFilterAux[name].indexOf(value), 1);
		!sidebarFilterAux[name].length && delete sidebarFilterAux[name];

		if (!Object.keys(sidebarFilterAux).length) {
			setNFTSelection(NFTData.NFTs.slice(0, 20));
			return;
		}

		setSidebarFilters(sidebarFilterAux);
		setNFTSelection(NFTData.NFTs.filter(nft => 
			Object.keys(nft.attributes).every(attr => 
				attrIsInFilter(attr, nft.attributes[attr], sidebarFilterAux, false)
			) 
			/*&&
			Object.keys(sidebarFilterAux).every(attr =>
				sidebarFilterAux[attr].some(val => attrIsInFilter(attr, val, nft.attributes, true))
			)*/
		));
	};
	

	return (
		<div className={classNames('sidebar', { 'is-open': isOpen })}>
			<div className="sidebar-header">
				<p className="ml-4 header-title">
					<FontAwesomeIcon icon={faFilter} pull="left" className="mr-2" />
					Filter
				</p>
				<Button
					variant="link"
					onClick={() => setIsOpen(!isOpen)}
					style={{ color: '#444' }}
					className={classNames('mt-2 ', { 'show': !isOpen })}
				>
					<FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} pull="right" size="xs" />
				</Button>
			</div>

			<Nav className="flex-column pt-2 sidebar-body">
				{Object.keys(NFTData.attributes).map(attr => {
					const items = Object
						.keys(NFTData.attributes[attr])
						.map(key => [key, NFTData.attributes[attr][key]]);
					return (
						<Submenu
							title={attr}
							items={items}
							key={attr}
							cb={updateFilter}
						/>
					);
				})}
			</Nav>
		</div>
	);
}