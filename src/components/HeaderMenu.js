import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function HeaderMenu() {

	return ( 
		<Navbar  expand="lg" sticky="top" className="nav-fill w-100">
			<Container>
				<Navbar.Brand href="#home">NFT Explorer</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="https://github.com/clriesco">Github</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}