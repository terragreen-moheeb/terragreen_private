'use client';

import { useState, useEffect } from 'react';
import { LandeigentuemerFormData } from '@/types/landeigentuemer';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';

interface LandeigentuemerFormProps {
  initialData?: LandeigentuemerFormData;
  onSubmit: (data: LandeigentuemerFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LandeigentuemerForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: LandeigentuemerFormProps) => {
  const [formData, setFormData] = useState<LandeigentuemerFormData>({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    adresse: '',
    ort: '',
    plz: '',
    notizen: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LandeigentuemerFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LandeigentuemerFormData, string>> = {};

    if (!formData.vorname.trim()) {
      newErrors.vorname = 'Vorname ist erforderlich';
    }

    if (!formData.nachname.trim()) {
      newErrors.nachname = 'Nachname ist erforderlich';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
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

  const handleChange = (field: keyof LandeigentuemerFormData, value: string) => {
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
          label="Vorname"
          required
          value={formData.vorname}
          onChange={(e) => handleChange('vorname', e.target.value)}
          error={errors.vorname}
          disabled={isLoading}
        />

        <Input
          label="Nachname"
          required
          value={formData.nachname}
          onChange={(e) => handleChange('nachname', e.target.value)}
          error={errors.nachname}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="E-Mail"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          label="Telefon"
          type="tel"
          value={formData.telefon}
          onChange={(e) => handleChange('telefon', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Input
        label="Adresse"
        value={formData.adresse}
        onChange={(e) => handleChange('adresse', e.target.value)}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="PLZ"
          value={formData.plz}
          onChange={(e) => handleChange('plz', e.target.value)}
          disabled={isLoading}
        />

        <div className="md:col-span-2">
          <Input
            label="Ort"
            value={formData.ort}
            onChange={(e) => handleChange('ort', e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <Textarea
        label="Notizen"
        value={formData.notizen}
        onChange={(e) => handleChange('notizen', e.target.value)}
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
