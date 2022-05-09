import React, { useContext } from 'react';
import NftCard from './NftCard';
import { NFTContext } from '../context/NFTContext';

export default function CardList() {
	const { NFTSelection } = useContext(NFTContext);
	return (
		<ul className="card-list">
			{NFTSelection.map(card => <NftCard data={card} key={card.token_id}></NftCard>)}
		</ul>
	);
}