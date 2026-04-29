import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const DEFAULT_POSITION = [52.52, 13.405]; // Berlin

function ClickHandler({ onChange }) {
  useMapEvents({
    click(e) {
      onChange({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return null;
}

export default function LocationPicker({ latitude, longitude, onChange }) {
  const hasPosition = latitude && longitude;

  const position = hasPosition
    ? [Number(latitude), Number(longitude)]
    : DEFAULT_POSITION;

  return (
    <div className="space-y-2">
      <div className="h-72 overflow-hidden rounded-xl border">
        <MapContainer center={position} zoom={13} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler onChange={onChange} />

          {hasPosition && <Marker position={position} />}
        </MapContainer>
      </div>

      <p className="text-sm text-gray-500">
        Click on the map to choose the event location.
      </p>
    </div>
  );
}
