import React from 'react';

const Tile = ({ size = 'medium', color = 'blue', label, children, icon, link }) => {
  const sizeClass = `tile-${size}`;
  const colorClass = `bg-metro-${color}`;
  
  const content = (
    <>
      {icon && (
        <div className="tile-content">
          <div className="tile-icon">{icon}</div>
        </div>
      )}
      {children && <div className="tile-content">{children}</div>}
      {label && <div className="tile-label">{label}</div>}
    </>
  );

  if (link) {
    return (
      <a href={link} className={`tile ${sizeClass} ${colorClass}`}>
        {content}
      </a>
    );
  }

  return (
    <div className={`tile ${sizeClass} ${colorClass}`}>
      {content}
    </div>
  );
};

export default Tile;
