(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/maps/BaseMapCore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseMapCore",
    ()=>BaseMapCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
// Transparent 1x1 PNG as fallback for missing tiles
const TRANSPARENT_PNG = new Uint8Array([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
    0x00,
    0x00,
    0x00,
    0x0d,
    0x49,
    0x48,
    0x44,
    0x52,
    0x00,
    0x00,
    0x00,
    0x01,
    0x00,
    0x00,
    0x00,
    0x01,
    0x08,
    0x06,
    0x00,
    0x00,
    0x00,
    0x1f,
    0x15,
    0xc4,
    0x89,
    0x00,
    0x00,
    0x00,
    0x0a,
    0x49,
    0x44,
    0x41,
    0x54,
    0x78,
    0x9c,
    0x63,
    0x00,
    0x01,
    0x00,
    0x00,
    0x05,
    0x00,
    0x01,
    0x0d,
    0x0a,
    0x2d,
    0xb4,
    0x00,
    0x00,
    0x00,
    0x00,
    0x49,
    0x45,
    0x4e,
    0x44,
    0xae,
    0x42,
    0x60,
    0x82
]);
// Helper: Generate circle polygon points
const generateCirclePoints = function(center, radiusKm) {
    let numPoints = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 64;
    const points = [];
    for(let i = 0; i < numPoints; i++){
        const angle = i * 360 / numPoints;
        const lat = center.lat + radiusKm / 111.32 * Math.cos(angle * Math.PI / 180);
        const lon = center.lon + radiusKm / (111.32 * Math.cos(center.lat * Math.PI / 180)) * Math.sin(angle * Math.PI / 180);
        points.push([
            lon,
            lat
        ]);
    }
    points.push(points[0]); // Close polygon
    return points;
};
// Helper: Remove layer and source from map
const removeLayerAndSource = (map, layerId, sourceId)=>{
    if (map.getLayer(layerId)) map.removeLayer(layerId);
    if (sourceId && map.getSource(sourceId)) map.removeSource(sourceId);
};
const BaseMapCore = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((param, ref)=>{
    let { center = {
        lat: 51.1427959255,
        lon: 10.5028269792
    }, zoom = 6, onClick, className = "w-full h-[100vh]", style = {
        cursor: 'crosshair'
    }, attribution = '' } = param;
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const circleIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const rasterLayers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const isInitialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "BaseMapCore.useImperativeHandle": ()=>({
                getMap: ({
                    "BaseMapCore.useImperativeHandle": ()=>map.current
                })["BaseMapCore.useImperativeHandle"],
                flyTo: ({
                    "BaseMapCore.useImperativeHandle": function(coordinates) {
                        let flyZoom = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 15;
                        if (map.current) {
                            map.current.flyTo({
                                center: [
                                    coordinates.lon,
                                    coordinates.lat
                                ],
                                zoom: flyZoom,
                                duration: 2000
                            });
                        }
                    }
                })["BaseMapCore.useImperativeHandle"],
                addMarker: ({
                    "BaseMapCore.useImperativeHandle": function(coordinates) {
                        let color = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '#000000';
                        if (!map.current) throw new Error('Map not initialized');
                        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                            color
                        }).setLngLat([
                            coordinates.lon,
                            coordinates.lat
                        ]).addTo(map.current);
                    }
                })["BaseMapCore.useImperativeHandle"],
                addMarkerWithElement: ({
                    "BaseMapCore.useImperativeHandle": (coordinates, element)=>{
                        if (!map.current) throw new Error('Map not initialized');
                        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                            element: element
                        }).setLngLat([
                            coordinates.lon,
                            coordinates.lat
                        ]).addTo(map.current);
                    }
                })["BaseMapCore.useImperativeHandle"],
                removeMarker: ({
                    "BaseMapCore.useImperativeHandle": (marker)=>{
                        marker.remove();
                    }
                })["BaseMapCore.useImperativeHandle"],
                addCircle: ({
                    "BaseMapCore.useImperativeHandle": function(coordinates, radiusInMeters) {
                        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                        if (!map.current) throw new Error('Map not initialized');
                        const { fillColor = '#3b82f6', fillOpacity = 0.2, strokeColor = '#3b82f6', strokeWidth = 2, strokeOpacity = 0.8 } = options;
                        const circleId = "circle-".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 11));
                        const points = generateCirclePoints(coordinates, radiusInMeters / 1000);
                        map.current.addSource(circleId, {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                    type: 'Polygon',
                                    coordinates: [
                                        points
                                    ]
                                },
                                properties: {}
                            }
                        });
                        map.current.addLayer({
                            id: "".concat(circleId, "-fill"),
                            type: 'fill',
                            source: circleId,
                            paint: {
                                'fill-color': fillColor,
                                'fill-opacity': fillOpacity
                            }
                        });
                        map.current.addLayer({
                            id: "".concat(circleId, "-stroke"),
                            type: 'line',
                            source: circleId,
                            paint: {
                                'line-color': strokeColor,
                                'line-width': strokeWidth,
                                'line-opacity': strokeOpacity
                            }
                        });
                        circleIds.current.add(circleId);
                        return circleId;
                    }
                })["BaseMapCore.useImperativeHandle"],
                removeCircle: ({
                    "BaseMapCore.useImperativeHandle": (circleId)=>{
                        if (!map.current) return;
                        removeLayerAndSource(map.current, "".concat(circleId, "-fill"));
                        removeLayerAndSource(map.current, "".concat(circleId, "-stroke"), circleId);
                        circleIds.current.delete(circleId);
                    }
                })["BaseMapCore.useImperativeHandle"],
                clearAllCircles: ({
                    "BaseMapCore.useImperativeHandle": ()=>{
                        if (!map.current) return;
                        circleIds.current.forEach({
                            "BaseMapCore.useImperativeHandle": (circleId)=>{
                                removeLayerAndSource(map.current, "".concat(circleId, "-fill"));
                                removeLayerAndSource(map.current, "".concat(circleId, "-stroke"), circleId);
                            }
                        }["BaseMapCore.useImperativeHandle"]);
                        circleIds.current.clear();
                    }
                })["BaseMapCore.useImperativeHandle"],
                addRasterLayer: ({
                    "BaseMapCore.useImperativeHandle": (layerId, sourceConfig)=>{
                        if (!map.current) throw new Error('Map not initialized');
                        const sourceId = "".concat(layerId, "-source");
                        if (map.current.getSource(sourceId)) return;
                        const addLayer = {
                            "BaseMapCore.useImperativeHandle.addLayer": ()=>{
                                if (!map.current || map.current.getSource(sourceId)) return;
                                // Convert tile URLs to use custom protocol to suppress 404 errors
                                const tilesWithProtocol = sourceConfig.tiles.map({
                                    "BaseMapCore.useImperativeHandle.addLayer.tilesWithProtocol": (url)=>{
                                        // Only convert geoserver URLs to use our custom protocol
                                        if (url.includes('geoserver') || url.includes('WebMercatorQuad')) {
                                            return url.replace('https://', 'tiles://');
                                        }
                                        return url;
                                    }
                                }["BaseMapCore.useImperativeHandle.addLayer.tilesWithProtocol"]);
                                map.current.addSource(sourceId, {
                                    type: 'raster',
                                    tiles: tilesWithProtocol,
                                    tileSize: sourceConfig.tileSize || 256,
                                    scheme: sourceConfig.scheme || 'xyz',
                                    volatile: true // Don't cache tiles that fail to load
                                }); // Type assertion needed for volatile property
                                map.current.addLayer({
                                    id: layerId,
                                    type: 'raster',
                                    source: sourceId,
                                    paint: {
                                        'raster-opacity': sourceConfig.opacity || 0.6
                                    }
                                });
                                rasterLayers.current.add(layerId);
                            }
                        }["BaseMapCore.useImperativeHandle.addLayer"];
                        if (map.current.isStyleLoaded()) {
                            addLayer();
                        } else {
                            map.current.on('load', addLayer);
                        }
                    }
                })["BaseMapCore.useImperativeHandle"],
                removeRasterLayer: ({
                    "BaseMapCore.useImperativeHandle": (layerId)=>{
                        if (!map.current) return;
                        const sourceId = "".concat(layerId, "-source");
                        if (map.current.getLayer(layerId)) {
                            map.current.removeLayer(layerId);
                        }
                        if (map.current.getSource(sourceId)) {
                            map.current.removeSource(sourceId);
                        }
                        rasterLayers.current.delete(layerId);
                    }
                })["BaseMapCore.useImperativeHandle"]
            })
    }["BaseMapCore.useImperativeHandle"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseMapCore.useEffect": ()=>{
            if (isInitialized.current || !mapContainer.current) return;
            isInitialized.current = true;
            // Register custom protocol handler for tile requests that suppresses 404 errors
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProtocol"])('tiles', {
                "BaseMapCore.useEffect": async (params, abortController)=>{
                    // Extract the actual URL from the tiles:// protocol
                    const actualUrl = params.url.replace('tiles://', 'https://');
                    // Use XMLHttpRequest instead of fetch to have more control over error logging
                    return new Promise({
                        "BaseMapCore.useEffect": (resolve)=>{
                            const xhr = new XMLHttpRequest();
                            xhr.open('GET', actualUrl, true);
                            xhr.responseType = 'arraybuffer';
                            // Suppress error logging
                            const originalError = console.error;
                            console.error = ({
                                "BaseMapCore.useEffect": ()=>{}
                            })["BaseMapCore.useEffect"]; // Temporarily disable console.error
                            xhr.onload = ({
                                "BaseMapCore.useEffect": function() {
                                    console.error = originalError; // Restore console.error
                                    if (xhr.status === 404 || xhr.status === 0) {
                                        // Return transparent PNG for missing tiles
                                        resolve({
                                            data: TRANSPARENT_PNG.buffer
                                        });
                                    } else if (xhr.status >= 200 && xhr.status < 300) {
                                        resolve({
                                            data: xhr.response
                                        });
                                    } else {
                                        resolve({
                                            data: TRANSPARENT_PNG.buffer
                                        });
                                    }
                                }
                            })["BaseMapCore.useEffect"];
                            xhr.onerror = ({
                                "BaseMapCore.useEffect": function() {
                                    console.error = originalError; // Restore console.error
                                    // Return transparent PNG for network errors
                                    resolve({
                                        data: TRANSPARENT_PNG.buffer
                                    });
                                }
                            })["BaseMapCore.useEffect"];
                            xhr.onabort = ({
                                "BaseMapCore.useEffect": function() {
                                    console.error = originalError; // Restore console.error
                                    resolve({
                                        data: TRANSPARENT_PNG.buffer
                                    });
                                }
                            })["BaseMapCore.useEffect"];
                            if (abortController === null || abortController === void 0 ? void 0 : abortController.signal) {
                                abortController.signal.addEventListener('abort', {
                                    "BaseMapCore.useEffect": ()=>{
                                        xhr.abort();
                                    }
                                }["BaseMapCore.useEffect"]);
                            }
                            xhr.send();
                        }
                    }["BaseMapCore.useEffect"]);
                }
            }["BaseMapCore.useEffect"]);
            map.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                container: mapContainer.current,
                maplibreLogo: false,
                attributionControl: false,
                minZoom: 5,
                maxZoom: 18,
                pitch: 0,
                bearing: 0,
                dragRotate: false,
                pitchWithRotate: false,
                touchPitch: false,
                style: {
                    version: 8,
                    sources: {
                        'basemap-grey': {
                            type: 'raster',
                            tiles: [
                                'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_farbe/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png'
                            ],
                            tileSize: 256
                        }
                    },
                    layers: [
                        {
                            id: 'background',
                            type: 'background',
                            paint: {
                                'background-color': '#383838'
                            }
                        },
                        {
                            id: 'basemap',
                            type: 'raster',
                            source: 'basemap-grey'
                        }
                    ]
                },
                center: [
                    center.lon,
                    center.lat
                ],
                zoom
            });
            // Suppress tile loading errors (404s are normal for missing tiles)
            map.current.on('error', {
                "BaseMapCore.useEffect": (e)=>{
                    // Suppress all tile-related errors
                    if (e.error) {
                        const errorString = String(e.error.message || e.error).toLowerCase();
                        if (errorString.includes('tile') || errorString.includes('404') || errorString.includes('http error')) {
                            return;
                        }
                    }
                    console.warn('Map error:', e.error);
                }
            }["BaseMapCore.useEffect"]);
            if (map.current.getCanvas()) {
                map.current.getCanvas().style.cursor = style.cursor || 'crosshair';
            }
            // Add zoom controls (top-right) without compass
            const navigationControl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NavigationControl({
                showCompass: false,
                showZoom: true
            });
            map.current.addControl(navigationControl, 'top-right');
            // Add margin-top to navigation control
            map.current.on('load', {
                "BaseMapCore.useEffect": ()=>{
                    var _map_current;
                    const navControl = (_map_current = map.current) === null || _map_current === void 0 ? void 0 : _map_current.getContainer().querySelector('.maplibregl-ctrl-top-right');
                    if (navControl) {
                        navControl.style.marginTop = '10px'; // mt-1 = 16px
                    }
                }
            }["BaseMapCore.useEffect"]);
            // Add attribution control with compact mode
            const attributionControl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].AttributionControl({
                customAttribution: "<div class='p-0.5 max-w-[300px]'>Daten:<br/>  " + attribution + "<br/> <br/> Karte:<br/>  © GeoBasis-DE / <a href='https://www.bkg.bund.de' target='_blank' rel='noopener noreferrer'>BKG</a> 2025 <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener noreferrer'>CC BY 4.0</a></div>",
                compact: true
            });
            map.current.addControl(attributionControl, 'bottom-right');
            // Force compact mode to be collapsed immediately and on load
            const forceCollapse = {
                "BaseMapCore.useEffect.forceCollapse": ()=>{
                    var _map_current;
                    const container = (_map_current = map.current) === null || _map_current === void 0 ? void 0 : _map_current.getContainer();
                    const attrControl = container === null || container === void 0 ? void 0 : container.querySelector('.maplibregl-ctrl-attrib');
                    if (attrControl) {
                        attrControl.classList.remove('maplibregl-compact-show');
                    }
                }
            }["BaseMapCore.useEffect.forceCollapse"];
            // Apply immediately
            requestAnimationFrame(forceCollapse);
            // Also apply on load to be safe
            map.current.on('load', forceCollapse);
            return ({
                "BaseMapCore.useEffect": ()=>{
                    // Remove custom protocol
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeProtocol"])('tiles');
                    if (map.current) {
                        map.current.remove();
                        map.current = null;
                        isInitialized.current = false;
                    }
                }
            })["BaseMapCore.useEffect"];
        }
    }["BaseMapCore.useEffect"], [
        center.lat,
        center.lon,
        style.cursor,
        zoom,
        attribution
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseMapCore.useEffect": ()=>{
            if (!map.current || !onClick) return;
            const handleClick = {
                "BaseMapCore.useEffect.handleClick": (e)=>{
                    onClick(e.lngLat.lat, e.lngLat.lng);
                }
            }["BaseMapCore.useEffect.handleClick"];
            map.current.on('click', handleClick);
            return ({
                "BaseMapCore.useEffect": ()=>{
                    var _map_current;
                    (_map_current = map.current) === null || _map_current === void 0 ? void 0 : _map_current.off('click', handleClick);
                }
            })["BaseMapCore.useEffect"];
        }
    }["BaseMapCore.useEffect"], [
        onClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n        .maplibregl-ctrl-attrib.maplibregl-compact::after {\n          content: '';\n        }\n        .maplibregl-ctrl-attrib.maplibregl-compact:not(.maplibregl-compact-show) .maplibregl-ctrl-attrib-inner {\n          display: none;\n        }\n      "
            }, void 0, false, {
                fileName: "[project]/src/components/maps/BaseMapCore.tsx",
                lineNumber: 410,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainer,
                className: "w-full h-[90vh]",
                style: style
            }, void 0, false, {
                fileName: "[project]/src/components/maps/BaseMapCore.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
}, "cIByWVNa+37kIAHbCoiMfkUnPLc=")), "cIByWVNa+37kIAHbCoiMfkUnPLc=");
_c1 = BaseMapCore;
BaseMapCore.displayName = 'BaseMapCore';
var _c, _c1;
__turbopack_context__.k.register(_c, "BaseMapCore$forwardRef");
__turbopack_context__.k.register(_c1, "BaseMapCore");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/maps/SpecializedMapFactory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpecializedMap",
    ()=>SpecializedMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$maps$2f$BaseMapCore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/maps/BaseMapCore.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const MAP_CONFIGURATIONS = {
    interactive: {
        name: 'Interaktive Karte',
        description: 'Grundkarte ohne zusätzliche Layer',
        layers: []
    },
    flood: {
        name: 'Hochwasserkarte',
        description: 'Zeigt Hochwasserrisikobereiche basierend auf aktuellen Umgebungsrichtlinien',
        layers: [
            {
                id: 'hochwasser-layer',
                name: 'Hochwasserrisiko',
                tiles: [
                    'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Ahochwasserrisiko@WebMercatorQuad@png/{z}/{x}/{y}.png'
                ],
                opacity: 1,
                tileSize: 256,
                scheme: 'tms'
            }
        ]
    },
    vogelschutzgebiete: {
        name: 'Vogelschutzgebiete',
        description: 'Zeigt Vogelschutzgebiete basierend auf aktuellen Umgebungsrichtlinien',
        layers: [
            {
                id: 'vogelschutzgebiete-layer',
                name: 'Vogelschutzgebiete',
                tiles: [
                    'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Avogelschutzgebiete@WebMercatorQuad@png/{z}/{x}/{y}.png'
                ],
                opacity: 1,
                tileSize: 256,
                scheme: 'tms'
            }
        ]
    },
    natur: {
        name: 'Naturschutzgebiete',
        description: 'Zeigt Naturschutzgebiete basierend auf aktuellen Umgebungsrichtlinien',
        layers: [
            {
                id: 'natur-layer',
                name: 'Naturschutzgebiete',
                tiles: [
                    'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Anaturschutzgebiete@WebMercatorQuad@png/{z}/{x}/{y}.png'
                ],
                opacity: 1,
                tileSize: 256,
                scheme: 'tms'
            }
        ]
    },
    ffh: {
        name: 'FFH-Gebiete',
        description: 'Zeigt FFH-Gebiete basierend auf aktuellen Umgebungsrichtlinien',
        layers: [
            {
                id: 'ffh-layer',
                name: 'FFH-Gebiete',
                tiles: [
                    'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Affh@WebMercatorQuad@png/{z}/{x}/{y}.png'
                ],
                opacity: 1,
                tileSize: 256,
                scheme: 'tms'
            }
        ]
    }
};
const SpecializedMap = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(_c = _s((param, ref)=>{
    let { mapType, className = "", attribution = '© OpenStreetMap contributors' } = param;
    _s();
    const config = MAP_CONFIGURATIONS[mapType];
    const internalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = ref || internalRef;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpecializedMap.useEffect": ()=>{
            if (!mapRef.current || !(config === null || config === void 0 ? void 0 : config.layers.length)) return;
            // Wait for map to be ready, then add layers
            const addLayers = {
                "SpecializedMap.useEffect.addLayers": ()=>{
                    config.layers.forEach({
                        "SpecializedMap.useEffect.addLayers": (layer)=>{
                            var _mapRef_current;
                            (_mapRef_current = mapRef.current) === null || _mapRef_current === void 0 ? void 0 : _mapRef_current.addRasterLayer(layer.id, {
                                tiles: layer.tiles,
                                opacity: layer.opacity,
                                tileSize: layer.tileSize,
                                scheme: layer.scheme
                            });
                        }
                    }["SpecializedMap.useEffect.addLayers"]);
                }
            }["SpecializedMap.useEffect.addLayers"];
            // Small delay to ensure map is initialized
            const timeout = setTimeout(addLayers, 500);
            return ({
                "SpecializedMap.useEffect": ()=>{
                    clearTimeout(timeout);
                    config.layers.forEach({
                        "SpecializedMap.useEffect": (layer)=>{
                            var _mapRef_current;
                            (_mapRef_current = mapRef.current) === null || _mapRef_current === void 0 ? void 0 : _mapRef_current.removeRasterLayer(layer.id);
                        }
                    }["SpecializedMap.useEffect"]);
                }
            })["SpecializedMap.useEffect"];
        }
    }["SpecializedMap.useEffect"], [
        config,
        mapRef
    ]);
    if (!config) {
        console.warn("Unknown map type: ".concat(mapType));
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$maps$2f$BaseMapCore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseMapCore"], {
        ref: mapRef,
        className: className,
        attribution: attribution
    }, void 0, false, {
        fileName: "[project]/src/components/maps/SpecializedMapFactory.tsx",
        lineNumber: 145,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "mOFHOaD1fnrRagX7BRa/3b2m2Gk=")), "mOFHOaD1fnrRagX7BRa/3b2m2Gk=");
