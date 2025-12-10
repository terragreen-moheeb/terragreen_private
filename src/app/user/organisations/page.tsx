'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OrganisationWithDetails } from '@/types/organisation';
import { organisationService } from '@/lib/organisation';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import QLucideIcon from '@/components/ui/LucideIcon';
import { ORGANISATION_CATEGORY_LABELS } from '@/types/organisation';
import AppLayout from '@/components/common/AppLayout';

export default function OrganisationenPage() {
  const router = useRouter();
  const [organisationen, setOrganisationen] = useState<OrganisationWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganisationen();
  }, []);

  const loadOrganisationen = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await organisationService.getAll();
      setOrganisationen(data);
    } catch (error) {
      console.error('Fehler beim Laden der Organisationen:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrganisationClick = (id: string) => {
    router.push(`/user/organisations/${id}`);
  };

  return (
    <AppLayout label='Organisationen' description='Verwalte alle Organisationen, Kontakte und zugehörigen Daten.' headerContent={<Button
      variant="primary"
      size="md"
      onClick={() => router.push('/user/organisations/new')}
      className="inline-flex items-center gap-2"
    >
      <QLucideIcon icon="Plus" size={18} strokeWidth={2} />
      Neue Organisation
    </Button>}>

      <div className="min-h-screen bg-color">
        <div className="app-layout py-4">

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
              <Button variant="primary" size="sm" onClick={loadOrganisationen}>
                <QLucideIcon icon="RefreshCw" size={16} className="mr-2" />
                Erneut versuchen
              </Button>
            </div>
          ) : organisationen.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <QLucideIcon icon="Building2" size={64} className="mx-auto text-gray-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Noch keine Organisationen</h3>
              <p className="text-sm text-gray-500 mb-6">
                Erstellen Sie Ihre erste Organisation, um loszulegen.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => router.push('/user/organisations/new')}
              >
                <QLucideIcon icon="Plus" size={18} className="mr-2" />
                Neue Organisation erstellen
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {organisationen.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleOrganisationClick(org.id)}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:border-primary-300  transition-all duration-200 cursor-pointer group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <QLucideIcon icon="Building2" size={20} className="text-primary-600" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors">
                          {org.name}
                        </h3>
                        {org.kurzname && (
                          <p className="text-xs text-gray-500">{org.kurzname}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Kategorien */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {org.kategorien.map((kategorie) => (
                      <span
                        key={kategorie}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {ORGANISATION_CATEGORY_LABELS[kategorie]}
                      </span>
                    ))}
                  </div>

                  {/* Kontaktinformationen */}
                  {(org.email || org.telefon || org.ort) && (
                    <div className="space-y-1.5 mb-4 text-xs text-gray-600">
                      {org.email && (
                        <div className="flex items-center gap-2">
                          <QLucideIcon icon="Mail" size={14} className="text-gray-400" />
                          <span className="truncate">{org.email}</span>
                        </div>
                      )}
                      {org.telefon && (
                        <div className="flex items-center gap-2">
                          <QLucideIcon icon="Phone" size={14} className="text-gray-400" />
                          <span>{org.telefon}</span>
                        </div>
                      )}
                      {org.ort && (
                        <div className="flex items-center gap-2">
                          <QLucideIcon icon="MapPin" size={14} className="text-gray-400" />
                          <span>{org.ort}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Statistiken */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {org.anzahl_kontakte! > 0 && (
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="Users" size={14} />
                          <span>{org.anzahl_kontakte}</span>
                        </div>
                      )}
                      {org.anzahl_plots! > 0 && (
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="Map" size={14} />
                          <span>{org.anzahl_plots}</span>
                        </div>
                      )}
                      {org.anzahl_projects! > 0 && (
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="FolderKanban" size={14} />
                          <span>{org.anzahl_projects}</span>
                        </div>
                      )}
                      {org.anzahl_services! > 0 && (
                        <div className="flex items-center gap-1">
                          <QLucideIcon icon="Briefcase" size={14} />
                          <span>{org.anzahl_services}</span>
                        </div>
                      )}
                    </div>
                    <QLucideIcon
                      icon="ChevronRight"
                      size={16}
                      className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>    </AppLayout>

  );
}
