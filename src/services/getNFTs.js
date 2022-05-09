
import { Moralis } from 'moralis';

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_API_KEY;
const collectionAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
let loading = false;

export default async function getNFTs() {
	if (loading) return {NFTs: [], attributes: []};
	loading = true;

	Moralis.start({ serverUrl, appId });

	let cursor = null;
	let NFTs = await Moralis.Web3API.token.getAllTokenIds({
		address: collectionAddress,
	});

	const totalNum = NFTs.total;
	const pageSize = NFTs.page_size;
	let allNFTs = NFTs.result;
	for (let i = pageSize; i < totalNum / 10; i = i + pageSize) {
		cursor = NFTs.cursor;
		NFTs = await Moralis.Web3API.token.getAllTokenIds({
			address: collectionAddress,
			cursor: cursor
		});
		allNFTs = allNFTs.concat(NFTs.result);
		console.log('Requesting from ' + i  + ' -> ' + cursor);
	}
	loading = false;
	return extractAttributes(allNFTs);
}

function extractAttributes(NFTs) {

	const metadata = NFTs.map((e) => JSON.parse(e.metadata).attributes);
	NFTs = NFTs.map(({token_id, metadata}) => {
		const attrs = {};
		JSON.parse(metadata).attributes.forEach(({trait_type, value}) => {
			attrs[trait_type] = value;
		});
		return {
			token_id,
			image: JSON.parse(metadata).image,
			attributes: attrs	
		};
	});
  
	const attributes = { };
  
	for (let j = 0; j < metadata.length; j++) {
		let nftTraits = metadata[j].map((e) => e.trait_type);
		let nftValues = metadata[j].map((e) => e.value);

		for (let i = 0; i < nftTraits.length; i++) {
			let current = nftTraits[i];
			if (!attributes[current]) {
				attributes[current] = {};
			}

			let currentValue = nftValues[i];
			if (attributes[current][currentValue]) {
				attributes[current][currentValue]++;
			} else {
				attributes[current][currentValue] = 1;
			}
		}
	}
	return {NFTs, attributes};
}
