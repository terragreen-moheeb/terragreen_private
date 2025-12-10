'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { OrganisationWithDetails } from '@/types/organisation';
import { organisationService } from '@/lib/organisation';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import QLucideIcon from '@/components/ui/LucideIcon';
import { ORGANISATION_CATEGORY_LABELS } from '@/types/organisation';

export default function OrganisationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [organisation, setOrganisation] = useState<OrganisationWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'kontakte' | 'plots' | 'projects' | 'services'>('details');

  useEffect(() => {
    if (id) {
      loadOrganisation();
    }
  }, [id]);

  const loadOrganisation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await organisationService.getById(id);
      setOrganisation(data);
    } catch (error) {
      console.error('Fehler beim Laden der Organisation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !organisation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <QLucideIcon icon="AlertCircle" size={48} className="mx-auto text-red-500 mb-3" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Fehler beim Laden</h3>
            <p className="text-sm text-red-700 mb-4">{error || 'Organisation nicht gefunden'}</p>
            <Button variant="primary" size="sm" onClick={() => router.push('/user/organisations')}>
              <QLucideIcon icon="ArrowLeft" size={16} className="mr-2" />
              Zurück zur Übersicht
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/user/organisations')}
            className="mb-4"
          >
            <QLucideIcon icon="ArrowLeft" size={16} className="mr-2" />
            Zurück zur Übersicht
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <QLucideIcon icon="Building2" size={28} className="text-primary-600" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{organisation.name}</h1>
                {organisation.kurzname && (
                  <p className="text-sm text-gray-500 mt-1">{organisation.kurzname}</p>
                )}
                {organisation.rechtsform && (
                  <p className="text-sm text-gray-500">{organisation.rechtsform}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {organisation.kategorien.map((kategorie) => (
                    <span
                      key={kategorie}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-700"
                    >
                      {ORGANISATION_CATEGORY_LABELS[kategorie]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button variant="primary" size="md">
              <QLucideIcon icon="Edit" size={18} className="mr-2" />
              Bearbeiten
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('kontakte')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'kontakte'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Kontakte ({organisation.kontakte?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('plots')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'plots'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Flurstücke ({organisation.plots?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projekte ({organisation.projects?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'services'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dienstleistungen ({organisation.services?.length || 0})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Organisationsinformationen</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kontaktdaten */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Kontaktdaten</h3>
                <dl className="space-y-2">
                  {organisation.email && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">E-Mail:</dt>
                      <dd className="text-sm text-gray-900">{organisation.email}</dd>
                    </div>
                  )}
                  {organisation.telefon && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">Telefon:</dt>
                      <dd className="text-sm text-gray-900">{organisation.telefon}</dd>
                    </div>
                  )}
                  {organisation.website && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">Website:</dt>
                      <dd className="text-sm text-gray-900">
                        <a href={organisation.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          {organisation.website}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Adresse */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Adresse</h3>
                <dl className="space-y-2">
                  {(organisation.strasse || organisation.hausnummer) && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">Straße:</dt>
                      <dd className="text-sm text-gray-900">{organisation.strasse} {organisation.hausnummer}</dd>
                    </div>
                  )}
                  {(organisation.plz || organisation.ort) && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">Ort:</dt>
                      <dd className="text-sm text-gray-900">{organisation.plz} {organisation.ort}</dd>
                    </div>
                  )}
                  {organisation.land && (
                    <div className="flex items-center gap-2">
                      <dt className="text-sm text-gray-500 w-24">Land:</dt>
                      <dd className="text-sm text-gray-900">{organisation.land}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Rechtliche Daten */}
              {(organisation.steuernummer || organisation.ust_id || organisation.handelsregister) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Rechtliche Angaben</h3>
                  <dl className="space-y-2">
                    {organisation.steuernummer && (
                      <div className="flex items-center gap-2">
                        <dt className="text-sm text-gray-500 w-32">Steuernummer:</dt>
                        <dd className="text-sm text-gray-900">{organisation.steuernummer}</dd>
                      </div>
                    )}
                    {organisation.ust_id && (
                      <div className="flex items-center gap-2">
                        <dt className="text-sm text-gray-500 w-32">USt-ID:</dt>
                        <dd className="text-sm text-gray-900">{organisation.ust_id}</dd>
                      </div>
                    )}
                    {organisation.handelsregister && (
                      <div className="flex items-center gap-2">
                        <dt className="text-sm text-gray-500 w-32">Handelsregister:</dt>
                        <dd className="text-sm text-gray-900">{organisation.handelsregister}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            {/* Beschreibung */}
            {organisation.beschreibung && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Beschreibung</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{organisation.beschreibung}</p>
              </div>
            )}

            {/* Notizen */}
            {organisation.notizen && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notizen</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{organisation.notizen}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'kontakte' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Kontaktpersonen</h2>
              <Button variant="primary" size="sm">
                <QLucideIcon icon="Plus" size={16} className="mr-2" />
                Kontakt hinzufügen
              </Button>
            </div>

            {organisation.kontakte && organisation.kontakte.length > 0 ? (
              <div className="space-y-3">
                {organisation.kontakte.map((kontakt) => (
                  <div key={kontakt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {kontakt.titel} {kontakt.vorname} {kontakt.nachname}
                        </h3>
                        {kontakt.position && (
                          <p className="text-sm text-gray-600">{kontakt.position}</p>
                        )}
                        {kontakt.abteilung && (
                          <p className="text-sm text-gray-500">{kontakt.abteilung}</p>
                        )}
                        <div className="mt-2 space-y-1">
                          {kontakt.email && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <QLucideIcon icon="Mail" size={14} />
                              {kontakt.email}
                            </p>
                          )}
                          {kontakt.telefon && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <QLucideIcon icon="Phone" size={14} />
                              {kontakt.telefon}
                            </p>
                          )}
                        </div>
                        {kontakt.ist_hauptansprechpartner && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 mt-2">
                            Hauptansprechpartner
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">Noch keine Kontakte vorhanden</p>
            )}
          </div>
        )}

        {activeTab === 'plots' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Flurstücke</h2>
              <Button variant="primary" size="sm">
                <QLucideIcon icon="Plus" size={16} className="mr-2" />
                Flurstück hinzufügen
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center py-8">
              {organisation.plots && organisation.plots.length > 0
                ? `${organisation.plots.length} Flurstücke`
                : 'Noch keine Flurstücke vorhanden'}
            </p>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Projekte</h2>
              <Button variant="primary" size="sm">
                <QLucideIcon icon="Plus" size={16} className="mr-2" />
                Projekt hinzufügen
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center py-8">
              {organisation.projects && organisation.projects.length > 0
                ? `${organisation.projects.length} Projekte`
                : 'Noch keine Projekte vorhanden'}
            </p>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Dienstleistungen</h2>
              <Button variant="primary" size="sm">
                <QLucideIcon icon="Plus" size={16} className="mr-2" />
                Dienstleistung hinzufügen
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center py-8">
              {organisation.services && organisation.services.length > 0
                ? `${organisation.services.length} Dienstleistungen`
                : 'Noch keine Dienstleistungen vorhanden'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
