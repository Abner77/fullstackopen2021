import React from 'react';

const Header = ( { coursename } : { coursename: string } ) => {

  return (
    <h1>{coursename}</h1>
  )

}

export default Header