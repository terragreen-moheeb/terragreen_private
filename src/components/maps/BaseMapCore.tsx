import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import maplibregl, { addProtocol, removeProtocol } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Transparent 1x1 PNG as fallback for missing tiles
const TRANSPARENT_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
  0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
  0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
]);

// Helper: Generate circle polygon points
const generateCirclePoints = (center: { lat: number; lon: number }, radiusKm: number, numPoints = 64): number[][] => {
  const points: number[][] = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 360) / numPoints;
    const lat = center.lat + (radiusKm / 111.32) * Math.cos((angle * Math.PI) / 180);
    const lon = center.lon + (radiusKm / (111.32 * Math.cos((center.lat * Math.PI) / 180))) * Math.sin((angle * Math.PI) / 180);
    points.push([lon, lat]);
  }
  points.push(points[0]); // Close polygon
  return points;
};

// Helper: Remove layer and source from map
const removeLayerAndSource = (map: maplibregl.Map, layerId: string, sourceId?: string) => {
  if (map.getLayer(layerId)) map.removeLayer(layerId);
  if (sourceId && map.getSource(sourceId)) map.removeSource(sourceId);
};

export interface BaseMapCoreRef {
  getMap: () => maplibregl.Map | null;
  flyTo: (coordinates: { lon: number; lat: number }, zoom?: number) => void;
  addMarker: (coordinates: { lon: number; lat: number }, color?: string) => maplibregl.Marker;
  addMarkerWithElement: (coordinates: { lon: number; lat: number }, element: HTMLElement) => maplibregl.Marker;
  removeMarker: (marker: maplibregl.Marker) => void;
  addCircle: (coordinates: { lon: number; lat: number }, radiusInMeters: number, options?: CircleOptions) => string;
  removeCircle: (circleId: string) => void;
  clearAllCircles: () => void;
  addRasterLayer: (layerId: string, sourceConfig: RasterSourceConfig) => void;
  removeRasterLayer: (layerId: string) => void;
}

