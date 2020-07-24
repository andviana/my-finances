import React from 'react';

export default function Jumbotron({ children }) {
  const jumbotronStyle = {
    paddingBottom: '20px',
    boxShadow: '0px 4px 15px 2px rgba(0,0,0,0.2)',
  };
  return (
    <div>
      <div className="card-panel grey lighten-2" style={jumbotronStyle}>
        <div>{children}</div>
      </div>
    </div>
  );
}
