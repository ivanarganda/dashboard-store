import React from 'react';

const ImagesProductsContext = React.createContext();

const ImagesProductsProvider = ({children})=>{

    const images = [
        'assets/1.jpg',
        'assets/2.jpeg',
        'assets/3.jpg',
        'assets/4.jpg',
        'assets/5.jpg',
        'assets/6.jpg',
        'assets/7.jpg',
        'assets/8.jpg',
        'assets/9.jpg',
        'assets/10.jpg',
    ]

    return (
        <ImagesProductsContext.Provider value={{ images }}>
            {children}
        </ImagesProductsContext.Provider>
    )
}

export { ImagesProductsContext , ImagesProductsProvider }
