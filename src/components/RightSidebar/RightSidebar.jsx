import React from 'react'

export default function RightSidebar( props ) {

  const { styles , typeMenu } = props;

  return (
    
      <aside className={`${styles}`}>
         { typeMenu }
      </aside>
    
    
  )
}
