export function MetadataItem({ data }) {
  return (
    <div className="metadata-item">
      <img src={data.image} alt="Preview" />
      <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
}
