import React from 'react';

interface MovieDetailLayoutProps {
   children: React.ReactNode;
   modal: React.ReactNode;
}

// movie detail layout에서 children, modal 페이지를 모두 띄워준다.
// modal이 children 위에 위치한다.
function MovieDetailLayout({children, modal}: MovieDetailLayoutProps) {

  return (
    <>
      {modal}
      {children}
    </>
  )
}

export default MovieDetailLayout