import React from 'react';

const ErrorPage = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - Pagina nu a fost găsită!</h2>
        </div>
        <a href="/">Pagina Principală</a>
      </div>
    </div>
  );
};

export default ErrorPage;