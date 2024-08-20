
import { UrlInputForm } from './UrlInputForm';
import { MetadataList } from './MetadataList';
import { useState } from 'react';
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UrlMetadataFetcher() {
  const [metadata, setMetadata] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMetadataFetch = (fetchedMetadata) => {
    setMetadata(fetchedMetadata);
  };

  const handleError = (error) => {
    setError(error);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="url-metadata-fetcher">
      <h1>URL Metadata Fetcher</h1>
      <UrlInputForm
        onMetadataFetch={handleMetadataFetch}
        onError={handleError}
        onLoading={handleLoading}
      />

      {error && <p className="error">{error}</p>}

      <MetadataList metadata={metadata} />
    </div>
  );
}


