'use client';

import { useState, useEffect } from 'react';
import { Landeigentuemer, LandeigentuemerFormData } from '@/types/landeigentuemer';
import { landeigentuemerService } from '@/lib/landeigentuemer';
import { LandeigentuemerList } from '@/components/landeigentuemer/LandeigentuemerList';
import { LandeigentuemerForm } from '@/components/landeigentuemer/LandeigentuemerForm';
import Drawer from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import QLucideIcon from '@/components/ui/LucideIcon';
import AppLayout from '@/components/common/AppLayout';

export default function LandeigentuemerPage() {
  const [landeigentuemer, setLandeigentuemer] = useState<Landeigentuemer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadLandeigentuemer();
  }, []);

  const loadLandeigentuemer = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Lade Landeigentümer...');
      const data = await landeigentuemerService.getAll();
      console.log('Erfolgreich geladen:', data);
      setLandeigentuemer(data);
    } catch (error) {
      console.error('Fehler beim Laden der Landeigentümer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Landeigentümer wirklich löschen? Alle zugehörigen Flurstücke werden ebenfalls gelöscht.')) {
      return;
    }

    try {
      await landeigentuemerService.delete(id);
      await loadLandeigentuemer();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert('Fehler beim Löschen. Bitte versuchen Sie es erneut.');
    }
  };

  const handleSubmit = async (data: LandeigentuemerFormData) => {
    try {
      setIsSaving(true);
      if (editingId) {
        await landeigentuemerService.update(editingId, data);
      } else {
        await landeigentuemerService.create(data);
      }
      await loadLandeigentuemer();
      setIsDrawerOpen(false);
      setEditingId(null);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
  };

  const editingData = editingId
    ? landeigentuemer.find((le) => le.id === editingId)
    : undefined;

  return (     <AppLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Landeigentümer</h1>
              <p className="mt-1 text-sm text-gray-500">
                Verwalten Sie alle Landeigentümer und ihre Flurstücke
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreate}
              className="inline-flex items-center gap-2"
            >
              <QLucideIcon icon="Plus" size={18} strokeWidth={2} />
              Neuer Landeigentümer
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <QLucideIcon icon="AlertCircle" size={48} className="mx-auto text-red-500 mb-3" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Fehler beim Laden</h3>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <Button variant="primary" size="sm" onClick={loadLandeigentuemer}>
              <QLucideIcon icon="RefreshCw" size={16} className="mr-2" />
              Erneut versuchen
            </Button>
          </div>
        ) : (
          <LandeigentuemerList
            landeigentuemer={landeigentuemer}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleCancel}
          title={editingId ? 'Landeigentümer bearbeiten' : 'Neuer Landeigentümer'}
        >
          <LandeigentuemerForm
            initialData={editingData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSaving}
          />
        </Drawer>
      </div>
    </div>  </AppLayout>
  );
}
