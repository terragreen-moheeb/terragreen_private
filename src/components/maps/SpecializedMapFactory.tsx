import React, { useEffect, useRef } from 'react';
import { BaseMapCore, BaseMapCoreRef } from './BaseMapCore';
import { MAP_CONFIGURATIONS } from '@/config/MapConf';

interface SpecializedMapProps {
  mapType: keyof typeof MAP_CONFIGURATIONS;
  activeLayers?: (keyof typeof MAP_CONFIGURATIONS)[];
  className?: string;
  attribution?: string;
  onMapClick?: (lat: number, lon: number) => void;
}

export const SpecializedMap = React.forwardRef<BaseMapCoreRef, SpecializedMapProps>(({
  mapType,
  activeLayers,
  className = "",
  attribution = '© OpenStreetMap contributors',
  onMapClick
}, ref) => {
  const internalRef = useRef<BaseMapCoreRef>(null);
  const mapRef = (ref as React.RefObject<BaseMapCoreRef>) || internalRef;
  const addedLayersRef = useRef<Set<string>>(new Set());

  // Sammle alle Layer aus activeLayers oder fallback auf mapType
  const layersToShow = activeLayers
    ? activeLayers.flatMap(key => MAP_CONFIGURATIONS[key]?.layers || [])
    : MAP_CONFIGURATIONS[mapType]?.layers || [];

  useEffect(() => {
    if (!mapRef.current) return;

    const addLayers = () => {
      // Entferne alte Layer die nicht mehr aktiv sind
      addedLayersRef.current.forEach(layerId => {
        const stillActive = layersToShow.some(l => l.id === layerId);
        if (!stillActive) {
          mapRef.current?.removeRasterLayer(layerId);
          addedLayersRef.current.delete(layerId);
        }
      });

      // Füge neue Layer hinzu
      layersToShow.forEach(layer => {
        if (!addedLayersRef.current.has(layer.id)) {
          mapRef.current?.addRasterLayer(layer.id, {
            tiles: layer.tiles,
            opacity: layer.opacity,
            tileSize: layer.tileSize,
            scheme: layer.scheme
          });
          addedLayersRef.current.add(layer.id);
        }
      });
    };

    const timeout = setTimeout(addLayers, 500);
    return () => clearTimeout(timeout);
  }, [layersToShow, mapRef]);

  return (
    <BaseMapCore
      ref={mapRef}
      className={className}
      attribution={attribution}
      onClick={onMapClick}
    />
  );
});

SpecializedMap.displayName = 'SpecializedMap';
