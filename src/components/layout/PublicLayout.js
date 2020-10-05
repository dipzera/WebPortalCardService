import React, {useEffect} from 'react';

const PublicLayout = ({ children }) => {
  /* Login Register Recovery Layout */
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <>
      {children}
    </>
  )
}

export default PublicLayout;