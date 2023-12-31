import React from 'react'

export default function RightSidebar( props ) {

  const { typeMenu } = props;

  return (
    <aside>
        { typeMenu }
    </aside>
  )
}
