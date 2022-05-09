import React from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import TagList from './TagList';
import CardList from './CardList';


export default function Content() {

	return(
		<Container
			fluid
			className={classNames('content')}
		>
			<TagList/>
			<CardList />
		</Container>
	);
}
