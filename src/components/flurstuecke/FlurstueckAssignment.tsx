'use client';

import { useState } from 'react';
import { FlurstueckBrandenburg, flurstueckeService } from '@/lib/flurstuecke';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';
import QLucideIcon from '@/components/ui/LucideIcon';

interface FlurstueckAssignmentProps {
  flurstuecke: FlurstueckBrandenburg[];
  landeigentuemerIdValue: string;
  onSuccess: () => void;
  onBack: () => void;
}

interface AssignmentResult {
  flurstueck: FlurstueckBrandenburg;
  success: boolean;
  error?: Error;
}

export const FlurstueckAssignment = ({
  flurstuecke,
  landeigentuemerIdValue,
  onSuccess,
  onBack,
}: FlurstueckAssignmentProps) => {
  const [bemerkungen, setBemerkungen] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: flurstuecke.length });
  const [results, setResults] = useState<AssignmentResult[] | null>(null);
  const [selectedFlurstuecke, setSelectedFlurstuecke] = useState(flurstuecke);

  const totalFlaeche = selectedFlurstuecke.reduce((sum, f) => sum + f.flaeche, 0);
  const uniqueGemarkungen = [...new Set(selectedFlurstuecke.map((f) => f.gemarkung))];

  const handleRemoveFlurstueck = (fid: number) => {
    setSelectedFlurstuecke((prev) => prev.filter((f) => f.fid !== fid));
  };

  const handleBulkAssign = async () => {
    try {
      setIsAssigning(true);
      setResults(null);
      const assignmentResults: AssignmentResult[] = [];

      // Sequential assignment with progress tracking
      for (let i = 0; i < selectedFlurstuecke.length; i++) {
        const flurstueck = selectedFlurstuecke[i];
        setProgress({ current: i + 1, total: selectedFlurstuecke.length });

        try {
          await flurstueckeService.assignToLandeigentuemer(
            landeigentuemerIdValue,
            flurstueck,
            bemerkungen
          );
          assignmentResults.push({ flurstueck, success: true });
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error');
          assignmentResults.push({ flurstueck, success: false, error: errorObj });
        }
      }

      setResults(assignmentResults);

      // Check results
      const failures = assignmentResults.filter((r) => !r.success);
      if (failures.length === 0) {
        // All successful - close modal
        onSuccess();
      }
      // Otherwise show results modal for user to review
    } catch (err) {
      console.error('Bulk assignment error:', err);
    } finally {
      setIsAssigning(false);
      setProgress({ current: 0, total: selectedFlurstuecke.length });
    }
  };

  const handleRetryFailed = async () => {
    if (!results) return;

    const failedFlurstuecke = results.filter((r) => !r.success).map((r) => r.flurstueck);
    setSelectedFlurstuecke(failedFlurstuecke);
    setResults(null);
  };

  const handleAcceptPartial = () => {
    onSuccess();
  };

  // Results Modal - Partial Success/Failure
  if (results) {
    const successes = results.filter((r) => r.success);
    const failures = results.filter((r) => !r.success);

    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
            {failures.length === 0 ? (
              <QLucideIcon icon="Check" size={32} strokeWidth={2} className="text-emerald-600" />
            ) : (
              <QLucideIcon icon="AlertCircle" size={32} strokeWidth={2} className="text-amber-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {failures.length === 0
              ? 'Erfolgreich zugeordnet'
              : 'Teilweise erfolgreich'}
          </h3>
        </div>

        {/* Success Summary */}
        {successes.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <QLucideIcon icon="CheckCircle2" size={20} strokeWidth={2} className="text-emerald-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-emerald-900 mb-2">
                  {successes.length} {successes.length === 1 ? 'Flurstück' : 'Flurstücke'} erfolgreich zugeordnet
                </h4>
                <div className="space-y-1">
                  {successes.map(({ flurstueck }) => (
                    <div key={flurstueck.fid} className="text-xs text-emerald-800">
                      • Flurstück {flurstueck.flstnrzae}
                      {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`} - {flurstueck.gemarkung}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Failure Summary */}
        {failures.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <QLucideIcon icon="XCircle" size={20} strokeWidth={2} className="text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-900 mb-2">
                  {failures.length} {failures.length === 1 ? 'Flurstück' : 'Flurstücke'} fehlgeschlagen
                </h4>
                <div className="space-y-2">
                  {failures.map(({ flurstueck, error }) => {
                    const isDuplicate = error?.code === '23505' || error?.message?.includes('duplicate');
                    const errorMessage = isDuplicate
                      ? 'Bereits zugeordnet'
                      : 'Fehler beim Zuordnen';

                    return (
                      <div key={flurstueck.fid} className="text-xs text-red-800">
                        • Flurstück {flurstueck.flstnrzae}
                        {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`} - {flurstueck.gemarkung}
                        <span className="text-red-600 ml-2">({errorMessage})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          {failures.length > 0 && (
            <Button variant="outline" onClick={handleRetryFailed}>
              Fehlgeschlagene erneut versuchen
            </Button>
          )}
          <Button variant="primary" onClick={handleAcceptPartial}>
            {failures.length === 0 ? 'Fertig' : 'Abschließen'}
          </Button>
        </div>
      </div>
    );
  }

  // Main Assignment UI
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600">
            <QLucideIcon icon="Layers" size={20} strokeWidth={2} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Sie ordnen {selectedFlurstuecke.length} {selectedFlurstuecke.length === 1 ? 'Flurstück' : 'Flurstücke'} zu
            </h3>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Gesamtfläche: {totalFlaeche.toLocaleString()} m²</span>
              <span>Gemarkungen: {uniqueGemarkungen.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Flurstücke List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Ausgewählte Flurstücke</h4>
        <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
          {selectedFlurstuecke.map((flurstueck) => (
            <div
              key={flurstueck.fid}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-emerald-100">
                  <QLucideIcon icon="MapPin" size={16} strokeWidth={2} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {flurstueck.flstnrzae}
                      {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`}
                    </span>
                    <span className="text-xs text-gray-500">
                      {flurstueck.flaeche.toLocaleString()} m²
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {flurstueck.gemarkung}, {flurstueck.gemeinde}
                  </p>
                </div>
              </div>
              {!isAssigning && selectedFlurstuecke.length > 1 && (
                <button
                  onClick={() => handleRemoveFlurstueck(flurstueck.fid)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Entfernen"
                >
                  <QLucideIcon icon="X" size={16} strokeWidth={2} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bemerkungen */}
      <Textarea
        label="Bemerkungen für alle Flurstücke (optional)"
        value={bemerkungen}
        onChange={(e) => setBemerkungen(e.target.value)}
        rows={4}
        disabled={isAssigning}
        placeholder="Diese Bemerkungen werden allen Flurstücken zugeordnet..."
      />

      {/* Progress Indicator */}
      {isAssigning && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-blue-900">
              Flurstücke werden zugeordnet... ({progress.current} von {progress.total})
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onBack} disabled={isAssigning}>
          Zurück
        </Button>
        <Button
          variant="primary"
          onClick={handleBulkAssign}
          disabled={isAssigning || selectedFlurstuecke.length === 0}
        >
          {isAssigning
            ? `Zuordnung läuft... (${progress.current}/${progress.total})`
            : `${selectedFlurstuecke.length} ${selectedFlurstuecke.length === 1 ? 'Flurstück' : 'Flurstücke'} zuordnen`
          }
        </Button>
      </div>
    </div>
  );
};
