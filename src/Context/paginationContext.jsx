import React, { useState } from 'react';

const PaginationContext = React.createContext();

const PaginationProvider = ({children}) => {

    const [ pagination , setPagination ] = useState({
        currentPage:1,
        perPage:5,
        totalPages:0
    });

    return (
        <PaginationContext.Provider value={{ pagination , setPagination }}>
            {children}
        </PaginationContext.Provider>
    )
}

export { PaginationContext , PaginationProvider }
