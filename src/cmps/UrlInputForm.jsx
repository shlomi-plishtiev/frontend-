import axios from "axios";
import { useState } from "react";

export function UrlInputForm({ onMetadataFetch, onError }) {
  const [urls, setUrls] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onError(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/fetch-metadata', { urls });
      onMetadataFetch(response.data);
    } catch (err) {
      onError('Failed to fetch metadata for one or more URLs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <div key={index} className="url-input">
          <input
            type="url"
            value={url}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Enter URL ${index + 1}`}
            required
          />
        </div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? 'Fetching...' : 'Submit'}
      </button>
    </form>
  );
}
