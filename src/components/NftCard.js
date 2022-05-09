import React from 'react';

const resolveLink = (url) => {
	if (!url || !url.includes('ipfs://')) return url;
	return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
};

export default function NftCard({ data }) {
	return (
		<figure className="image-block">
			<img src={resolveLink(data.image)} alt={data.token_id} />
			<figcaption>
				<h3>
					{data.token_id}
				</h3>
				<ul>
					{Object.keys(data.attributes).map(attribute => (
						<li key={data.token_id + attribute}>
							<span><b>{`${attribute}:`}</b></span>
							<span className="right">{`${data.attributes[attribute]}`}</span>
						</li>
					))}
				</ul>
			</figcaption>
		</figure>
	);
}   