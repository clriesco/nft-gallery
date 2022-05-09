import React, { createContext, useState, useEffect } from 'react';
import getNFTs from '../services/getNFTs';
const NFTContext = createContext();

const NFTContextProvider = ({children}) => {
	const [NFTData, setNFTData] = useState( {NFTs: [], attributes: []});
	const [NFTSelection, setNFTSelection] = useState( [] );
	
	useEffect(function() {
		getNFTs()
			.then(res => {
				setNFTSelection(res.NFTs.slice(0, 20));
				setNFTData(res);
			});
	}, []);
	
	return (
		<NFTContext.Provider  value={{NFTSelection, setNFTSelection, NFTData}}>
			{children}
		</NFTContext.Provider>
	);
};

export { NFTContext, NFTContextProvider };