'use client';

import { useState } from 'react';
import { Flurstueck } from '@/types/landeigentuemer';
import { FlurstueckBrandenburg } from '@/lib/flurstuecke';
import { FlurstueckSearch } from './FlurstueckSearch';
import { FlurstueckAssignment } from './FlurstueckAssignment';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';

interface FlurstueckFormProps {
  landeigentuemerIdValue: string;
  initialData?: Flurstueck;
  onSuccess: () => void;
  onCancel: () => void;
  mode?: 'create' | 'edit';
}

/**
 * Vollständiges Flurstück-Formular:
 * - CREATE Mode: FlurstueckSearch → FlurstueckAssignment → Success
 * - EDIT Mode: Nur Bemerkungen bearbeiten
 */
export const FlurstueckForm = ({
  landeigentuemerIdValue,
  initialData,
  onSuccess,
  onCancel,
  mode = 'create',
}: FlurstueckFormProps) => {
  const [step, setStep] = useState<'search' | 'assign' | 'edit'>(
    mode === 'edit' ? 'edit' : 'search'
  );
  const [selectedFlurstuecke, setSelectedFlurstuecke] = useState<FlurstueckBrandenburg[]>([]);
  const [bemerkungen, setBemerkungen] = useState(initialData?.bemerkungen || '');
  const [isSaving, setIsSaving] = useState(false);

  // CREATE Mode - FlurstueckSearch
  if (mode === 'create' && step === 'search') {
    return (
      <FlurstueckSearch
        onSelect={(flurstuecke) => {
          setSelectedFlurstuecke(flurstuecke);
          setStep('assign');
        }}
        onCancel={onCancel}
      />
    );
  }

  // CREATE Mode - FlurstueckAssignment
  if (mode === 'create' && step === 'assign' && selectedFlurstuecke.length > 0) {
    return (
      <FlurstueckAssignment
        flurstuecke={selectedFlurstuecke}
        landeigentuemerIdValue={landeigentuemerIdValue}
        onSuccess={onSuccess}
        onBack={() => setStep('search')}
      />
    );
  }

  // EDIT Mode - Bemerkungen bearbeiten
  if (mode === 'edit' && initialData) {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setIsSaving(true);
        const { flurstueckeService } = await import('@/lib/flurstuecke');
        await flurstueckeService.updateBemerkungen(initialData.id, bemerkungen);
        onSuccess();
      } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Flurstück Info (Read-only) */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Flurstück {initialData.flstnrzae}
            {initialData.flstnrnen && `/${initialData.flstnrnen}`}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            {initialData.gemarkung && (
              <div>
                <span className="text-gray-500">Gemarkung:</span> {initialData.gemarkung}
              </div>
            )}
            {initialData.flaeche && (
              <div>
                <span className="text-gray-500">Fläche:</span> {initialData.flaeche.toLocaleString()} m²
              </div>
            )}
          </div>
        </div>

        <Textarea
          label="Bemerkungen"
          value={bemerkungen}
          onChange={(e) => setBemerkungen(e.target.value)}
          rows={6}
          disabled={isSaving}
          placeholder="Notizen zu diesem Flurstück..."
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            variant="save"
            disabled={isSaving}
          >
            {isSaving ? 'Wird gespeichert...' : 'Speichern'}
          </Button>
        </div>
      </form>
    );
  }

  // Fallback
  return null;
};
