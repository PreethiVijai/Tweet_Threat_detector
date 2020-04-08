import React from 'react';

function Header(){
  return(
    <header style={headerStyle}>
     <h1>THREAT DETECTOR</h1>
    </header>
  )
}

const headerStyle={
  background:'#87cefa',
  color:'#fff',
  textAlign:'center',
  padding:'10px'
}

export default Header;