_c1 = SpecializedMap;
SpecializedMap.displayName = 'SpecializedMap';
var _c, _c1;
__turbopack_context__.k.register(_c, "SpecializedMap$React.forwardRef");
__turbopack_context__.k.register(_c1, "SpecializedMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/user/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/context/GlobalContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$maps$2f$SpecializedMapFactory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/maps/SpecializedMapFactory.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DashboardContent() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    var _user_first_name, _user_last_name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold p-4",
                children: [
                    "Willkommen, ",
                    (_user_first_name = user === null || user === void 0 ? void 0 : user.first_name) !== null && _user_first_name !== void 0 ? _user_first_name : '',
                    " ",
                    (_user_last_name = user === null || user === void 0 ? void 0 : user.last_name) !== null && _user_last_name !== void 0 ? _user_last_name : '',
                    "!"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/user/page.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[calc(100vh-80px)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$maps$2f$SpecializedMapFactory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecializedMap"], {
                    mapType: "flood",
                    className: "h-full w-full"
                }, void 0, false, {
                    fileName: "[project]/src/app/user/page.tsx",
                    lineNumber: 11,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/user/page.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/user/page.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_s(DashboardContent, "cJjeAthpnu+gNd6tVK8Y5GPcxVQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = DashboardContent;
var _c;
__turbopack_context__.k.register(_c, "DashboardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c597c8da._.js.map