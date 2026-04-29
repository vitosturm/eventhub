import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function EventMap({ latitude, longitude }) {
  if (latitude === null || longitude === null) {
    return <p>No map location available.</p>;
  }

  const position = [Number(latitude), Number(longitude)];

  return (
    <div className="relative z-0 h-72 overflow-hidden rounded-xl border">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
