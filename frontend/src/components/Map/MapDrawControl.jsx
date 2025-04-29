import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import useFiltersContext from "../../hooks/use-filters-context";
import useMapContext from "../../hooks/use-map-context";

export const MapDrawControl = () => {
    const { setValueFn, registerClearDrawLayerFn, geoShape } = useFiltersContext();
    const { registerDrawCircleFn } = useMapContext();
    const drawLayerRef = useRef(null);
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        setupPMControls();

        // 處理使用者手動框選
        map.on("pm:create", (e) => {
            handleCreateLayer(e.layer);
        });

        registerClearDrawLayerFn(clearDrawLayer);
        // 註冊 drawCircle 到 context 到 CircleSelector 當作 callback 呼叫
        registerDrawCircleFn(drawCircle);

        return () => {
            map.pm.removeControls();
        };
    }, [map]);

    useEffect(() => {
        // 處理使用者上傳 GeoJSON 框選 polygon
        if (!map || !geoShape?.geometry?.coordinates) return;

        if (geoShape.properties?.isUserUploaded) {
            const latlngs = geoShape.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
            const polygon = L.polygon(latlngs);
            polygon.pm.enable({ allowSelfIntersection: false });
            handleCreateLayer(polygon);
        }
    }, [geoShape, map]);

    const setupPMControls = () => {
        map.pm.addControls({
            position: "topleft",
            drawMarker: false,
            drawPolyline: false,
            drawCircleMarker: false,
            drawText: false,
            rotateMode: false,
            cutPolygon: false,
        });
    };

    const clearDrawLayer = () => {
        if (drawLayerRef.current) {
            map.removeLayer(drawLayerRef.current);
            drawLayerRef.current = null;
        }
    };

    /**
     * Callback function for drawing a circle on the map.
     * 
     * This function is registered externally via `registerDrawCircleFn`
     * and is called when the user specifies a center point and radius.
     *
     * @param {number} lat - Latitude of the circle center.
     * @param {number} lng - Longitude of the circle center.
     * @param {number} radiusInMeters - Radius of the circle in meters.
     */
    const drawCircle = (lat, lng, radiusInMeters) => {
        
        clearDrawLayer();

        const circle = L.circle([lat, lng], { radius: radiusInMeters });
        circle.pm.enable({ allowSelfIntersection: false });
        handleCreateLayer(circle);
    };

    const handleCreateLayer = (layer) => {
        clearDrawLayer();
        map.addLayer(layer);
        drawLayerRef.current = layer;

        updateGeoShape(layer);

        layer.on("pm:edit", () => updateGeoShape(layer));
        layer.on("pm:update", () => updateGeoShape(layer));
        layer.on("pm:remove", () => {
            if (setValueFn) setValueFn("geoShape", null);
        });

        if (layer.getBounds) {
            map.fitBounds(layer.getBounds());
        }
    };

    const updateGeoShape = (layer) => {
        const geojson = layer.toGeoJSON();
        if (layer instanceof L.Circle) {
            geojson.properties = {
                ...geojson.properties,
                radiusInMeters: layer.getRadius(),
            };
        }
        if (setValueFn) {
            setValueFn("geoShape", geojson);
        }
    };

    return null;
};
