import React from 'react';

const Navigazione = ({ CambiaRoute, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => CambiaRoute('signin')} className='f3 ma4 mt3 link dim black underline pd3 pointer'>Sign Out</p>
      </nav>
      </>
    )
  } else {
    return (
      <>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => CambiaRoute('signin')} className='f3 ma4 mt3 link dim black underline pd3 pointer'>Sign In</p>
        <p onClick={() => CambiaRoute('register')} className='f3 ma4 mt3 link dim black underline pd3 pointer'>Register</p>
      </nav>
    </>
    );
  }
}

export default Navigazione;