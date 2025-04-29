import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer, Circle, Polygon } from "react-leaflet";
import { MapDrawControl } from "./MapDrawControl";
import useMapContext from "../../hooks/use-map-context";

const MapPanel = () => {
    const { isDrawMode } = useMapContext();

    return (
        <div className="map-area">
            <MapContainer
                center={[23.975, 120.973]}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {isDrawMode ? <MapDrawControl /> : <></>}
            </MapContainer>
        </div>
    );
};

export default MapPanel;
