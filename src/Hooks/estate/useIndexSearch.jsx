import React, {useEffect, useState } from 'react'
import elasticlunr from 'elasticlunr';

// Function to build the search index
export const useIndexSearch = ( data )=>{

    const [ index , setIndex ] = useState(null); 

    const buildSearchIndex = (data)=>{
        const index = elasticlunr(function () {
            this.addField('name');
            this.addField('specifications.processor');
            this.addField('category');
            this.setRef('id');

            data.forEach((product) => {
                this.addDoc(product);
            });
        });
        return index;
    }

    useEffect(()=>{
        setIndex( buildSearchIndex(data) )
    },[data])

    return index;
 
}
