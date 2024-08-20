import React from 'react';

export function MetadataList({ metadata }) {
  if (metadata.length === 0) return <p className="no-metadata">No metadata available</p>;

  return (
    <div className="metadata-list">
      {metadata.map((data, index) => (
        <div key={index} className="metadata-card">
          {data.image && <img src={data.image} alt={data.title} />}
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
  );
}
