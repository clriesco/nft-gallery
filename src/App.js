import React from 'react';
import { NFTContextProvider } from './context/NFTContext';
import { FilterContextProvider } from './context/FilterContext';
import HeaderMenu from './components/HeaderMenu';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/Content';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	return (
		<NFTContextProvider>
			<header className="App-header">
				{/*<AppLogo />*/}
				<HeaderMenu />
			</header>
			<div className="App">
				<FilterContextProvider>
					<Sidebar/>
					<Content/>
				</FilterContextProvider>
			</div>
		</NFTContextProvider>
	);
}

export default App;
