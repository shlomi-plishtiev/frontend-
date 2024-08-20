import axios from "axios"
import { useState, useEffect } from "react"

export function UrlInputForm({ onMetadataFetch, onError }) {
  const [urls, setUrls] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    // בקשת CSRF Token מהשרת
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/csrf-token', { withCredentials: true })
        setCsrfToken(response.data.csrfToken)
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err)
      }
    }

    fetchCsrfToken()
  }, [])

  const handleChange = (index, value) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onError(null)
    setLoading(true)
    try {
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/fetch-metadata`,
        { urls },
        { headers: { 'X-CSRF-Token': csrfToken }, withCredentials: true }
      )
      onMetadataFetch(response.data)
    } catch (err) {
      console.log(err);
      
      onError('Failed to fetch metadata for one or more URLs.')
    } finally {
      setLoading(false)
    }
  }

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
      <button type="submit" className="url-button" disabled={loading}>
        {loading ? 'Fetching...' : 'Submit'}
      </button>
    </form>
  )
}
