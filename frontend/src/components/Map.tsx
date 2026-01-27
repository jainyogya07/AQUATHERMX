import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center: [number, number];
    zoom: number;
    markers?: { lat: number; lng: number; title: string }[];
    heatmapData?: { lat: number; lng: number; intensity: number }[]; // Placeholder for future heatmap layer
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
}

export default function Map({ center, zoom, markers = [] }: MapProps) {
    return (
        // @ts-ignore
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
            {/* @ts-ignore */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <FlyTo center={center} zoom={zoom} />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                    <Popup>{marker.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
