import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FiltersProvider } from "./context/filters.jsx";
import { MapProvider } from "./context/map.jsx";
import { DialogsProvider } from "./context/dialogs.jsx";

createRoot(document.getElementById("root")).render(
    <DialogsProvider>
        <MapProvider>
            <FiltersProvider>
                <StrictMode>
                    <App />
                </StrictMode>
            </FiltersProvider>
        </MapProvider>
    </DialogsProvider>
);
