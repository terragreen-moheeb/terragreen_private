'use client';

import { useState } from 'react';
import { SpecializedMap } from '@/components/maps/SpecializedMapFactory';
import { MAP_CONFIGURATIONS } from '@/config/MapConf';
import Drawer from '@/components/ui/drawer';
import { AnalysisResult } from '@/components/analysis/AnalysisResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import QLucideIcon from '@/components/ui/LucideIcon';
import type { AnalysisResponse } from '@/app/api/analyze/route';

type MapType = keyof typeof MAP_CONFIGURATIONS;

export default function EchtZeitAnalysenPage() {
  const [selectedLayers, setSelectedLayers] = useState<MapType[]>(['flood']);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lon: number } | null>(null);

  const toggleLayer = (key: MapType) => {
    setSelectedLayers((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleMapClick = async (lat: number, lon: number) => {
    // Store clicked coordinates
    setClickedCoords({ lat, lon });

    // Reset previous state
    setAnalysisData(null);
    setAnalysisError(null);
    setIsAnalyzing(true);
    setIsDrawerOpen(true);

    try {
      // Call API route to fetch analysis data
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Abrufen der Analysedaten');
      }

      const data: AnalysisResponse = await response.json();
      setAnalysisData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten';
      console.error('Analysis error:', error);
      setAnalysisError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Optional: Reset after animation completes
    setTimeout(() => {
      setAnalysisData(null);
      setAnalysisError(null);
      setClickedCoords(null);
    }, 300);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar mit Layer-Liste */}
      <div className="w-52 p-4 border-r bg-gray-50 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Echtzeitanalyse</h2>

        {/* Hinweis */}
   
        <ul className="space-y-3">
          {Object.entries(MAP_CONFIGURATIONS).map(([key, config]) => (
            <li key={key}>
              <label className="flex items-center gap-3 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLayers.includes(key as MapType)}
                  onChange={() => toggleLayer(key as MapType)}
                  className="w-4 h-4 rounded"
                />
                {/* Farbbox nur für Layer mit einzelner Farbe (ohne Legende) */}
                {config.color && !config.legend && (
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: config.color }}
                  />
                )}
                <span className="text-sm">{config.name}</span>
              </label>

              {/* Legende - nur wenn Layer ausgewählt und Legende vorhanden */}
              {config.legend && selectedLayers.includes(key as MapType) && (
                <div className="ml-7 mt-2 space-y-1">
                  {config.legend.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded border border-black"
                        style={{ backgroundColor: item.color, opacity: 0.7 }}
                      />
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <SpecializedMap
          mapType="flood"
          activeLayers={selectedLayers}
          className="h-full w-full"
          onMapClick={handleMapClick}
        />
      </div>

      {/* Drawer für Analyse-Ergebnisse */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={
          isAnalyzing
            ? 'Analyse wird durchgeführt...'
            : analysisError
            ? 'Analyse fehlgeschlagen'
            : 'Analyse-Ergebnisse'
        }
      >
        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-sm text-gray-600">
              Daten werden analysiert...
            </p>
            {clickedCoords && (
              <p className="mt-2 text-xs text-gray-500">
                Koordinaten: {clickedCoords.lat.toFixed(6)}, {clickedCoords.lon.toFixed(6)}
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {!isAnalyzing && analysisError && (
          <div className="py-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <QLucideIcon icon="AlertCircle" size={32} strokeWidth={2} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fehler bei der Analyse
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md">
                {analysisError}
              </p>
              {clickedCoords && (
                <p className="text-xs text-gray-500 mb-4">
                  Koordinaten: {clickedCoords.lat.toFixed(6)}, {clickedCoords.lon.toFixed(6)}
                </p>
              )}
              <Button variant="primary" onClick={handleCloseDrawer}>
                Schließen
              </Button>
            </div>
          </div>
        )}

        {/* Success State - Analysis Results */}
        {!isAnalyzing && !analysisError && analysisData && (
          <AnalysisResult data={analysisData} />
        )}
      </Drawer>
    </div>
  );
}