export interface CircleOptions {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

export interface RasterSourceConfig {
  tiles: string[];
  tileSize?: number;
  scheme?: 'xyz' | 'tms';
  opacity?: number;
}

interface BaseMapCoreProps {
  center?: { lat: number; lon: number };
  zoom?: number;
  onClick?: (lat: number, lng: number) => void;
  className?: string;
  style?: React.CSSProperties;
  attribution?: string;
}

export const BaseMapCore = forwardRef<BaseMapCoreRef, BaseMapCoreProps>(({
  center = { lat: 51.1427959255, lon: 10.5028269792 },
  zoom = 6,
  onClick,
  style = { cursor: 'crosshair' },
  attribution = ''
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const circleIds = useRef<Set<string>>(new Set());
  const rasterLayers = useRef<Set<string>>(new Set());
  const isInitialized = useRef(false);

  useImperativeHandle(ref, () => ({
    getMap: () => map.current,

    flyTo: (coordinates, flyZoom = 15) => {
      if (map.current) {
        map.current.flyTo({
          center: [coordinates.lon, coordinates.lat],
          zoom: flyZoom,
          duration: 2000
        });
      }
    },

    addMarker: (coordinates, color = '#000000') => {
      if (!map.current) throw new Error('Map not initialized');

      return new maplibregl.Marker({ color })
        .setLngLat([coordinates.lon, coordinates.lat])
        .addTo(map.current);
    },

    addMarkerWithElement: (coordinates, element) => {
      if (!map.current) throw new Error('Map not initialized');

      return new maplibregl.Marker({ element: element })
        .setLngLat([coordinates.lon, coordinates.lat])
        .addTo(map.current);
    },

    removeMarker: (marker) => {
      marker.remove();
    },

    addCircle: (coordinates, radiusInMeters, options = {}) => {
      if (!map.current) throw new Error('Map not initialized');

      const {
        fillColor = '#3b82f6',
        fillOpacity = 0.2,
        strokeColor = '#3b82f6',
        strokeWidth = 2,
        strokeOpacity = 0.8
      } = options;

      const circleId = `circle-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const points = generateCirclePoints(coordinates, radiusInMeters / 1000);

      map.current.addSource(circleId, {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [points] }, properties: {} }
      });

      map.current.addLayer({
        id: `${circleId}-fill`,
        type: 'fill',
        source: circleId,
        paint: { 'fill-color': fillColor, 'fill-opacity': fillOpacity }
      });

      map.current.addLayer({
        id: `${circleId}-stroke`,
        type: 'line',
        source: circleId,
        paint: { 'line-color': strokeColor, 'line-width': strokeWidth, 'line-opacity': strokeOpacity }
      });

      circleIds.current.add(circleId);
      return circleId;
    },

    removeCircle: (circleId) => {
      if (!map.current) return;
      removeLayerAndSource(map.current, `${circleId}-fill`);
      removeLayerAndSource(map.current, `${circleId}-stroke`, circleId);
      circleIds.current.delete(circleId);
    },

    clearAllCircles: () => {
      if (!map.current) return;
      circleIds.current.forEach(circleId => {
        removeLayerAndSource(map.current!, `${circleId}-fill`);
        removeLayerAndSource(map.current!, `${circleId}-stroke`, circleId);
      });
      circleIds.current.clear();
    },

    addRasterLayer: (layerId: string, sourceConfig: RasterSourceConfig) => {
      if (!map.current) throw new Error('Map not initialized');

      const sourceId = `${layerId}-source`;

      if (map.current.getSource(sourceId)) return;

      const addLayer = () => {
        if (!map.current || map.current.getSource(sourceId)) return;

        // Convert tile URLs to use custom protocol to suppress 404 errors
        const tilesWithProtocol = sourceConfig.tiles.map(url => {
          // Only convert geoserver URLs to use our custom protocol
          if (url.includes('geoserver') || url.includes('WebMercatorQuad')) {
            return url.replace('https://', 'tiles://');
          }
          return url;
        });

        map.current.addSource(sourceId, {
          type: 'raster',
          tiles: tilesWithProtocol,
          tileSize: sourceConfig.tileSize || 256,
          scheme: sourceConfig.scheme || 'xyz',
          volatile: true // Don't cache tiles that fail to load
        } as maplibregl.RasterSourceSpecification); // Type assertion needed for volatile property

        map.current.addLayer({
          id: layerId,
          type: 'raster',
          source: sourceId,
          paint: {
            'raster-opacity': sourceConfig.opacity || 0.6
          }
        });

        rasterLayers.current.add(layerId);
      };

      if (map.current.isStyleLoaded()) {
        addLayer();
      } else {
        map.current.on('load', addLayer);
      }
    },

    removeRasterLayer: (layerId: string) => {
      if (!map.current) return;

      const sourceId = `${layerId}-source`;

      if (map.current.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
      if (map.current.getSource(sourceId)) {
        map.current.removeSource(sourceId);
      }

      rasterLayers.current.delete(layerId);
    }
  }));

  useEffect(() => {
    if (isInitialized.current || !mapContainer.current) return;

    isInitialized.current = true;

    // Register custom protocol handler for tile requests that suppresses 404 errors
    addProtocol('tiles', async (params, abortController) => {
      // Extract the actual URL from the tiles:// protocol
      const actualUrl = params.url.replace('tiles://', 'https://');

      // Use XMLHttpRequest instead of fetch to have more control over error logging
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', actualUrl, true);
        xhr.responseType = 'arraybuffer';

        // Suppress error logging
        const originalError = console.error;
        console.error = () => {}; // Temporarily disable console.error

        xhr.onload = function() {
          console.error = originalError; // Restore console.error

          if (xhr.status === 404 || xhr.status === 0) {
            // Return transparent PNG for missing tiles
            resolve({ data: TRANSPARENT_PNG.buffer });
          } else if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ data: xhr.response });
          } else {
            resolve({ data: TRANSPARENT_PNG.buffer });
          }
        };

        xhr.onerror = function() {
          console.error = originalError; // Restore console.error
          // Return transparent PNG for network errors
          resolve({ data: TRANSPARENT_PNG.buffer });
        };

        xhr.onabort = function() {
          console.error = originalError; // Restore console.error
          resolve({ data: TRANSPARENT_PNG.buffer });
        };

        if (abortController?.signal) {
          abortController.signal.addEventListener('abort', () => {
            xhr.abort();
          });
        }

        xhr.send();
      });
    });

    map.current = new maplibregl.Map({
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
            tiles: ['https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_grau/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png'],
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
      center: [center.lon, center.lat],
      zoom
    });

    // Suppress tile loading errors (404s are normal for missing tiles)
    map.current.on('error', (e) => {
      // Suppress all tile-related errors
      if (e.error) {
        const errorString = String(e.error.message || e.error).toLowerCase();
        if (errorString.includes('tile') ||
            errorString.includes('404') ||
            errorString.includes('http error')) {
          return;
        }
      }
      console.warn('Map error:', e.error);
    });


    if (map.current.getCanvas()) {
      map.current.getCanvas().style.cursor = style.cursor as string || 'crosshair';
    }

    // Add zoom controls (top-right) without compass
    const navigationControl = new maplibregl.NavigationControl({
      showCompass: false,
      showZoom: true, 
    });
    map.current.addControl(navigationControl, 'top-right');

    // Add margin-top to navigation control
    map.current.on('load', () => {
      const navControl = map.current?.getContainer().querySelector('.maplibregl-ctrl-top-right');
      if (navControl) {
        (navControl as HTMLElement).style.marginTop = '10px'; // mt-1 = 16px
      }
    });

    // Add attribution control with compact mode
    const attributionControl = new maplibregl.AttributionControl({
      customAttribution: "<div class='p-0.5 max-w-[300px]'>Daten:<br/>  " + attribution + "<br/> <br/> Karte:<br/>  © GeoBasis-DE / <a href='https://www.bkg.bund.de' target='_blank' rel='noopener noreferrer'>BKG</a> 2025 <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener noreferrer'>CC BY 4.0</a></div>",
      compact: true
    });

    map.current.addControl(attributionControl, 'bottom-right');

    // Force compact mode to be collapsed immediately and on load
    const forceCollapse = () => {
      const container = map.current?.getContainer();
      const attrControl = container?.querySelector('.maplibregl-ctrl-attrib');
      if (attrControl) {
        attrControl.classList.remove('maplibregl-compact-show');
      }
    };

    // Apply immediately
    requestAnimationFrame(forceCollapse);

    // Also apply on load to be safe
    map.current.on('load', forceCollapse);



    return () => {
      // Remove custom protocol
      removeProtocol('tiles');

      if (map.current) {
        map.current.remove();
        map.current = null;
        isInitialized.current = false;
      }
    };
  }, [center.lat, center.lon, style.cursor, zoom, attribution]);

  useEffect(() => {
    if (!map.current || !onClick) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      onClick(e.lngLat.lat, e.lngLat.lng);
    };

    map.current.on('click', handleClick);
    return () => { map.current?.off('click', handleClick); };
  }, [onClick]);

  return (
    <>
      <style>{`
        .maplibregl-ctrl-attrib.maplibregl-compact::after {
          content: '';
        }
        .maplibregl-ctrl-attrib.maplibregl-compact:not(.maplibregl-compact-show) .maplibregl-ctrl-attrib-inner {
          display: none;
        }
      `}</style>
      <div
        ref={mapContainer}
        className={"w-full h-[100vh]"}
        style={style}
      />
    </>
  );
});

BaseMapCore.displayName = 'BaseMapCore';