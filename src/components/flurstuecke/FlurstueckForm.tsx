'use client';

import { useState, useEffect } from 'react';
import { FlurstueckFormData } from '@/types/landeigentuemer';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';

interface FlurstueckFormProps {
  initialData?: FlurstueckFormData;
  onSubmit: (data: FlurstueckFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const FlurstueckForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: FlurstueckFormProps) => {
  const [formData, setFormData] = useState<FlurstueckFormData>({
    flurstueck_nummer: '',
    gemarkung: '',
    flaeche_qm: undefined,
    nutzungsart: '',
    bemerkungen: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FlurstueckFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FlurstueckFormData, string>> = {};

    if (!formData.flurstueck_nummer.trim()) {
      newErrors.flurstueck_nummer = 'Flurstück-Nummer ist erforderlich';
    }

    if (formData.flaeche_qm && formData.flaeche_qm < 0) {
      newErrors.flaeche_qm = 'Fläche muss positiv sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  const handleChange = (field: keyof FlurstueckFormData, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Flurstück-Nummer"
          required
          value={formData.flurstueck_nummer}
          onChange={(e) => handleChange('flurstueck_nummer', e.target.value)}
          error={errors.flurstueck_nummer}
          disabled={isLoading}
          placeholder="z.B. 123/45"
        />

        <Input
          label="Gemarkung"
          value={formData.gemarkung}
          onChange={(e) => handleChange('gemarkung', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fläche (m²)"
          type="number"
          step="0.01"
          value={formData.flaeche_qm || ''}
          onChange={(e) => handleChange('flaeche_qm', e.target.value ? parseFloat(e.target.value) : undefined)}
          error={errors.flaeche_qm}
          disabled={isLoading}
          placeholder="z.B. 1500.50"
        />

        <Input
          label="Nutzungsart"
          value={formData.nutzungsart}
          onChange={(e) => handleChange('nutzungsart', e.target.value)}
          disabled={isLoading}
          placeholder="z.B. Ackerland, Grünland, Wald"
        />
      </div>

      <Textarea
        label="Bemerkungen"
        value={formData.bemerkungen}
        onChange={(e) => handleChange('bemerkungen', e.target.value)}
        rows={4}
        disabled={isLoading}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Abbrechen
        </Button>
        <Button
          type="submit"
          variant="save"
          disabled={isLoading}
        >
          {isLoading ? 'Wird gespeichert...' : 'Speichern'}
        </Button>
      </div>
    </form>
  );
};
