'use client';

import { useState } from 'react';
import { FlurstueckBrandenburg, flurstueckeService } from '@/lib/flurstuecke';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import QLucideIcon from '@/components/ui/LucideIcon';

interface FlurstueckSearchProps {
  onSelect: (flurstuecke: FlurstueckBrandenburg[]) => void;
  onCancel: () => void;
}

export const FlurstueckSearch = ({ onSelect, onCancel }: FlurstueckSearchProps) => {
  const [activeTab, setActiveTab] = useState<'zaehler' | 'karte'>('zaehler');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FlurstueckBrandenburg[]>([]);
  const [selectedFlurstuecke, setSelectedFlurstuecke] = useState<FlurstueckBrandenburg[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Zähler/Nenner Suche
  const [zaehler, setZaehler] = useState('');
  const [nenner, setNenner] = useState('');
  const [gemarkung, setGemarkung] = useState('');

  // Karten Suche
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleSearchByZaehlerNenner = async () => {
    if (!zaehler.trim()) {
      setError('Bitte Zähler eingeben');
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const results = await flurstueckeService.searchByZaehlerNenner(
        zaehler,
        nenner || null,
        gemarkung || undefined
      );
      setSearchResults(results);

      if (results.length === 0) {
        setError('Keine Flurstücke gefunden');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Fehler bei der Suche. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchByCoordinates = async () => {
    if (!lat || !lon) {
      setError('Bitte Koordinaten eingeben');
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const result = await flurstueckeService.searchByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      );

      if (result) {
        setSearchResults([result]);
      } else {
        setError('Kein Flurstück an diesen Koordinaten gefunden');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Fehler bei der Suche. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleSelection = (flurstueck: FlurstueckBrandenburg) => {
    setSelectedFlurstuecke((prev) => {
      const isSelected = prev.some((f) => f.fid === flurstueck.fid);
      if (isSelected) {
        return prev.filter((f) => f.fid !== flurstueck.fid);
      } else {
        return [...prev, flurstueck];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedFlurstuecke([]);
  };

  const handleContinue = () => {
    onSelect(selectedFlurstuecke);
  };

  const isSelected = (flurstueck: FlurstueckBrandenburg) => {
    return selectedFlurstuecke.some((f) => f.fid === flurstueck.fid);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('zaehler')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'zaehler'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <QLucideIcon icon="Hash" size={16} strokeWidth={2} />
            Zähler/Nenner
          </div>
        </button>
        <button
          onClick={() => setActiveTab('karte')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'karte'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <QLucideIcon icon="Map" size={16} strokeWidth={2} />
            Koordinaten
          </div>
        </button>
      </div>

      {/* Zähler/Nenner Tab */}
      {activeTab === 'zaehler' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Zähler"
              required
              value={zaehler}
              onChange={(e) => setZaehler(e.target.value)}
              placeholder="z.B. 152"
            />
            <Input
              label="Nenner (optional)"
              value={nenner}
              onChange={(e) => setNenner(e.target.value)}
              placeholder="z.B. 1"
            />
          </div>
          <Input
            label="Gemarkung (optional)"
            value={gemarkung}
            onChange={(e) => setGemarkung(e.target.value)}
            placeholder="z.B. Garlitz"
          />
          <Button
            onClick={handleSearchByZaehlerNenner}
            disabled={isSearching || !zaehler}
            variant="primary"
            className="w-full"
          >
            {isSearching ? 'Suche läuft...' : 'Flurstück suchen'}
          </Button>
        </div>
      )}

      {/* Koordinaten Tab */}
      {activeTab === 'karte' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Latitude"
              required
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="z.B. 52.5200"
            />
            <Input
              label="Longitude"
              required
              type="number"
              step="any"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="z.B. 13.4050"
            />
          </div>
          <div className="text-xs text-gray-500">
            <QLucideIcon icon="Info" size={14} strokeWidth={2} className="inline mr-1" />
            Tipp: Klicken Sie auf die Karte, um Koordinaten automatisch zu übernehmen
          </div>
          <Button
            onClick={handleSearchByCoordinates}
            disabled={isSearching || !lat || !lon}
            variant="primary"
            className="w-full"
          >
            {isSearching ? 'Suche läuft...' : 'Flurstück suchen'}
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Suchergebnisse ({searchResults.length})
            </h3>
            {selectedFlurstuecke.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Alle abwählen
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {searchResults.map((flurstueck) => {
              const selected = isSelected(flurstueck);
              return (
                <div
                  key={flurstueck.fid}
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                  onClick={() => handleToggleSelection(flurstueck)}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="flex items-center pt-0.5">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selected
                            ? 'bg-emerald-600 border-emerald-600'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selected && (
                          <QLucideIcon
                            icon="Check"
                            size={14}
                            strokeWidth={3}
                            className="text-white"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Flurstück {flurstueck.flstnrzae}
                          {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`}
                        </span>
                        <span className="text-xs text-gray-500">
                          {flurstueck.flaeche.toLocaleString()} m²
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="MapPin" size={12} strokeWidth={2} />
                          {flurstueck.gemarkung}, {flurstueck.gemeinde}
                        </div>
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="Map" size={12} strokeWidth={2} />
                          {flurstueck.kreis}, {flurstueck.land}
                        </div>
                        {flurstueck.lagebeztxt && (
                          <div className="flex items-center gap-1">
                            <QLucideIcon icon="Info" size={12} strokeWidth={2} />
                            {flurstueck.lagebeztxt}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selection Bar - Shows when items are selected */}
      {selectedFlurstuecke.length > 0 && (
        <div className="sticky bottom-0 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full text-sm font-medium">
                {selectedFlurstuecke.length}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFlurstuecke.length} {selectedFlurstuecke.length === 1 ? 'Flurstück' : 'Flurstücke'} ausgewählt
                </p>
                <p className="text-xs text-gray-600">
                  Gesamtfläche: {selectedFlurstuecke.reduce((sum, f) => sum + f.flaeche, 0).toLocaleString()} m²
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClearSelection}>
                Abwählen
              </Button>
              <Button variant="primary" size="sm" onClick={handleContinue}>
                Weiter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
};
