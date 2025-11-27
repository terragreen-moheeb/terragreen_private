'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LandeigentuemerWithFlurstuecke, LandeigentuemerFormData } from '@/types/landeigentuemer';
import { landeigentuemerService } from '@/lib/landeigentuemer';
import { flurstueckeService } from '@/lib/flurstuecke';
import { FlurstueckList } from '@/components/flurstuecke/FlurstueckList';
import { FlurstueckForm } from '@/components/flurstuecke/FlurstueckForm';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Drawer from '@/components/ui/drawer';
import { LandeigentuemerForm } from '@/components/landeigentuemer/LandeigentuemerForm';
import Link from 'next/link';

export default function LandeigentuemerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'owner' | 'flurstueck'>('owner');

  const [landeigentuemer, setLandeigentuemer] = useState<LandeigentuemerWithFlurstuecke | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFlurstueckId, setEditingFlurstueckId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await landeigentuemerService.getById(id);
      if (!data) {
        alert('Landeigentümer nicht gefunden');
        router.push('/landeigentuemer');
        return;
      }
      setLandeigentuemer(data);
    } catch (error) {
      console.error('Fehler beim Laden:', error);
      alert('Fehler beim Laden der Daten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFlurstueck = () => {
    setEditingFlurstueckId(null);
    setDrawerTab('flurstueck');
    setIsDrawerOpen(true);
  };

  const handleEditFlurstueck = (flurstueckId: string) => {
    setEditingFlurstueckId(flurstueckId);
    setDrawerTab('flurstueck');
    setIsDrawerOpen(true);
  };

  const handleDeleteFlurstueck = async (flurstueckId: string) => {
    if (!confirm('Möchten Sie dieses Flurstück wirklich löschen?')) {
      return;
    }

    try {
      await flurstueckeService.delete(flurstueckId);
      await loadData();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert('Fehler beim Löschen. Bitte versuchen Sie es erneut.');
    }
  };

  const handleFlurstueckSuccess = async () => {
    await loadData();
    setEditingFlurstueckId(null);
    setIsDrawerOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  const handleSubmit = async (data: LandeigentuemerFormData) => {
    try {
      setIsSaving(true);
      await landeigentuemerService.update(id, data);
      await loadData();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSaving(false);
    }
  };
  if (!landeigentuemer) {
    return null;
  }

  const editingFlurstueckData = editingFlurstueckId
    ? landeigentuemer.flurstuecke?.find((f) => f.id === editingFlurstueckId)
    : undefined;



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Landeigentümer Info */}
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/user/landeigentuemer"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Zurück zur Übersicht
          </Link>
        </nav>


        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {landeigentuemer.vorname} {landeigentuemer.nachname}
              </h1>
              <Button onClick={() => { setDrawerTab('owner'); setIsDrawerOpen(true); }} variant="outline" size="md">
                Bearbeiten
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landeigentuemer.email && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">E-Mail</p>
                  <p className="font-medium">{landeigentuemer.email}</p>
                </div>
              )}
              {landeigentuemer.telefon && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telefon</p>
                  <p className="font-medium">{landeigentuemer.telefon}</p>
                </div>
              )}
              {(landeigentuemer.adresse || landeigentuemer.ort) && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Adresse</p>
                  <p className="font-medium">
                    {landeigentuemer.adresse && <>{landeigentuemer.adresse}<br /></>}
                    {landeigentuemer.plz} {landeigentuemer.ort}
                  </p>
                </div>
              )}
            </div>
            {landeigentuemer.notizen && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Notizen</p>
                <p className="text-gray-700 whitespace-pre-wrap">{landeigentuemer.notizen}</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Flurstücke Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Flurstücke</h2>
              <p className="text-gray-600 mt-1">
                {landeigentuemer.flurstuecke?.length || 0} Flurstück(e)
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={handleCreateFlurstueck}>
              + Neues Flurstück
            </Button>
          </div>

          <FlurstueckList
            flurstuecke={landeigentuemer.flurstuecke || []}
            onEdit={handleEditFlurstueck}
            onDelete={handleDeleteFlurstueck}
          />
        </div>

        {/* Drawer: enthält Tabs für Owner bearbeiten und Flurstück hinzufügen/bearbeiten */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setEditingFlurstueckId(null);
          }}
          title={drawerTab === 'owner' ? 'Landeigentümer bearbeiten' : editingFlurstueckId ? 'Flurstück bearbeiten' : 'Neues Flurstück'}
        >
       

          {drawerTab === 'owner' && (
            <LandeigentuemerForm
              initialData={landeigentuemer}
              onSubmit={handleSubmit}
              onCancel={() => setIsDrawerOpen(false)}
              isLoading={isSaving}
            />
          )}

          {drawerTab === 'flurstueck' && (
            <div>
              <FlurstueckForm
                landeigentuemerIdValue={id}
                initialData={editingFlurstueckData}
                onSuccess={handleFlurstueckSuccess}
                onCancel={() => {
                  setEditingFlurstueckId(null);
                  setIsDrawerOpen(false);
                }}
                mode={editingFlurstueckId ? 'edit' : 'create'}
              />
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
}
