import { MetadataItem } from "./MetadataItem";

export function MetadataList({ metadata }) {
  return (
    <div className="metadata-list">
      {metadata.map((data, index) => (
        <MetadataItem key={index} data={data} />
      ))}
    </div>
  );
}