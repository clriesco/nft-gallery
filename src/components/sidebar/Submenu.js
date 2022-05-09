import React from 'react';
import { Accordion, Nav } from 'react-bootstrap';

export default function Submenu({ title, items, cb }) {
	const handleClick = (e) => {
		cb({ name: e.target.dataset.title.replace(' ', '_'), value: e.target.value, checked: e.target.checked });
	};

	return (
		<Nav.Item>
			<Accordion>
				<Accordion.Item
					eventKey="0"
				>
					<Accordion.Header>{title}</Accordion.Header>
					<Accordion.Body>
						<nav className="nav flex-column">
							{items.map(item => (
								<div className="nav-link form-check" key={item}>
									<input type="hidden" value={title} />
									<input 
										className="form-check-input" 
										type="checkbox" 
										name={`check_${title}_${item[0]}`}
										value={item[0]} 
										data-title={title}
										onClick={handleClick} 
										id={`check_${title}_${item[0]}`} 
									/>
									<label
										className="nav-item pl-5"
										htmlFor={`check_${title}_${item[0]}`}
									>
										{item[0]}
									</label>
									<span className="item-qty">{item[1]}</span>
								</div>
							))}
						</nav>
					</Accordion.Body>
				</Accordion.Item>
  
				<Accordion.Item eventKey="1">
				</Accordion.Item>
			</Accordion>
		</Nav.Item>
	);
}