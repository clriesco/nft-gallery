import React, { createContext, useState} from 'react';
const FilterContext = createContext();

const FilterContextProvider = ({children}) => {
	const [sidebarFilters, setSidebarFilters] = useState({});
	
	return (
		<FilterContext.Provider  value={{sidebarFilters, setSidebarFilters}}>
			{children}
		</FilterContext.Provider>
	);
};

export { FilterContext, FilterContextProvider };