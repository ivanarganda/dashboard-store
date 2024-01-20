import React,{ useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import { PaginationContext } from './../../Context/paginationContext.jsx'

export default function Pagination_() {
    
  const { pagination , setPagination } = useContext( PaginationContext );

  const handlePage = ( event , value )=>{
    setPagination({
        ...pagination,
        currentPage:value
    })
  }

  return (
        <Pagination
          onChange={handlePage}
          page={pagination.currentPage}
          showFirstButton
          showLastButton
          sx={{
            marginTop: '3rem',
            color: 'white',
            background: 'lightgrey',
            borderRadius: '0.4rem 0.4rem 0.4rem 0.4rem',
            width: '50%',
            minWidth: '350px',
            margin: 'auto',
            '@media (max-width: 400px)': {
              width: '80%',
              minWidth: '250px',
            },
          }}
          count={pagination.totalPages}
          color='primary'
          size={'medium'}
        />
  )
}
